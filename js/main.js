import spaceData from './data.js'

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
})

// Initialize Particles.js
particlesJS('particles-js', {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    size: {
      value: 2,
      random: true
    },
    move: {
      enable: true,
      speed: 0.5
    }
  }
})

// Solar System
function initSolarSystem() {
  const container = document.querySelector('.solar-system-container')
  const centerX = container.offsetWidth / 2
  const centerY = container.offsetHeight / 2

  spaceData.planets.forEach((planet, index) => {
    const orbit = document.createElement('div')
    orbit.className = `orbit orbit-${planet.orbitSpeed}`

    const planetEl = document.createElement('div')
    planetEl.className = 'planet'

    const img = document.createElement('img')
    img.src = planet.image
    img.alt = planet.name
    img.width = 50 // Base size, can be adjusted per planet

    // Calculate orbit position
    const orbitRadius = 100 + index * 50 // Increasing radius for each planet
    const angle = index * (360 / spaceData.planets.length) * (Math.PI / 180)

    planetEl.style.left = `${centerX + orbitRadius * Math.cos(angle)}px`
    planetEl.style.top = `${centerY + orbitRadius * Math.sin(angle)}px`

    // Add tooltip with planet info
    const tooltip = document.createElement('div')
    tooltip.className = 'planet-tooltip'
    tooltip.innerHTML = `
      <h3>${planet.name}</h3>
      <p>${planet.description}</p>
      <p>Distância do Sol: ${planet.distance}</p>
    `

    planetEl.appendChild(img)
    planetEl.appendChild(tooltip)
    container.appendChild(planetEl)
  })
}

// Star Cards
function initStarCards() {
  const container = document.getElementById('starContainer')

  spaceData.stars.forEach(star => {
    const card = document.createElement('div')
    card.className = 'star-card'
    card.setAttribute('data-aos', 'fade-up')

    card.innerHTML = `
      <img src="${star.image}" alt="${star.name}" class="w-100 mb-3 rounded">
      <h3>${star.name}</h3>
      <p class="text-muted">${star.type}</p>
      <p>${star.description}</p>
      <p><small>Distância: ${star.distance}</small></p>
    `

    container.appendChild(card)
  })
}

// Galaxy Carousel
function initGalaxyCarousel() {
  const container = document.getElementById('galaxyCarousel')

  // Create carousel structure
  const carouselInner = document.createElement('div')
  carouselInner.className = 'carousel slide'
  carouselInner.setAttribute('data-bs-ride', 'carousel')

  const wrapper = document.createElement('div')
  wrapper.className = 'carousel-inner'

  spaceData.galaxies.forEach((galaxy, index) => {
    const slide = document.createElement('div')
    slide.className = `carousel-item ${index === 0 ? 'active' : ''}`

    slide.innerHTML = `
      <div class="galaxy-slide">
        <img src="${galaxy.image}" alt="${galaxy.name}" class="w-100">
        <div class="galaxy-info">
          <h3>${galaxy.name}</h3>
          <p class="mb-1">${galaxy.type}</p>
          <p class="mb-1">Tamanho: ${galaxy.size}</p>
          <p>${galaxy.description}</p>
        </div>
      </div>
    `

    wrapper.appendChild(slide)
  })

  // Add navigation controls
  const controls = `
    <button class="carousel-control-prev" type="button" data-bs-target="#galaxyCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#galaxyCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  `

  carouselInner.appendChild(wrapper)
  carouselInner.insertAdjacentHTML('beforeend', controls)
  container.appendChild(carouselInner)
}

// Phenomena Grid
function initPhenomenaGrid() {
  const container = document.getElementById('phenomenaContainer')

  spaceData.phenomena.forEach(phenomenon => {
    const card = document.createElement('div')
    card.className = 'phenomenon-card'
    card.setAttribute('data-aos', 'zoom-in')

    card.innerHTML = `
      <img src="${phenomenon.image}" alt="${phenomenon.name}" class="w-100 h-100 object-fit-cover">
      <div class="phenomenon-info p-3">
        <h3>${phenomenon.name}</h3>
        <p class="mb-1">${phenomenon.type}</p>
        <p>${phenomenon.description}</p>
      </div>
    `

    container.appendChild(card)
  })
}

// Interactive Space Section
function initInteractiveSpace() {
  const container = document.getElementById('interactiveSpace')

  // Create interactive canvas
  const canvas = document.createElement('canvas')
  canvas.width = container.offsetWidth
  canvas.height = container.offsetHeight

  const ctx = canvas.getContext('2d')

  // Add interactive stars
  function createStar(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
  }

  // Add click event to create new stars
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    createStar(x, y)
  })

  container.appendChild(canvas)
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initSolarSystem()
  initStarCards()
  initGalaxyCarousel()
  initPhenomenaGrid()
  initInteractiveSpace()
})

// Add resize handler for responsive updates
window.addEventListener('resize', () => {
  // Update any size-dependent layouts
  const container = document.querySelector('.solar-system-container')
  if (container) {
    // Recalculate planet positions
    const planets = container.querySelectorAll('.planet')
    const centerX = container.offsetWidth / 2
    const centerY = container.offsetHeight / 2

    planets.forEach((planet, index) => {
      const orbitRadius = 100 + index * 50
      const angle = index * (360 / planets.length) * (Math.PI / 180)

      planet.style.left = `${centerX + orbitRadius * Math.cos(angle)}px`
      planet.style.top = `${centerY + orbitRadius * Math.sin(angle)}px`
    })
  }
})
