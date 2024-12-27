// js/core/main.js
import { initializeParticles } from '../features/space-scene/particles.js'
import { initializeSolarSystem } from '../features/solar-system/solarSystem.js'
import { initializeGalaxyCarousel } from '../features/celestial-bodies/galaxies.js'
import { initializeStarCards } from '../features/celestial-bodies/stars.js'
import { initializePhenomena } from '../features/celestial-bodies/phenomena.js'
import { initializeInteractiveSpace } from '../features/space-scene/interactive.js'
import {
  initializeNavigationEffects,
  initializeParallaxEffects,
  initializeSmoothScroll
} from '../utils/navigation.js'

const isDevelopment = true // Definir como false em produção

document.addEventListener('DOMContentLoaded', async () => {
  if (isDevelopment) {
    console.log('Modo de Desenvolvimento Ativado')
  }

  try {
    // Inicializar animações AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
      })
    } else {
      console.warn('Biblioteca AOS não carregada!')
    }

    // Inicializar elementos da cena espacial
    try {
      initializeParticles()
      initializeInteractiveSpace()
      if (isDevelopment) {
        console.log('Cena espacial inicializada com sucesso.')
      }
    } catch (error) {
      console.error('Erro ao inicializar a cena espacial:', error)
    }

    // Inicializar sistema solar
    try {
      initializeSolarSystem()
      if (isDevelopment) {
        console.log('Sistema solar inicializado.')
      }
    } catch (error) {
      console.error('Erro ao inicializar o sistema solar:', error)
    }

    // Inicializar corpos celestes
    try {
      initializeStarCards()
      initializeGalaxyCarousel()
      initializePhenomena()
      if (isDevelopment) {
        console.log('Corpos celestes inicializados.')
      }
    } catch (error) {
      console.error('Erro ao inicializar corpos celestes:', error)
    }

    // Inicializar navegação e efeitos
    try {
      initializeNavigationEffects()
      initializeParallaxEffects()
      initializeSmoothScroll()
      if (isDevelopment) {
        console.log('Efeitos de navegação inicializados.')
      }
    } catch (error) {
      console.error('Erro ao inicializar efeitos de navegação:', error)
    }
  } catch (globalError) {
    console.error('Erro global durante a inicialização:', globalError)
  }
})

export default {}
