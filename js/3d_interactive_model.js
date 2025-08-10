/**
 * 3d_interactive_model.js - Three.js implementation for Stargate 3D Model
 * Author: David (davestj)
 * Created: 2025-07-25
 * Modified: 2025-07-28
 * Purpose: Complete Three.js scene management with fixed viewport handling
 *
 * CHANGELOG:
 * - 2025-07-28: Fixed canvas sizing to properly fit container
 * - 2025-07-28: Improved camera positioning for all viewport sizes
 * - 2025-07-28: Added mobile touch controls and gesture support
 * - 2025-07-28: Fixed component label positioning with new HTML structure
 * - 2025-07-28: Added performance optimizations for mobile devices
 * - 2025-07-28: Implemented proper resize handling without distortion
 */

// We're creating our main 3D visualization controller
class Stargate3DModel {
    constructor() {
        // We're initializing our core Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;

        // We're tracking our model components
        this.stargate = null;
        this.reactor = null;
        this.emFieldGenerators = [];
        this.portalEffect = null;
        this.particles = [];

        // We're managing animation state
        this.animationId = null;
        this.rotationSpeed = 0.002;
        this.portalActivity = 0;
        this.currentView = 'iso';
        this.isAnimating = true;

        // We're tracking interaction state
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;

        // We're detecting device capabilities
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // We're initializing when DOM is ready
        this.init();
    }

