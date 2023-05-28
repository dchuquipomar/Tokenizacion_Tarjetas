import jwt from 'jsonwebtoken';
import config from "../config.json"
import {  validateToken } from '@libs/utils';
const { TokenExpiredError } = jwt;


const catchError = (err) => {
    if (err instanceof TokenExpiredError) {
      return "Sesión expiró, por favor vuelva a iniciar sesión";
    }
  
    return "El formato del Token no es válido";
  }



export const generateToken = (data: any) => {

    return jwt.sign(data, config["JWT_SECRET"], { expiresIn: "1m" });
 };

 export const validTokenCard =  (data: any) => {
    let responseToken = validateToken(data,false);
    var respToken
    if (responseToken.ok ==true){
        jwt.verify(responseToken.rsta, config["JWT_SECRET"], function(err, resToken) {
            if  (err) {                 
              let  mensaje = catchError(err);
               respToken = {"ok":false, "data" :mensaje};
            
            } else 
             respToken = {"ok":true, "data" :resToken};               
        })
    } else {        
        let  mensaje = responseToken.rsta;
         respToken = {"ok":false, "data" :mensaje}  
        
    }    
    return respToken;
 };