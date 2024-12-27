export function initializeNavigationEffects() {
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

export function initializeParallaxEffects() {
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

initializeParallaxEffects()
