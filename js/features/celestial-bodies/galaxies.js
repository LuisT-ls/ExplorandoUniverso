import spaceData from '../../core/data.js'

export function initializeGalaxyCarousel() {
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
