const { validationResult } = require("express-validator")


const validarCamposCorrectos = (req, res, next )=> {

    const error = validationResult( req );
    console.log(error);

    if(!error.isEmpty()){
       return res.status(400).json({
            ok: false,
            errors: error.mapped()
        })
    }

    next();

}




module.exports = {
    validarCamposCorrectos,
    
}