const {OAuth2Client} = require('google-auth-library');

const googleClienteId = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(googleClienteId);

async function googleVerify(idToken = '') {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: googleClienteId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  //desestructuro la respuesta 
  //y renombro los campos para que coincidan con mi modelo
  const {
      name: nombre,
      picture: img,
      email: correo
    } = ticket.getPayload();

   //  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return {nombre,img,correo};
}

module.exports = {
    googleVerify
}