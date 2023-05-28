import config from "../config.json"
var redis = require("redis");

export const luhn = (value: string) => {
     // Accept only digits, dashes or spaces
     if (/[^0-9-\s]+/.test(value)) return false;
     // The Luhn Algorithm. It's so pretty.
     let nCheck = 0,
         bEven = false;
     value = value.replace(/\D/g, "");
     for (var n = value.length - 1; n >= 0; n--) {
         var cDigit = value.charAt(n),
             nDigit = parseInt(cDigit, 10);
         if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
         nCheck += nDigit;
         bEven = !bEven;
     }
     return (nCheck % 10) == 0;
  };
  

  export const validateEmail = (email: string) => {
   // Define our regular expression.
   var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

   if (validEmail.test(email)) {
       let arrayEmail = email.split("@");
       let listOfDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
       let dominioFound = 0;
       listOfDomains.forEach(domains => {
           let domainsUser = arrayEmail[1];
           if (domainsUser.toLowerCase() === domains) {
               dominioFound = 1;
           }
       });

       if (dominioFound === 1) {
           return true;
       } else {
           return false;
       }
   } else {

       return false;
   }
 };


 
 export const validateToken = (token: string,flagStore: boolean) => {

    if (typeof token == "undefined") {
        return {ok: false, rsta: "El token es requerido"}
    }

    var partToken = token.split(" ");
    if (partToken.length != 2) {
        return {ok: false, rsta: "El formato del token no es valido"}
    }

    if (partToken[1] !=  config["PK_TOKEN"] && flagStore == true) {
        return {ok: false, rsta: "Token no válido"}
    }
    
    return {ok: true, rsta: partToken[1]};

  };

  class card {
    card_number:string;
    expiration_month:string;
    expiration_year:string;
    email:string;
    constructor(data:any){
        this.card_number = data["card_number"];
        this.expiration_month = data["expiration_month"];
        this.expiration_year = data["expiration_year"];
        this.email = data["email"];
    }

}

export {card};