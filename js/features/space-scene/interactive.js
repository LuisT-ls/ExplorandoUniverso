export function initializeInteractiveSpace() {
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
