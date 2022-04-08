
const jwt = require('jsonwebtoken');

const genenarJwt = (uid, name ) => {
    const payload = { uid, name };

    return new Promise ( (resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: "20m"
        }, (err, token)=> {
            if(err){
                console.log(err);
                reject(error);
            }else {
                resolve(token);
            }
        })
    })

}


module.exports = { 
    genenarJwt
 }