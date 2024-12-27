const spaceData = {
  planets: [
    {
      name: 'Mercúrio',
      distance: '57.9 milhões km',
      description: 'O planeta mais próximo do Sol',
      image: 'assets/images/sistema-solar/mercury.png',
      orbitSpeed: 'fast'
    },
    {
      name: 'Vênus',
      distance: '108.2 milhões km',
      description: 'O planeta mais quente',
      image: 'assets/images/sistema-solar/venus.png',
      orbitSpeed: 'medium'
    },
    {
      name: 'Terra',
      distance: '149.6 milhões km',
      description: 'Nosso planeta natal',
      image: 'assets/images/sistema-solar/earth.png',
      orbitSpeed: 'medium'
    },
    {
      name: 'Marte',
      distance: '227.9 milhões km',
      description: 'O planeta vermelho',
      image: 'assets/images/sistema-solar/mars.png',
      orbitSpeed: 'medium'
    },
    {
      name: 'Júpiter',
      distance: '778.5 milhões km',
      description: 'O maior planeta',
      image: 'assets/images/sistema-solar/jupiter.png',
      orbitSpeed: 'slow'
    },
    {
      name: 'Saturno',
      distance: '1.4 bilhões km',
      description: 'O planeta dos anéis',
      image: 'assets/images/sistema-solar/saturn.png',
      orbitSpeed: 'slow'
    },
    {
      name: 'Urano',
      distance: '2.9 bilhões km',
      description: 'O planeta inclinado',
      image: 'assets/images/sistema-solar/uranus.png',
      orbitSpeed: 'slow'
    },
    {
      name: 'Netuno',
      distance: '4.5 bilhões km',
      description: 'O planeta dos ventos',
      image: 'assets/images/sistema-solar/neptune.png',
      orbitSpeed: 'slow'
    }
  ],

  stars: [
    {
      name: 'Próxima Centauri',
      type: 'Anã Vermelha',
      distance: '4.2 anos-luz',
      description: 'A estrela mais próxima do Sol',
      image: 'assets/images/estrelas/proxima-centauri.jpg'
    },
    {
      name: 'Sirius',
      type: 'Estrela Binária',
      distance: '8.6 anos-luz',
      description: 'A estrela mais brilhante do céu noturno',
      image: 'assets/images/estrelas/sirius.jpg'
    },
    {
      name: 'Betelgeuse',
      type: 'Supergigante Vermelha',
      distance: '642.5 anos-luz',
      description: 'Uma das maiores estrelas conhecidas',
      image: 'assets/images/estrelas/betelgeuse.jpg'
    },
    {
      name: 'Vega',
      type: 'Estrela Branca-Azulada',
      distance: '25 anos-luz',
      description:
        'Uma das estrelas mais brilhantes do hemisfério norte, parte da constelação de Lira',
      image: 'assets/images/estrelas/vega.jpg'
    }
  ],
  
  galaxies: [
    {
      name: 'Via Láctea',
      type: 'Espiral Barrada',
      size: '100.000 anos-luz',
      description: 'Nossa galáxia natal',
      image: 'assets/images/galaxias/milky-way.jpg'
    },
    {
      name: 'Andrômeda',
      type: 'Espiral',
      size: '220.000 anos-luz',
      description: 'A galáxia espiral mais próxima',
      image: 'assets/images/galaxias/andromeda.jpg'
    },
    {
      name: 'Galáxia do Redemoinho',
      type: 'Espiral',
      size: '60.000 anos-luz',
      description: 'Conhecida por seu padrão espiral distinto',
      image: 'assets/images/galaxias/whirlpool.jpg'
    }
  ],

  phenomena: [
    {
      name: 'Buraco Negro',
      type: 'Gravitacional',
      description:
        'Região do espaço onde a gravidade é tão forte que nada escapa',
      image: 'assets/images/fenomenos/black-hole.jpg'
    },
    {
      name: 'Nebulosa',
      type: 'Nuvem Cósmica',
      description: 'Nuvem interestelar de gás e poeira',
      image: 'assets/images/fenomenos/nebula.jpg'
    },
    {
      name: 'Supernova',
      type: 'Explosão Estelar',
      description: 'Explosão catastrófica de uma estrela',
      image: 'assets/images/fenomenos/supernova.jpg'
    },
    {
      name: 'Aurora Boreal',
      type: 'Fenômeno Atmosférico',
      description: 'Luzes naturais no céu polar',
      image: 'assets/images/fenomenos/aurora.jpg'
    }
  ]
}

export default spaceData
