export function addSolarSystemControls(container) {
  const controls = document.createElement('div')
  controls.className = 'solar-controls'

  controls.innerHTML = `
    <button class="control-btn" data-action="pause">Pausar</button>
    <button class="control-btn" data-action="perspective">Mudar Perspectiva</button>
    <button class="control-btn" data-action="speed">Velocidade</button>
  `

  container.appendChild(controls)

  // Implementar funcionalidades dos controles
  controls.addEventListener('click', e => {
    const action = e.target.dataset.action
    if (!action) return

    switch (action) {
      case 'pause':
        toggleOrbitAnimation(container, e.target)
        break
      case 'perspective':
        togglePerspective(container)
        break
      case 'speed':
        cycleOrbitSpeed(container)
        break
    }
  })
}

export function toggleOrbitAnimation(container, button) {
  const orbits = container.querySelectorAll('.orbit')
  const isPaused = button.classList.toggle('paused')

  orbits.forEach(orbit => {
    orbit.style.animationPlayState = isPaused ? 'paused' : 'running'
  })

  button.textContent = isPaused ? 'Continuar' : 'Pausar'
}

export function togglePerspective(container) {
  container.classList.toggle('alternative-view')
  const currentView = container.classList.contains('alternative-view')

  if (currentView) {
    container.style.transform = 'rotateX(0deg)'
  } else {
    container.style.transform = 'rotateX(60deg)'
  }
}

export function cycleOrbitSpeed(container) {
  const orbits = container.querySelectorAll('.orbit')
  const speedStates = ['normal', 'slow', 'fast']
  const currentSpeed = container.dataset.speed || 'normal'
  const nextSpeedIndex =
    (speedStates.indexOf(currentSpeed) + 1) % speedStates.length
  const nextSpeed = speedStates[nextSpeedIndex]

  container.dataset.speed = nextSpeed

  orbits.forEach(orbit => {
    orbit.style.animationDuration = {
      slow: '80s',
      normal: '40s',
      fast: '20s'
    }[nextSpeed]
  })

  const speedButton = container.querySelector('[data-action="speed"]')
  speedButton.textContent = `Velocidade: ${
    nextSpeed.charAt(0).toUpperCase() + nextSpeed.slice(1)
  }`
}
