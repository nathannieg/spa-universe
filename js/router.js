// Métodos/funções dentro da classe não precisam de "function"
export class Router {
  // declarando variáveis dentro de classe
  constructor() {
    // captura o body para depois adicionar uma classe a ele
    this.bodyElement = document.querySelector('body')
    // captura os elementos da nav
    this.linkUniverse = document.querySelector('.link__universe')
    this.linkExplore = document.querySelector('.link__explore')
    this.linkHome = document.querySelector('.link__home')
  }

  // inicializando para saber que routes é um objeto
  routes = {}

  // modelando o objeto routes
  add(routeName, page) {
    this.routes[routeName] = page
  }

  // remover padrão de redirecionar para a página clicada
  route(event) {
    // se eu não passar um evento, ele vai usar window.event
    event = event || window.event
    // removendo padrão
    event.preventDefault()

    // pega o href da pag clicada e salva no histórico
    window.history.pushState({}, '', event.target.href)

    this.handle()
  }

  // manipula
  handle() {
    const { pathname } = window.location

    // adiciona uma rota
    const route = this.routes[pathname] || this.routes[404]

    // assincronismo para clicar no link e pegar o arquivo html dele | princípio para coleta de dados
    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })

    this.addClassToClickedPage(pathname)
  }

  /////////////////////

  // Muda o background e deixa o link da nav ativo com base na página clicada
  addClassToClickedPage(pathname) {
    if (pathname === '/') {
      this.addHomeBackground()
      this.makeHomeLinkActive()
    } else if (pathname === '/universo') {
      this.addUniverseBackground()
      this.makeUniverseLinkActive()
    } else if (pathname === '/exploracao') {
      this.addExploreBackground()
      this.makeExploreLinkActive()
    }
  }

  // Mudar backgrounds com base nos clicks
  addHomeBackground() {
    this.bodyElement.classList.add('home__bg')
    this.bodyElement.classList.remove('universe__bg')
    this.bodyElement.classList.remove('explore__bg')
    this.bodyElement.classList.remove('error404__bg')
  }

  // Mudar backgrounds com base nos clicks
  addHomeBackground() {
    this.bodyElement.classList.add('home__bg')
    this.bodyElement.classList.remove('universe__bg')
    this.bodyElement.classList.remove('explore__bg')
    this.bodyElement.classList.remove('error404__bg')
  }

  addUniverseBackground() {
    this.bodyElement.classList.add('universe__bg')
    this.bodyElement.classList.remove('home__bg')
    this.bodyElement.classList.remove('explore__bg')
    this.bodyElement.classList.remove('error404__bg')
  }

  addExploreBackground() {
    this.bodyElement.classList.add('explore__bg')
    this.bodyElement.classList.remove('home__bg')
    this.bodyElement.classList.remove('universe__bg')
    this.bodyElement.classList.remove('error404__bg')
  }

  // Deixa o link da página atual com estilo diferente
  makeHomeLinkActive() {
    this.linkHome.classList.add('home__active')
    this.linkUniverse.classList.remove('universe__active')
    this.linkExplore.classList.remove('explore__active')
  }

  makeUniverseLinkActive() {
    this.linkUniverse.classList.add('universe__active')
    this.linkExplore.classList.remove('explore__active')
    this.linkHome.classList.remove('home__active')
  }

  makeExploreLinkActive() {
    this.linkExplore.classList.add('explore__active')
    this.linkUniverse.classList.remove('universe__active')
    this.linkHome.classList.remove('home__active')
  }
}
