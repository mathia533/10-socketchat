const bcryptjs = require('bcryptjs');


const hashContraseña = async (password ='') =>{
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
 }
 

module.exports = {
    hashContraseña,

}