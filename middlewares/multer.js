const multer = require('multer');
const path = require('path');



//Configurando propiedades de multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/upload'),
    filename: (req, file, cb) => {
        
        cb(null, Date.now() + path.extname(file.originalname).toLocaleLowerCase() )
    },
    
    

})

const uploadPhoto = multer({
    storage,
    dest: path.join(__dirname, '../public/upload'),
    fileFilter: (req, file, cb ) => {
        const filetype = /jpeg|jpg|png|gif/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname))

        if( mimetype && extname ){
           return cb(null, true)
            
        }
        cb('Error: el archivo no es una imagen')
         
    },
    

}).single('photo');

const uploadPhotos = multer({
   
    storage,
    dest: path.join(__dirname, '../public/upload'),
    fileFilter: (req, file, cb ) => {
        const filetype = /jpeg|jpg|png|gif/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname))
        
        
        if( mimetype && extname ){
           return cb(null, true)
            
        }
        cb('Error: el archivo no es una imagen')
         
    },
    //limits: { fileSize: 1000000},

}).array('photos', 5);

module.exports = {
    uploadPhoto,
    uploadPhotos
}