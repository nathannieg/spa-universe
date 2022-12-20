const routes = {
  '/': '/pages/home.html',
  '/universo': '/pages/universe.html',
  '/exploracao': '/pages/explore.html',
  404: '/pages/404.html'
}

// captura o body para depois adicionar uma classe a ele
const bodyElement = document.querySelector('body')

// captura os elementos da nav
const linkHome = document.querySelector('.link__home')
const linkUniverse = document.querySelector('.link__universe')
const linkExplore = document.querySelector('.link__explore')

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

  addClassToClickedPage(pathname)
}

// mostra o home
handle()

// Muda o background e deixa o link da nav ativo com base na página clicada
function addClassToClickedPage(pathname) {
  if (pathname === '/') {
    addHomeBackground()
    makeHomeLinkActive()
  } else if (pathname === '/universo') {
    addUniverseBackground()
    makeUniverseLinkActive()
  } else if (pathname === '/exploracao') {
    addExploreBackground()
    makeExploreLinkActive()
  }
}

// Mudar backgrounds com base nos clicks
function addHomeBackground() {
  bodyElement.classList.add('home__bg')
  bodyElement.classList.remove('universe__bg')
  bodyElement.classList.remove('explore__bg')
  bodyElement.classList.remove('error404__bg')
}

function addUniverseBackground() {
  bodyElement.classList.add('universe__bg')
  bodyElement.classList.remove('home__bg')
  bodyElement.classList.remove('explore__bg')
  bodyElement.classList.remove('error404__bg')
}

function addExploreBackground() {
  bodyElement.classList.add('explore__bg')
  bodyElement.classList.remove('home__bg')
  bodyElement.classList.remove('universe__bg')
  bodyElement.classList.remove('error404__bg')
}

// Deixa o link da página atual com estilo diferente
function makeHomeLinkActive() {
  linkHome.classList.add('home__active')
  linkUniverse.classList.remove('universe__active')
  linkExplore.classList.remove('explore__active')
}

function makeUniverseLinkActive() {
  linkUniverse.classList.add('universe__active')
  linkExplore.classList.remove('explore__active')
  linkHome.classList.remove('home__active')
}

function makeExploreLinkActive() {
  linkExplore.classList.add('explore__active')
  linkUniverse.classList.remove('universe__active')
  linkHome.classList.remove('home__active')
}

// permitir navegação pelas setas do navegador
window.onpopstate = () => handle()
