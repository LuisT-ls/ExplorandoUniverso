// Inicializa AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  })
})

// Animação suave do scroll do mouse na seção hero
const scrollIndicator = document.querySelector('.scroll-indicator')
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const sistemaSolar = document.querySelector('#sistema-solar')
    sistemaSolar.scrollIntoView({ behavior: 'smooth' })
  })
}

// Adiciona classe de animação aos elementos quando visíveis
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate')
    }
  })
}, observerOptions)

document.querySelectorAll('.space-section').forEach(section => {
  observer.observe(section)
})
