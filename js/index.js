import { Router } from './router.js'

// Criando uma instância de Router()
const router = new Router()

// Criando as rotas
router.add('/', '/pages/home.html')
router.add('/universo', '/pages/universe.html')
router.add('/exploracao', '/pages/explore.html')
router.add(404, '/pages/404.html')

// mostra o home
router.handle()

// permitir navegação pelas setas do navegador
window.onpopstate = () => router.handle()

// Permite modularizar e acessar o route()
window.route = () => router.route()
