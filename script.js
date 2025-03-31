// Creazione della scena
const scene = new THREE.Scene();

// Creazione della camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Creazione del renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Aggiungere una luce principale (come il Sole)
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 0, 0);
scene.add(light);

// Luce ambientale
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Luce ambientale più morbida
scene.add(ambientLight);

// Creazione del Sole (con geometria e materiale con texture)
const textureLoaderSun = new THREE.TextureLoader();
// Carica la texture per il Sole
const sunTexture = textureLoaderSun.load('textures/Sun.jpg'); 
// Creazione del materiale per il Sole con la texture
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture }); // Applicazione della texture al Sole
// Creazione della geometria del Sole
const sunGeometry = new THREE.SphereGeometry(4, 32, 32);  // Dimensioni del Sole
const sun = new THREE.Mesh(sunGeometry, sunMaterial); // Applicazione della geometria e materiale al Sole
scene.add(sun);

// Aggiungere il cielo stellato
const textureLoaderSky = new THREE.TextureLoader();
const starsTexture = textureLoaderSky.load('textures/Sky.jpg');  // Usa il tuo URL dell'immagine stellata

// Crea una sfera gigante che coprirà tutto lo sfondo
const skyGeometry = new THREE.SphereGeometry(500, 60, 60);
const skyMaterial = new THREE.MeshBasicMaterial({
    map: starsTexture,
    side: THREE.BackSide // Utilizza il lato interno della sfera per il cielo
});

// Crea la sfera del cielo stellato
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// Funzione di caricamento delle texture
const textureLoader = new THREE.TextureLoader();

// Dati dei pianeti con le texture locali
const planetsData = [
    { name: "Mercurio", radius: 0.5, distance: 7, texture: 'textures/mercury.jpg', speed: 0.04 },
    { name: "Venere", radius: 1, distance: 10, texture: 'textures/venus.jpg', speed: 0.015 },
    { name: "Terra", radius: 1, distance: 13, texture: 'textures/earth.jpg', speed: 0.01 },
    { name: "Marte", radius: 0.8, distance: 16, texture: 'textures/mars.jpg', speed: 0.008 },
    { name: "Giove", radius: 2.5, distance: 22, texture: 'textures/jupiter.jpg', speed: 0.002 },
    { name: "Saturno", radius: 2.2, distance: 28, texture: 'textures/saturn.jpg', speed: 0.0018 },
    { name: "Urano", radius: 1.8, distance: 34, texture: 'textures/uranus.jpg', speed: 0.001 },
    { name: "Nettuno", radius: 1.7, distance: 38, texture: 'textures/neptune.jpg', speed: 0.0008 }
];

// Creazione dei pianeti
const planets = [];
planetsData.forEach(data => {
    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);

    // Carica la texture e crea il materiale
    textureLoader.load(data.texture, function(texture) {
        // Verifica che la texture sia caricata correttamente
        console.log(`${data.name} texture loaded`);

        // Crea il materiale con la texture
        const material = new THREE.MeshLambertMaterial({ map: texture });

        // Crea il pianeta con il materiale
        const planet = new THREE.Mesh(geometry, material);
        scene.add(planet);
        planets.push({ mesh: planet, data });
    }, undefined, function(error) {
        console.error('Errore nel caricamento della texture:', error);
    });
});

// Funzione di animazione
let time = 0;
function animate() {
    requestAnimationFrame(animate);

    // Aggiorna il tempo per il movimento dei pianeti
    //time += 0.01;
    time += 3.5;
    // Muove ogni pianeta lungo l'orbita
    planets.forEach(({ mesh, data }) => {
        mesh.position.x = Math.cos(time * data.speed) * data.distance;
        mesh.position.z = Math.sin(time * data.speed) * data.distance;
    });

    // Renderizza la scena
    renderer.render(scene, camera);
}

// Avvio dell'animazione
animate();
