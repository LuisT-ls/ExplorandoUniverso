import spaceData from '../../core/data.js'

export function initializeStarCards() {
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
