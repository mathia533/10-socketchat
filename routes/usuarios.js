const { Router } = require('express');

const {
     usuariosGet,
     usuariosPut,
     usuariosPost,
     usuariosDelete,
     usuariosPatch
    }  = require ('../controllers/usuarios');

const router = Router();

//GET
router.get('/',  usuariosGet);

// PUT
router.put('/:id', usuariosPut);

//POST
router.post('/', usuariosPost );

//DELETE
router.delete('/', usuariosDelete);


//PATCH
router.patch('/', usuariosPatch);



module.exports = router;