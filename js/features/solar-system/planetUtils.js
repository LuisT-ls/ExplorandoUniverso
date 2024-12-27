export function createPlanetElement(planet, orbitRadius) {
  const planetEl = document.createElement('div')
  planetEl.className = 'planet'
  planetEl.dataset.name = planet.name

  const wrapper = document.createElement('div')
  wrapper.className = 'planet-wrapper'

  // Adicionar camadas visuais do planeta
  const atmosphere = document.createElement('div')
  atmosphere.className = 'planet-atmosphere'

  const surface = document.createElement('img')
  surface.src = planet.image
  surface.alt = planet.name
  surface.className = 'planet-surface'

  wrapper.appendChild(atmosphere)
  wrapper.appendChild(surface)

  // Tooltip avançado com mais informações
  const tooltip = createEnhancedTooltip(planet)

  planetEl.appendChild(wrapper)
  planetEl.appendChild(tooltip)

  // Posicionar planeta com ângulo aleatório inicial
  const randomAngle = Math.random() * 360
  planetEl.style.transform = `rotate(${randomAngle}deg) translateX(${orbitRadius}px)`

  return planetEl
}

export function createEnhancedTooltip(planet) {
  const tooltip = document.createElement('div')
  tooltip.className = 'planet-tooltip'

  tooltip.innerHTML = `
    <h3>${planet.name}</h3>
    <div class="tooltip-content">
      <p class="description">${planet.description}</p>
      <div class="planet-stats">
        <div class="stat-item">
          <span>Distância do Sol</span>
          <div class="stat-value">${planet.distance}</div>
        </div>
        <div class="stat-item">
          <span>Velocidade Orbital</span>
          <div class="stat-value">${
            planet.orbitSpeed === 'fast'
              ? 'Rápida'
              : planet.orbitSpeed === 'medium'
              ? 'Média'
              : 'Lenta'
          }</div>
        </div>
      </div>
    </div>
  `

  return tooltip
}

export function addPlanetInteractions(planetEl, planetData) {
  planetEl.addEventListener('mouseenter', () => {
    planetEl.classList.add('planet-hover')
    // Pausar animação da órbita temporariamente
    planetEl.closest('.orbit').style.animationPlayState = 'paused'
  })

  planetEl.addEventListener('mouseleave', () => {
    planetEl.classList.remove('planet-hover')
    planetEl.closest('.orbit').style.animationPlayState = 'running'
  })

  planetEl.addEventListener('click', () => {
    showPlanetDetails(planetData)
  })
}

export function showPlanetDetails(planet) {
  const modal = document.createElement('div')
  modal.className = 'planet-modal'
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${planet.name}</h2>
      <div class="planet-visualization">
        <img src="${planet.image}" alt="${
    planet.name
  }" class="planet-large-image">
      </div>
      <div class="planet-details">
        <p>${planet.description}</p>
        <div class="planet-data">
          <div class="data-item">
            <span>Distância do Sol</span>
            <strong>${planet.distance}</strong>
          </div>
          <div class="data-item">
            <span>Velocidade Orbital</span>
            <strong>${
              planet.orbitSpeed === 'fast'
                ? 'Rápida'
                : planet.orbitSpeed === 'medium'
                ? 'Média'
                : 'Lenta'
            }</strong>
          </div>
        </div>
      </div>
      <button class="close-modal">Fechar</button>
    </div>
  `

  document.body.appendChild(modal)
  setTimeout(() => modal.classList.add('show'), 10)

  modal.querySelector('.close-modal').onclick = () => {
    modal.classList.remove('show')
    setTimeout(() => modal.remove(), 300)
  }
}