    init() {
        // We're setting up the container reference
        this.container = document.getElementById('canvas-container');
        if (!this.container) {
            console.error('Canvas container not found!');
            return;
        }

        // We're creating our Three.js scene
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();

        // We're building the stargate model
        this.createStargateModel();
        this.createReferenceGrid();

        // We're setting up all event handlers
        this.setupControls();
        this.setupMouseInteraction();
        this.setupTouchControls();

        // We're handling window resize
        window.addEventListener('resize', () => this.handleResize(), false);

        // We're showing loading progress
        this.updateLoadingProgress(50);

        // We're starting the animation
        this.animate();

        // We're hiding the loading screen after initialization
        setTimeout(() => {
            this.updateLoadingProgress(100);
            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('hide');
            }, 300);
        }, 1000);
    }

    setupScene() {
        // We're creating the 3D scene with a lighter background for better visibility
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 100, 500);
    }

    setupCamera() {
        // We're calculating the proper aspect ratio from container
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        const aspect = width / height;

        // We're creating a perspective camera with optimized FOV
        this.camera = new THREE.PerspectiveCamera(
            this.isMobile ? 60 : 50, // Wider FOV on mobile
            aspect,
            0.1,
            1000
        );

        // We're positioning the camera for the best initial view
        this.setCameraPosition('iso');
    }

    setupRenderer() {
        // We're creating the WebGL renderer with proper settings
        this.renderer = new THREE.WebGLRenderer({
            antialias: !this.isMobile, // Disable antialiasing on mobile for performance
            powerPreference: "high-performance"
        });

        // We're setting the size to match the container exactly
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.renderer.setSize(width, height);

        // We're setting the pixel ratio for sharp rendering
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // We're enabling shadows for better visual quality
        this.renderer.shadowMap.enabled = !this.isMobile;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // We're adding the canvas to our container
        this.container.appendChild(this.renderer.domElement);
    }

    setupLighting() {
        // We're creating brighter ambient lighting for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        // We're adding a main directional light with increased intensity
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(50, 100, 50);
        directionalLight.castShadow = !this.isMobile;

        if (!this.isMobile) {
            directionalLight.shadow.camera.left = -50;
            directionalLight.shadow.camera.right = 50;
            directionalLight.shadow.camera.top = 50;
            directionalLight.shadow.camera.bottom = -50;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
        }

        this.scene.add(directionalLight);

        // We're adding additional lighting from different angles
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight2.position.set(-50, 50, -50);
        this.scene.add(directionalLight2);

        // We're adding accent point lights for the stargate
        const pointLight1 = new THREE.PointLight(0x3fbac2, 1.0, 100);
        pointLight1.position.set(30, 0, 0);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x3fbac2, 1.0, 100);
        pointLight2.position.set(-30, 0, 0);
        this.scene.add(pointLight2);

        // We're adding a bottom light to illuminate the reactor
        const pointLight3 = new THREE.PointLight(0xff6b6b, 0.8, 50);
        pointLight3.position.set(0, -20, 0);
        this.scene.add(pointLight3);
    }

    createStargateModel() {
        // We're creating the main stargate group
        this.stargate = new THREE.Group();

        // We're building the outer ring structure with proper materials
        const ringGeometry = new THREE.TorusGeometry(20, 2, 16, 100);
        const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a3f5f,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x3fbac2,
            emissiveIntensity: 0.2
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.castShadow = true;
        ring.receiveShadow = true;
        this.stargate.add(ring);

        // We're adding a secondary inner ring for detail
        const innerRingGeometry = new THREE.TorusGeometry(18, 1, 8, 100);
        const innerRingMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x3fbac2,
            emissiveIntensity: 0.1
        });
        const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
        this.stargate.add(innerRing);

        // We're creating the chevron segments with better visibility
        for (let i = 0; i < 9; i++) {
            const angle = (Math.PI * 2 / 9) * i;
            const chevronGeometry = new THREE.BoxGeometry(3, 1.5, 4);
            const chevronMaterial = new THREE.MeshStandardMaterial({
                color: 0x3fbac2,
                metalness: 0.6,
                roughness: 0.3,
                emissive: 0x3fbac2,
                emissiveIntensity: 0.4
            });
            const chevron = new THREE.Mesh(chevronGeometry, chevronMaterial);
            chevron.position.x = Math.cos(angle) * 18;
            chevron.position.z = Math.sin(angle) * 18;
            chevron.rotation.y = -angle;
            chevron.castShadow = true;
            this.stargate.add(chevron);
        }

        // We're creating the Base-8 EM field generators
        const emFieldGroup = new THREE.Group();
        emFieldGroup.name = 'EMFieldGroup';

        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const fieldGeometry = new THREE.SphereGeometry(2, 16, 16);
            const fieldMaterial = new THREE.MeshStandardMaterial({
                color: 0x4ecdc4,
                metalness: 0.4,
                roughness: 0.3,
                emissive: 0x4ecdc4,
                emissiveIntensity: 0.6,
                transparent: true,
                opacity: 0.9
            });
            const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
            field.position.x = Math.cos(angle) * 25;
            field.position.z = Math.sin(angle) * 25;
            field.name = `EMField_${i}`;

            // We're adding connecting rods
            const rodGeometry = new THREE.CylinderGeometry(0.3, 0.3, 8);
            const rodMaterial = new THREE.MeshStandardMaterial({
                color: 0x4ecdc4,
                metalness: 0.7,
                roughness: 0.2,
                emissive: 0x4ecdc4,
                emissiveIntensity: 0.3
            });
            const rod = new THREE.Mesh(rodGeometry, rodMaterial);
            rod.position.copy(field.position);
            rod.position.multiplyScalar(0.85);
            rod.lookAt(0, 0, 0);
            rod.rotateX(Math.PI / 2);

            emFieldGroup.add(field);
            emFieldGroup.add(rod);
            this.emFieldGenerators.push(field);
        }

        this.stargate.add(emFieldGroup);

        // We're creating the portal effect
        this.createPortalEffect();

        // We're creating the Base-3 reactor core
        this.createReactorCore();

        // We're adding support structures
        this.createSupportStructures();

        // We're adding the complete stargate to the scene
        this.scene.add(this.stargate);
    }

    createPortalEffect() {
        // We're creating a custom shader for the portal effect
        const portalGeometry = new THREE.PlaneGeometry(34, 34, 64, 64);
        const portalMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                activity: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform float activity;
                varying vec2 vUv;
                
                void main() {
                    vec2 center = vec2(0.5, 0.5);
                    float dist = distance(vUv, center);
                    
                    float wave = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;
                    vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(0.247, 0.729, 0.753), wave * activity);
                    float alpha = (1.0 - dist * 2.0) * activity * 0.8;
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });

        this.portalEffect = new THREE.Mesh(portalGeometry, portalMaterial);
        this.portalEffect.rotation.x = Math.PI / 2;
        this.stargate.add(this.portalEffect);
    }

    createReactorCore() {
        // We're creating the reactor group
        const reactorGroup = new THREE.Group();
        reactorGroup.name = 'ReactorGroup';

        // We're building the core geometry
        const coreGeometry = new THREE.OctahedronGeometry(3, 0);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0xff6b6b,
            emissive: 0xff6b6b,
            emissiveIntensity: 0.6
        });
        this.reactor = new THREE.Mesh(coreGeometry, coreMaterial);
        this.reactor.position.y = -10;
        this.reactor.name = 'ReactorCore';
        reactorGroup.add(this.reactor);

        // We're adding containment sphere
        const containmentGeometry = new THREE.SphereGeometry(4, 32, 32);
        const containmentMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a2e,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const containment = new THREE.Mesh(containmentGeometry, containmentMaterial);
        containment.position.y = -10;
        reactorGroup.add(containment);

        this.stargate.add(reactorGroup);
    }

    createSupportStructures() {
        // We're creating support pillars
        const supportGeometry = new THREE.CylinderGeometry(1, 2, 10);
        const supportMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a2e,
            emissive: 0x16213e,
            emissiveIntensity: 0.2
        });

        for (let i = 0; i < 3; i++) {
            const angle = (Math.PI * 2 / 3) * i;
            const support = new THREE.Mesh(supportGeometry, supportMaterial);
            support.position.x = Math.cos(angle) * 15;
            support.position.y = -5;
            support.position.z = Math.sin(angle) * 15;
            support.castShadow = true;
            this.stargate.add(support);
        }
    }

    createReferenceGrid() {
        // We're creating a grid helper for spatial reference
        const gridHelper = new THREE.GridHelper(100, 20, 0x3fbac2, 0x1a1a2e);
        gridHelper.position.y = -15;
        gridHelper.name = 'ReferenceGrid';
        this.scene.add(gridHelper);
    }

    setupControls() {
        // We're setting up rotation speed control
        const rotationSlider = document.getElementById('rotation-speed');
        rotationSlider.addEventListener('input', (e) => {
            this.rotationSpeed = e.target.value / 10000;
            document.getElementById('rotation-value').textContent = e.target.value + '%';
        });

        // We're setting up portal activity control
        const portalSlider = document.getElementById('portal-activity');
        portalSlider.addEventListener('input', (e) => {
            this.portalActivity = e.target.value / 100;
            document.getElementById('portal-value').textContent = e.target.value + '%';
            document.getElementById('energy-stat').textContent = (12.5 * this.portalActivity).toFixed(1) + ' TW';

            // We're updating the portal shader
            if (this.portalEffect && this.portalEffect.material.uniforms) {
                this.portalEffect.material.uniforms.activity.value = this.portalActivity;
            }

            // We're updating EM field intensity
            this.emFieldGenerators.forEach(field => {
                field.material.emissiveIntensity = 0.5 + this.portalActivity * 0.5;
            });
        });

        // We're setting up view mode buttons
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.setViewMode(e.currentTarget.dataset.mode);
            });
        });

        // We're setting up component visibility buttons
        document.querySelectorAll('[data-component]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-component]').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.showComponent(e.currentTarget.dataset.component);
            });
        });

        // We're setting up display options
        document.getElementById('show-labels').addEventListener('change', (e) => {
            const labels = document.querySelectorAll('.component-label');
            labels.forEach(label => {
                label.style.display = e.target.checked ? 'block' : 'none';
            });
        });

        document.getElementById('show-grid').addEventListener('change', (e) => {
            const grid = this.scene.getObjectByName('ReferenceGrid');
            if (grid) grid.visible = e.target.checked;
        });

        document.getElementById('show-particles').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.createEnergyParticles();
            } else {
                this.removeEnergyParticles();
            }
        });

        // We're setting up view control buttons
        window.setView = (view) => this.setView(view);
        window.toggleAnimation = () => this.toggleAnimation();
    }

    setupMouseInteraction() {
        // We're tracking mouse movement for camera control
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - window.innerWidth / 2) / 100;
            this.mouseY = (e.clientY - window.innerHeight / 2) / 100;
        });

        // We're setting up click interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        this.renderer.domElement.addEventListener('click', (e) => {
            // We're calculating mouse position in normalized device coordinates
            const rect = this.renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            // We're checking for intersections
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.stargate.children, true);

            if (intersects.length > 0) {
                this.showComponentInfo(intersects[0].object);
            }
        });
    }

    setupTouchControls() {
        if (!this.isMobile) return;

        // We're setting up touch controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;

        this.renderer.domElement.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                currentRotationX = this.stargate.rotation.x;
                currentRotationY = this.stargate.rotation.y;
            }
        });

        this.renderer.domElement.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                const deltaX = e.touches[0].clientX - touchStartX;
                const deltaY = e.touches[0].clientY - touchStartY;

                this.stargate.rotation.y = currentRotationY + deltaX * 0.01;
                this.stargate.rotation.x = currentRotationX + deltaY * 0.01;
            }
        });

        // We're adding pinch to zoom
        let pinchDistance = 0;

        this.renderer.domElement.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                pinchDistance = Math.sqrt(dx * dx + dy * dy);
            }
        });

        this.renderer.domElement.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const scale = distance / pinchDistance;
                this.camera.fov = Math.max(30, Math.min(90, this.camera.fov / scale));
                this.camera.updateProjectionMatrix();

                pinchDistance = distance;
            }
        });
    }

    setCameraPosition(view) {
        // We're setting camera positions closer to the model for better visibility
        switch(view) {
            case 'front':
                this.camera.position.set(0, 0, 45);
                break;
            case 'side':
                this.camera.position.set(45, 0, 0);
                break;
            case 'iso':
            default:
                this.camera.position.set(30, 25, 30);
        }
        this.camera.lookAt(0, 0, 0);
    }

    setView(view) {
        // We're animating camera to new position
        this.currentView = view;
        const duration = 1000;
        const start = Date.now();
        const startPos = this.camera.position.clone();

        let endPos;
        switch(view) {
            case 'front':
                endPos = new THREE.Vector3(0, 0, 60);
                break;
            case 'side':
                endPos = new THREE.Vector3(60, 0, 0);
                break;
            case 'iso':
            default:
                endPos = new THREE.Vector3(40, 30, 40);
        }

        const animateCamera = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            this.camera.position.lerpVectors(startPos, endPos, eased);
            this.camera.lookAt(0, 0, 0);

            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            }
        };

        animateCamera();
    }

    setViewMode(mode) {
        // We're changing how the model is displayed
        switch(mode) {
            case 'interior':
                this.stargate.traverse(child => {
                    if (child instanceof THREE.Mesh) {
                        if (!child.userData.originalMaterial) {
                            child.userData.originalMaterial = child.material.clone();
                        }
                        child.material.opacity = 0.3;
                        child.material.transparent = true;
                        child.material.wireframe = false;
                        child.material.needsUpdate = true;
                    }
                });
                break;

            case 'xray':
                this.stargate.traverse(child => {
                    if (child instanceof THREE.Mesh) {
                        if (!child.userData.originalMaterial) {
                            child.userData.originalMaterial = child.material.clone();
                        }
                        child.material.wireframe = true;
                        child.material.opacity = 1.0;
                        child.material.transparent = false;
                        child.material.needsUpdate = true;
                    }
                });
                break;

            case 'exterior':
            default:
                this.stargate.traverse(child => {
                    if (child instanceof THREE.Mesh) {
                        if (child.userData.originalMaterial) {
                            // We're restoring the original material properties
                            child.material.opacity = child.userData.originalMaterial.opacity;
                            child.material.transparent = child.userData.originalMaterial.transparent;
                            child.material.wireframe = false;
                        } else {
                            child.material.wireframe = false;
                            child.material.opacity = 1.0;
                            child.material.transparent = false;
                        }
                        child.material.needsUpdate = true;
                    }
                });
        }
    }

    showComponent(component) {
        // We're controlling component visibility
        this.stargate.traverse(child => {
            if (child instanceof THREE.Mesh) {
                switch(component) {
                    case 'reactor':
                        child.visible = child.name === 'ReactorCore' ||
                            child.parent.name === 'ReactorGroup' ||
                            child.position.y < -5;
                        break;

                    case 'field':
                        child.visible = child.name.includes('EMField') ||
                            child.parent.name === 'EMFieldGroup' ||
                            child.material.color.getHex() === 0x4ecdc4;
                        break;

                    case 'all':
                    default:
                        child.visible = true;
                }
            }
        });
    }

    showComponentInfo(object) {
        // We're displaying component information
        const infoPanel = document.getElementById('info-panel');
        let title = 'Stargate Component';
        let description = '';
        let specs = [];

        // We're determining which component was clicked
        if (object.name === 'ReactorCore' || object.position.y < -5) {
            title = 'Base-3 Reactor Core';
            description = 'The ternary nuclear fission reactor provides sustainable energy through a three-way atomic split process.';
            specs = [
                { label: 'Output', value: '12.5 TW' },
                { label: 'Efficiency', value: '87%' },
                { label: 'Fuel', value: 'Thorium-232' },
                { label: 'Cycle Time', value: '0.3ms' }
            ];
            this.updateComponentLabel('label-reactor', object);
        } else if (object.name.includes('EMField')) {
            title = 'EM Field Generator';
            description = 'One of eight superconducting electromagnetic field generators that stabilize the wormhole aperture.';
            specs = [
                { label: 'Field Strength', value: '75 Tesla' },
                { label: 'Temperature', value: '4.2 K' },
                { label: 'Material', value: 'YBCO Superconductor' },
                { label: 'Power Draw', value: '1.56 TW' }
            ];
            this.updateComponentLabel('label-emfield', object);
        } else {
            title = 'Stargate Ring Assembly';
            description = 'The main ring structure houses the electromagnetic field generators and serves as the primary containment system.';
            specs = [
                { label: 'Diameter', value: '50 meters' },
                { label: 'Material', value: 'Graphene-Neutronium' },
                { label: 'EM Loops', value: '8 Superconducting' },
                { label: 'Power Required', value: '12.5 TW' }
            ];
            this.updateComponentLabel('label-portal', object);
        }

        // We're updating the info panel content
        infoPanel.querySelector('h4').textContent = title;
        infoPanel.querySelector('p').textContent = description;

        const specsContainer = infoPanel.querySelector('.specs');
        specsContainer.innerHTML = specs.map(spec => `
            <div class="spec-item">
                <span class="spec-label">${spec.label}:</span>
                <span class="spec-value">${spec.value}</span>
            </div>
        `).join('');

        // We're showing the panel
        infoPanel.classList.add('show');

        // We're hiding it after 5 seconds
        setTimeout(() => {
            infoPanel.classList.remove('show');
        }, 5000);
    }

    updateComponentLabel(labelId, object) {
        // We're positioning component labels in screen space
        const label = document.getElementById(labelId);
        if (!label || !document.getElementById('show-labels').checked) return;

        const vector = new THREE.Vector3();
        object.getWorldPosition(vector);
        vector.project(this.camera);

        const x = (vector.x * 0.5 + 0.5) * this.container.clientWidth;
        const y = (vector.y * -0.5 + 0.5) * this.container.clientHeight;

        label.style.left = x + 'px';
        label.style.top = y + 'px';
        label.classList.add('show');

        setTimeout(() => {
            label.classList.remove('show');
        }, 3000);
    }

    createEnergyParticles() {
        // We're creating energy particle effects
        const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.8
        });

        for (let i = 0; i < 30; i++) { // Reduced for mobile performance
            const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
            const angle = Math.random() * Math.PI * 2;
            const radius = 25 + Math.random() * 10;

            particle.position.x = Math.cos(angle) * radius;
            particle.position.z = Math.sin(angle) * radius;
            particle.position.y = -10 + Math.random() * 20;

            particle.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.5,
                    Math.random() * 0.5,
                    (Math.random() - 0.5) * 0.5
                ),
                life: Math.random()
            };

            this.particles.push(particle);
            this.scene.add(particle);
        }
    }

    removeEnergyParticles() {
        // We're removing all particle effects
        this.particles.forEach(particle => {
            this.scene.remove(particle);
            particle.geometry.dispose();
            particle.material.dispose();
        });
        this.particles = [];
    }

    updateParticles() {
        // We're animating particle movement
        this.particles.forEach(particle => {
            particle.position.add(particle.userData.velocity);
            particle.userData.life -= 0.01;
            particle.material.opacity = particle.userData.life;

            // We're resetting particles that have faded
            if (particle.userData.life <= 0) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 25 + Math.random() * 10;

                particle.position.x = Math.cos(angle) * radius;
                particle.position.z = Math.sin(angle) * radius;
                particle.position.y = -10;
                particle.userData.life = 1;
            }
        });
    }

    toggleAnimation() {
        // We're toggling the animation state
        this.isAnimating = !this.isAnimating;
        const toggleText = document.getElementById('animation-toggle-text');
        if (toggleText) {
            toggleText.textContent = this.isAnimating ? 'Pause Animation' : 'Resume Animation';
        }
    }

    handleResize() {
        // We're properly handling window resize events
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        // We're updating camera aspect ratio
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        // We're updating renderer size
        this.renderer.setSize(width, height);
    }

    updateLoadingProgress(percent) {
        // We're updating the loading progress bar
        const progressBar = document.getElementById('loading-progress');
        if (progressBar) {
            progressBar.style.width = percent + '%';
        }
    }

    updateCameraPosition() {
        // We're smoothly moving the camera based on mouse position
        if (this.currentView === 'iso' && !this.isMobile) {
            this.targetX += (this.mouseX - this.targetX) * 0.05;
            this.targetY += (this.mouseY - this.targetY) * 0.05;

            this.camera.position.x = 40 + this.targetX * 10;
            this.camera.position.y = 30 - this.targetY * 10;
            this.camera.lookAt(0, 0, 0);
        }
    }

    animate() {
        // We're running the main animation loop
        this.animationId = requestAnimationFrame(() => this.animate());

        if (this.isAnimating) {
            // We're rotating the stargate
            if (this.stargate) {
                this.stargate.rotation.z += this.rotationSpeed;
            }

            // We're animating the reactor core
            if (this.reactor) {
                this.reactor.rotation.x += 0.01;
                this.reactor.rotation.y += 0.02;
            }

            // We're pulsing the EM fields
            this.emFieldGenerators.forEach((field, index) => {
                const scale = 1 + Math.sin(Date.now() * 0.001 + index * Math.PI / 4) * 0.2;
                field.scale.setScalar(scale);
            });

            // We're updating the portal shader
            if (this.portalEffect && this.portalEffect.material.uniforms) {
                this.portalEffect.material.uniforms.time.value = Date.now() * 0.001;
            }

            // We're updating particles if they exist
            if (this.particles.length > 0) {
                this.updateParticles();
            }
        }

        // We're updating camera position
        this.updateCameraPosition();

        // We're rendering the scene
        this.renderer.render(this.scene, this.camera);
    }
}

// We're initializing the 3D model when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // We're checking if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded! Please check script inclusion.');
        return;
    }

    // We're creating our 3D model instance
    window.stargateModel = new Stargate3DModel();
});

/*
CARRYOVER CONTEXT FOR NEXT CHAT:
- We've fixed all viewport and canvas sizing issues
- Implemented proper mobile touch controls
- Added performance optimizations for mobile devices
- Fixed component label positioning with new HTML structure
- Next features to consider:
  1. VR/AR support using WebXR
  2. Advanced particle systems with GPU computation
  3. Real-time physics simulation for portal effects
  4. Multi-user collaborative viewing mode
  5. Export functionality for 3D printing
*/