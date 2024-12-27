import {
  createPlanetElement,
  createEnhancedTooltip,
  addPlanetInteractions,
  showPlanetDetails
} from './planetUtils.js'
import {
  toggleOrbitAnimation,
  togglePerspective,
  cycleOrbitSpeed,
  addSolarSystemControls
} from './solarControls.js'
import spaceData from '../../core/data.js'

export function initializeSolarSystem() {
  const container = document.querySelector('.solar-system-container')

  // Criar o sol com efeito de pulso e corona
  const sun = document.createElement('div')
  sun.className = 'sun'
  const corona = document.createElement('div')
  corona.className = 'sun-corona'
  sun.appendChild(corona)
  container.appendChild(sun)

  // Calcular raios das órbitas com proporções mais realistas
  const baseRadius =
    Math.min(container.offsetWidth, container.offsetHeight) / 3.5
  const orbitScales = [0.4, 0.7, 1, 1.5, 2.5, 3, 3.5, 4]

  spaceData.planets.forEach((planet, index) => {
    const orbitRadius = baseRadius * orbitScales[index]

    // Criar órbita com efeito de profundidade
    const orbit = document.createElement('div')
    orbit.className = `orbit orbit-${planet.orbitSpeed}`
    orbit.style.width = `${orbitRadius * 2}px`
    orbit.style.height = `${orbitRadius * 2}px`
    orbit.style.marginLeft = `-${orbitRadius}px`
    orbit.style.marginTop = `-${orbitRadius}px`

    // Adicionar planeta com efeitos avançados
    const planetEl = createPlanetElement(planet, orbitRadius)
    orbit.appendChild(planetEl)
    container.appendChild(orbit)

    // Adicionar eventos de interação
    addPlanetInteractions(planetEl, planet)
  })

  // Adicionar controles de visualização
  addSolarSystemControls(container)
}
