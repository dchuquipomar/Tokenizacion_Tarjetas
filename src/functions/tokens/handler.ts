import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponseError, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { luhn, validateEmail,validateToken } from '@libs/utils';
import { generateToken } from '@libs/security';
import { dbConnection } from "../../libs/db";

import schema from './schema';

const tokens: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context, callback) => {
  
  var timestamp = new Date();
  const NOW_YEAR = timestamp.getFullYear();
  const MAX_YEAR = timestamp.getFullYear() + 4;

  const body = event.body;

  var client = await dbConnection();

  //lectura de variables
  var card_number = body.card_number || null;
  var cvv = body.cvv || null;
  var expiration_month = body.expiration_month;
  var expiration_year = body.expiration_year;
  var email = body.email;

  //validando el token
  let responseToken = validateToken(event.headers.token,true);
  if (responseToken.ok == false) {
    message = responseToken.rsta;
    return formatJSONResponseError({ message })

  }

  //validando ccv
  if (cvv === null || cvv === undefined || !(cvv === '123' || cvv === '4532') === true) {
    var message = "cvv no permitido, solo son validos 123 para visa/mastercard o 4532 para Amex";
    return formatJSONResponseError({ message })
  }

  //validando ccv la tarjeta de credito con el algoritmo luhn
  if (card_number === null || card_number === undefined || !luhn(card_number) === true ||
    !(card_number.length >= 13 && card_number.length <= 16)) {
    var message = "formato de tarjeta no válido";
    return formatJSONResponseError({ message })
  }

  //validando el mes de expiración
  if (expiration_month === null || expiration_month === undefined ||
    !(Number(expiration_month) * 1 >= 1 && Number(expiration_month) * 1 <= 12)) {

    var message = "formato no valido y/o solo es permitido números del 1 al 12";
    return formatJSONResponseError({ message })
  }


  //validando el año de expiración
  if (expiration_year === null || expiration_year === undefined ||
    !(Number(expiration_year) * 1 >= NOW_YEAR && Number(expiration_year) * 1 <= MAX_YEAR)) {

    var message = `formato no valido y/o solo es permitido desde el año ${NOW_YEAR} hasta el año ${MAX_YEAR}`;
    return formatJSONResponseError({ message })
  }

  //validando el email con los dominios permitidos [gmail, hotmail, yahoo]
  if (email === null || email === undefined || !(validateEmail(email))) {

    var message = `formato de email no valido y/o no pertenece a los dominios google.com, hotmail.com o yahoo.es `;
    return formatJSONResponseError({ message })
  }

  let data = {
    card_number,
    expiration_year,
    expiration_month,
    email
  };

  data["token"] = generateToken(data);

  client.set(card_number, JSON.stringify(data), { EX: 60 }, (err, reply) => {
    if (err) {
      console.log(err);
      return true
    }
  });

  return formatJSONResponse(data);

}





export const main = middyfy(tokens);
