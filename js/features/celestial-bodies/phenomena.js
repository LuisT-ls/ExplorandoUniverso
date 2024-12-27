import spaceData from '../../core/data.js'

export function initializePhenomena() {
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

export function showPhenomenonDetails(phenomenon) {
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
