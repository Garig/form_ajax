(function () {
  window.document.addEventListener('DOMContentLoaded', function () {
    console.log('contact ready')

    const getHttpRequest = function () {
      var httpRequest = false

      if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest()
        if (httpRequest.overrideMimeType) {
          httpRequest.overrideMimeType('text/xml')
                // Voir la note ci-dessous à propos de cette ligne
        }
      } else if (window.ActiveXObject) { // IE
        try {
          httpRequest = new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
          try {
            httpRequest = new ActiveXObject('Microsoft.XMLHTTP')
          } catch (e) {}
        }
      }

      return httpRequest
    }

    const contactForm = document.querySelector('#contactForm')

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()

      let data = new FormData(contactForm)
      let httpRequest = getHttpRequest()

      httpRequest.onreadystatechange = function () {
        activeLoadingButton(contactForm)
        cleanErrorsFromForm(contactForm)

        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          data = JSON.parse(httpRequest.responseText)
          displaySuccess(contactForm)
        }
        if (httpRequest.readyState === 4 && httpRequest.status !== 200) {
          data = JSON.parse(httpRequest.responseText)
          displayErrors(data)
        }
      }

      formSubmit(contactForm, data)

      function activeLoadingButton (form) {
        let button = form.querySelector('button[type=submit]')
        button.disabled = button.disabled === true ? button.disabled = false : button.disabled = true
        button.textContent = button.textContent === 'Chargement en cours...' ? button.textContent = 'Envoyer' : button.textContent = 'Chargement en cours...'
      }
      function cleanErrorsFromForm (form) {
        let errors = form.querySelectorAll('.has-error')
        if (errors !== null) {
          errors.forEach(function (el) {
            el.classList.remove('has-error')
            let span = el.querySelector('.help-block')
            span.parentNode.removeChild(span)
          })
        }
      }
      function displayErrors (data) {
        data.errors.forEach(function (el) {
          let input = document.querySelector('[name =' + Object.keys(el) + ']')
          let span = document.createElement('span')
          span.className = 'help-block'
          span.innerHTML = el[Object.keys(el)]
          input.parentNode.classList.add('has-error')
          input.parentNode.appendChild(span)
        })
      }
      function displaySuccess (form) {
        let myform = form.querySelectorAll('input')
        console.log(myform)
        myform.forEach(function (el) {
          el.value = ''
          el.parentNode.classList.add('has-success')
        })
      }
      function formSubmit (form, data) {
        let url = form.getAttribute('action')
        let method = form.getAttribute('method')
        httpRequest.open(method, url, true)
        httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest') // informe le serveur qu'il s'agit d'une requête ajax
        httpRequest.send(data)
      };
    })
  })
})()
