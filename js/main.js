import spaceData from './data.js'

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  })

  initializeParticles()
  initializeSolarSystem()
  initializeStarCards()
  initializeGalaxyCarousel()
  initializePhenomena()
  initializeInteractiveSpace()
  initializeNavigationEffects()
})

function initializeParticles() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 150, density: { enable: true, value_area: 800 } },
      color: { value: ['#ffffff', '#4cc9f0', '#7b2cbf'] },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 5 }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#4cc9f0',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: true, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  })
}

function initializeSolarSystem() {
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

function createPlanetElement(planet, orbitRadius) {
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

function createEnhancedTooltip(planet) {
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

function addPlanetInteractions(planetEl, planetData) {
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

function showPlanetDetails(planet) {
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

function addSolarSystemControls(container) {
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

function initializeStarCards() {
  const container = document.getElementById('starContainer')

  spaceData.stars.forEach((star, index) => {
    const card = document.createElement('div')
    card.className = 'star-card'
    card.setAttribute('data-aos', 'fade-up')
    card.setAttribute('data-aos-delay', `${index * 100}`)

    card.innerHTML = `
      <div class="star-image-container">
        <img src="${star.image}" alt="${star.name}" class="star-image" />
        <div class="star-glow"></div>
      </div>
      <div class="star-content">
        <h3>${star.name}</h3>
        <span class="star-type">${star.type}</span>
        <div class="star-info">
          <p class="star-distance"><i class="fas fa-rocket"></i> ${star.distance}</p>
          <p class="star-description">${star.description}</p>
        </div>
      </div>
    `

    container.appendChild(card)
  })
}

function initializeGalaxyCarousel() {
  const container = document.getElementById('galaxyCarousel')

  // Criar estrutura do carrossel com navegação personalizada
  container.innerHTML = `
  <div class="galaxy-slider">
    <div class="galaxy-wrapper">
      ${spaceData.galaxies
        .map(
          (galaxy, index) => `
        <div class="galaxy-slide" data-index="${index}">
          <div class="galaxy-image-container">
            <img src="${galaxy.image}" alt="${galaxy.name}" class="galaxy-image">
          </div>
          <div class="galaxy-info">
            <h3>${galaxy.name}</h3>
            <span class="galaxy-type">${galaxy.type}</span>
            <p>${galaxy.description}</p>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
    <div class="galaxy-navigation">
      <div class="galaxy-indicators">
        ${spaceData.galaxies
          .map(
            (_, index) => `
          <button class="indicator${
            index === 0 ? ' active' : ''
          }" data-index="${index}"></button>
        `
          )
          .join('')}
      </div>
    </div>
  </div>
`

  // Implementar lógica do carrossel
  let currentSlide = 0
  const slides = container.querySelectorAll('.galaxy-slide')
  const indicators = container.querySelectorAll('.indicator')
  const totalSlides = slides.length

  function updateSlide(newIndex) {
    currentSlide = (newIndex + totalSlides) % totalSlides
    const offset = currentSlide * -100
    container.querySelector(
      '.galaxy-wrapper'
    ).style.transform = `translateX(${offset}%)`

    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide)
    })
  }

  // Clique nos indicadores
  container.querySelectorAll('.indicator').forEach(indicator => {
    indicator.addEventListener('click', () =>
      updateSlide(parseInt(indicator.dataset.index))
    )
  })

  // Autoplay
  let autoplayInterval = setInterval(() => updateSlide(currentSlide + 1), 5000)
  container.addEventListener('mouseenter', () =>
    clearInterval(autoplayInterval)
  )
  container.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => updateSlide(currentSlide + 1), 5000)
  })
}

function initializePhenomena() {
  const container = document.getElementById('phenomenaContainer')

  spaceData.phenomena.forEach((phenomenon, index) => {
    const card = document.createElement('div')
    card.className = 'phenomenon-card'
    card.setAttribute('data-aos', 'fade-up')
    card.setAttribute('data-aos-delay', `${index * 100}`)

    card.innerHTML = `
      <div class="phenomenon-image-container">
        <img src="${phenomenon.image}" alt="${phenomenon.name}" class="phenomenon-image">
        <div class="phenomenon-overlay"></div>
      </div>
      <div class="phenomenon-info">
        <span class="phenomenon-type">${phenomenon.type}</span>
        <h3>${phenomenon.name}</h3>
        <p class="phenomenon-description">${phenomenon.description}</p>
        <button class="learn-more-btn">Saiba mais</button>
      </div>
    `

    // Adicionar evento para mostrar mais informações
    card.querySelector('.learn-more-btn').addEventListener('click', () => {
      showPhenomenonDetails(phenomenon)
    })

    container.appendChild(card)
  })
}

function showPhenomenonDetails(phenomenon) {
  const modal = document.createElement('div')
  modal.className = 'phenomenon-modal'
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${phenomenon.name}</h2>
        <span class="phenomenon-type">${phenomenon.type}</span>
      </div>
      <div class="modal-body">
        <div class="phenomenon-image-large">
          <img src="${phenomenon.image}" alt="${phenomenon.name}">
        </div>
        <div class="phenomenon-description">
          <p>${phenomenon.description}</p>
          <!-- Adicionar mais informações detalhadas aqui -->
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

function initializeInteractiveSpace() {
  const container = document.getElementById('interactiveSpace')

  // Configurar cena Three.js
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
  )
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

  renderer.setSize(container.offsetWidth, container.offsetHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  // Criar grupo de objetos
  const group = new THREE.Group()
  scene.add(group)

  // Criar esfera principal
  const sphereGeometry = new THREE.SphereGeometry(2, 32, 32)
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x4cc9f0,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
    emissive: 0x4cc9f0,
    emissiveIntensity: 0.2
  })

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  group.add(sphere)

  // Adicionar partículas orbitando
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000
  const positions = new Float32Array(particlesCount * 3)
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x7b2cbf,
    size: 0.02,
    transparent: true,
    opacity: 0.8
  })

  for (let i = 0; i < particlesCount * 3; i += 3) {
    const radius = 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI * 2

    positions[i] = radius * Math.cos(theta) * Math.sin(phi)
    positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi)
    positions[i + 2] = radius * Math.cos(phi)
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )
  const particles = new THREE.Points(particlesGeometry, particleMaterial)
  group.add(particles)

  // Adicionar luzes
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0x4cc9f0, 1)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  // Posicionar câmera
  camera.position.z = 5

  // Controles de mouse
  let mouseX = 0
  let mouseY = 0
  let targetRotationX = 0
  let targetRotationY = 0

  container.addEventListener('mousemove', event => {
    mouseX = (event.clientX - container.offsetWidth / 2) / 100
    mouseY = (event.clientY - container.offsetHeight / 2) / 100
  })

  // Animação
  function animate() {
    requestAnimationFrame(animate)

    targetRotationX += (mouseX - targetRotationX) * 0.05
    targetRotationY += (mouseY - targetRotationY) * 0.05

    group.rotation.y += 0.003
    group.rotation.x = targetRotationY * 0.5
    group.rotation.y = targetRotationX * 0.5

    particles.rotation.y += 0.001

    renderer.render(scene, camera)
  }

  animate()

  // Responsividade
  window.addEventListener('resize', () => {
    const width = container.offsetWidth
    const height = container.offsetHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  })
}

// Funções auxiliares para o Sistema Solar
function toggleOrbitAnimation(container, button) {
  const orbits = container.querySelectorAll('.orbit')
  const isPaused = button.classList.toggle('paused')

  orbits.forEach(orbit => {
    orbit.style.animationPlayState = isPaused ? 'paused' : 'running'
  })

  button.textContent = isPaused ? 'Continuar' : 'Pausar'
}

function togglePerspective(container) {
  container.classList.toggle('alternative-view')
  const currentView = container.classList.contains('alternative-view')

  if (currentView) {
    container.style.transform = 'rotateX(0deg)'
  } else {
    container.style.transform = 'rotateX(60deg)'
  }
}

function cycleOrbitSpeed(container) {
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

// Inicialização da navegação e efeitos
function initializeNavigationEffects() {
  const navbar = document.querySelector('.navbar')
  const sections = document.querySelectorAll('section')

  // Mudar aparência da navbar ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('navbar-scrolled')
    } else {
      navbar.classList.remove('navbar-scrolled')
    }
  })

  // Highlight da seção atual no menu
  window.addEventListener('scroll', () => {
    let current = ''

    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id')
      }
    })

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active')
      }
    })
  })
}

// Event listener para smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})

// Adicionar efeitos de parallax
function initializeParallaxEffects() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset

    // Parallax no hero
    const heroSection = document.querySelector('.hero-section')
    if (heroSection) {
      heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`
    }

    // Parallax nos elementos com data-parallax
    document.querySelectorAll('[data-parallax]').forEach(element => {
      const speed = element.dataset.parallax || 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Inicializar efeitos de parallax
initializeParallaxEffects()

// Exportar funções que podem ser úteis em outros módulos
export {
  initializeSolarSystem,
  initializeStarCards,
  initializeGalaxyCarousel,
  initializePhenomena,
  initializeInteractiveSpace
}
