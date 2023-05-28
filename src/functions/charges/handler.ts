import { formatJSONResponseError, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { validTokenCard } from '@libs/security';
import { Handler } from 'aws-lambda';
import { card } from '@libs/utils';

const charges: Handler  = async (event) => {

  //enviando el token para validación
  let respToken =  validTokenCard(event.headers.token);

  // verificando la respuesta del token
  if (respToken.ok == false) {
    //mostrando el error en caso del token no ser valido y/o estar vencido
    let  data = {
      "respuesta" : `Error,  ${respToken.data}`
    };
    return formatJSONResponseError(data);
  } else {
    //retornando los datos de la tarjeta de ser valido el token
    let data = respToken.data;
    let cardDate = new card(data);
    return formatJSONResponse({card:cardDate});
  }  

}





export const main = middyfy(charges);
