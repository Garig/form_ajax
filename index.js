const express = require('express')
const multer = require('multer')
const upload = multer()
const port = 8080
var app = express()

app.use('/', express.static('views'))
app.use('/js', express.static('js'))


const contact = require('./routes/contact.js')
app.use('/contact', contact)

app.listen(port, function (err) {
  if (err) {
    console.error('impossible de démarrer le serveur = ', err)
  } else {
    console.info(new Date().toString() , ' Serveur démarré sur le port : ' , port)
  }

})
