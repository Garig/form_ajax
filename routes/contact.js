const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

router.route('/')
  .get(function (req, res) {
    res.sendFile('contact.html', {
      root: './views'
    })
  })
  .post(upload.single(), function (req, res) {
    var errors = noEmptyField(req.body)
    if (req.xhr && errors.length === 0) {
      res.status(200).json({success: 'Bravo !'})
    } else {
      res.status(400).json({errors: errors})
    }
  })

function noEmptyField (obj) {
  let errors = []
  for (let i in obj) {
    if (obj[i] === '') {
      var error = {}
      error[i] = 'le champ ' + i + ' n\'est pas correctement rempli'
      errors.push(error)
    }
  } return errors
}

module.exports = router
