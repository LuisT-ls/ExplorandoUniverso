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

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  })

  // Inicializar elementos da cena espacial
  initializeParticles()
  initializeInteractiveSpace()

  // Inicializar sistema solar
  initializeSolarSystem()

  // Inicializar corpos celestes
  initializeStarCards()
  initializeGalaxyCarousel()
  initializePhenomena()

  // Inicializar navegação e efeitos
  initializeNavigationEffects()
  initializeParallaxEffects()
  initializeSmoothScroll()
})

export default {}
