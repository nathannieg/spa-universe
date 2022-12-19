const routes = {
  '/': '/pages/home.html',
  '/universo': '/pages/universe.html',
  '/exploracao': '/pages/explore.html',
  404: '/pages/404.html'
}

// remover padrão de redirecionar para a página clicada
function route(event) {
  // se eu não passar um evento, ele vai usar window.event
  event = event || window.event
  // removendo padrão
  event.preventDefault()

  // pega o href da pag clicada e salva no histórico
  window.history.pushState({}, '', event.target)

  handle()
}

// manipula
function handle() {
  const { pathname } = window.location

  // adiciona uma rota
  const route = routes[pathname] || routes[404]

  // assincronismo para clicar no link e pegar o arquivo html dele | princípio para coleta de dados
  fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
}

// mostra o home
handle()
