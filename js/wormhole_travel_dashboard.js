/**
 * wormhole_travel_dashboard.js - Extracted JavaScript for wormhole_travel_dashboard
 * Author: David (davestj)
 * Extracted on: 2025-07-25 21:40:15
 */

// simulator.js - Wormhole travel simulation logic

        // I'm creating the main simulation controller
        class WormholeSimulator {
            constructor() {
                this.canvas = document.getElementById('simulation-canvas');
                this.ctx = this.canvas.getContext('2d');
                this.stars = [];
                this.particles = [];
                this.wormholeActive = false;
                this.powerLevel = 0;
                this.currentLocation = 'earth';
                this.destinations = {
                    'mars': {
                        name: 'Mars - Olympus Mons Base',
                        distance: '225M km',
                        time: 0.8,
                        energy: 8.5,
                        drift: 0.2,
                        coordinates: { x: 1.524, y: 0, z: 0 }
                    },
                    'moon': {
                        name: 'Moon - Tycho Station',
                        distance: '384K km',
                        time: 0.001,
                        energy: 2.1,
                        drift: 0.01,
                        coordinates: { x: 0.00257, y: 0, z: 0 }
                    },
                    'jupiter': {
                        name: 'Jupiter - Europa Outpost',
                        distance: '778M km',
                        time: 2.1,
                        energy: 15.3,
                        drift: 0.5,
                        coordinates: { x: 5.204, y: 0, z: 0 }
                    },
                    'saturn': {
                        name: 'Saturn - Titan Colony',
                        distance: '1.4B km',
                        time: 3.8,
                        energy: 22.7,
                        drift: 0.8,
                        coordinates: { x: 9.537, y: 0, z: 0 }
                    },
                    'alpha-centauri': {
                        name: 'Alpha Centauri - Proxima b',
                        distance: '4.37 ly',
                        time: 12.5,
                        energy: 87.2,
                        drift: 2.1,
                        coordinates: { x: 41343, y: 0, z: 0 }
                    },
                    'kepler': {
                        name: 'Kepler-452b - Earth 2.0',
                        distance: '1,400 ly',
                        time: 45.2,
                        energy: 156.8,
                        drift: 5.3,
                        coordinates: { x: 13239600, y: 0, z: 0 }
                    }
                };

                this.init();
            }

            init() {
                // Set canvas size
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());

                // Initialize starfield
                this.createStarfield();

                // Setup event listeners
                this.setupEventListeners();

                // Start animation loop
                this.animate();

                // Update time display
                setInterval(() => this.updateTime(), 1000);
            }

            resizeCanvas() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            createStarfield() {
                // Create background stars
                for (let i = 0; i < 500; i++) {
                    this.stars.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        size: Math.random() * 2,
                        brightness: Math.random()
                    });
                }
            }

            setupEventListeners() {
                // Destination selection
                document.getElementById('destination-select').addEventListener('change', (e) => {
                    this.updateDestinationInfo(e.target.value);
                });

                // Power controls
                const reactorSlider = document.getElementById('reactor-output');
                reactorSlider.addEventListener('input', (e) => {
                    const value = e.target.value;
                    document.getElementById('reactor-value').textContent = (value * 0.125).toFixed(1) + ' TW';
                    this.updatePowerLevel();
                });

                const fieldSlider = document.getElementById('field-strength');
                fieldSlider.addEventListener('input', (e) => {
                    const value = e.target.value;
                    document.getElementById('field-value').textContent = (value * 0.75).toFixed(0) + ' Tesla';
                    this.updatePowerLevel();
                });

                // Control buttons
                document.getElementById('power-up-btn').addEventListener('click', () => this.powerUpSequence());
                document.getElementById('initiate-btn').addEventListener('click', () => this.initiateTravel());
                document.getElementById('abort-btn').addEventListener('click', () => this.abortTravel());

                // Initialize destination info
                this.updateDestinationInfo('mars');
            }

            updateDestinationInfo(destination) {
                const dest = this.destinations[destination];
                document.getElementById('dest-distance').textContent = dest.distance;
                document.getElementById('dest-time').textContent = dest.time + ' seconds';
                document.getElementById('dest-energy').textContent = dest.energy + ' TW';
                document.getElementById('dest-drift').textContent = '±' + dest.drift + ' ms';

                // Check if we have enough power
                this.checkSafetyStatus();
            }

            updatePowerLevel() {
                const reactorOutput = document.getElementById('reactor-output').value;
                const fieldStrength = document.getElementById('field-strength').value;

                this.powerLevel = (parseInt(reactorOutput) + parseInt(fieldStrength)) / 2;

                // Update power gauge
                const powerArc = document.getElementById('power-arc');
                const circumference = 2 * Math.PI * 80;
                const offset = circumference - (this.powerLevel / 100) * circumference;
                powerArc.style.strokeDashoffset = offset;

                document.getElementById('power-percent').textContent = Math.floor(this.powerLevel);

                // Update console values
                document.getElementById('stability-value').textContent = Math.floor(this.powerLevel * 0.9);
                document.getElementById('shear-value').textContent = (this.powerLevel * 0.02).toFixed(1);
                document.getElementById('quantum-value').textContent = (this.powerLevel * 0.001).toFixed(3);

                // Update navigation lock
                if (this.powerLevel > 50) {
                    document.getElementById('nav-lock').textContent = 'LOCKED';
                    document.getElementById('nav-lock').style.color = '#2ecc71';
                } else {
                    document.getElementById('nav-lock').textContent = 'OFFLINE';
                    document.getElementById('nav-lock').style.color = '#e74c3c';
                }

                this.checkSafetyStatus();
            }

            checkSafetyStatus() {
                const destination = document.getElementById('destination-select').value;
                const requiredEnergy = this.destinations[destination].energy;
                const availableEnergy = this.powerLevel * 0.125;

                const safetyCheck = document.getElementById('safety-check');
                const initiateBtn = document.getElementById('initiate-btn');

                if (availableEnergy >= requiredEnergy && this.powerLevel > 50) {
                    safetyCheck.className = 'safety-check ready';
                    safetyCheck.innerHTML = '<strong>Safety Status:</strong> All systems nominal';
                    initiateBtn.disabled = false;
                } else if (availableEnergy >= requiredEnergy * 0.8) {
                    safetyCheck.className = 'safety-check warning';
                    safetyCheck.innerHTML = '<strong>Safety Status:</strong> Marginal power levels';
                    initiateBtn.disabled = false;
                } else {
                    safetyCheck.className = 'safety-check warning';
                    safetyCheck.innerHTML = '<strong>Safety Status:</strong> Insufficient power';
                    initiateBtn.disabled = true;
                }
            }

            powerUpSequence() {
                // Animate power up
                let currentReactor = 0;
                let currentField = 0;

                const powerUpInterval = setInterval(() => {
                    if (currentReactor < 80) {
                        currentReactor += 2;
                        document.getElementById('reactor-output').value = currentReactor;
                        document.getElementById('reactor-value').textContent = (currentReactor * 0.125).toFixed(1) + ' TW';
                    }

                    if (currentField < 80) {
                        currentField += 2;
                        document.getElementById('field-strength').value = currentField;
                        document.getElementById('field-value').textContent = (currentField * 0.75).toFixed(0) + ' Tesla';
                    }

                    this.updatePowerLevel();

                    if (currentReactor >= 80 && currentField >= 80) {
                        clearInterval(powerUpInterval);
                        this.showAlert('Power up sequence complete', 'success');
                    }
                }, 50);
            }

            initiateTravel() {
                if (this.wormholeActive) return;

                const destination = document.getElementById('destination-select').value;
                const dest = this.destinations[destination];

                // Update status
                document.getElementById('portal-status').textContent = 'ACTIVATING';
                document.getElementById('system-status').textContent = 'ENGAGED';
                document.getElementById('initiate-btn').disabled = true;
                document.getElementById('abort-btn').disabled = false;

                // Start wormhole effect
                this.wormholeActive = true;

                // Show travel overlay after activation
                setTimeout(() => {
                    document.getElementById('travel-overlay').classList.add('active');
                    this.simulateTravel(dest);
                }, 2000);
            }

            simulateTravel(destination) {
                const travelTime = destination.time * 1000; // Convert to milliseconds
                let progress = 0;

                const travelInterval = setInterval(() => {
                    progress += 100 / (travelTime / 100);
                    document.getElementById('travel-progress').style.width = progress + '%';

                    const remaining = ((100 - progress) / 100 * destination.time).toFixed(1);
                    document.getElementById('travel-eta').textContent = remaining;

                    if (progress >= 100) {
                        clearInterval(travelInterval);
                        this.arriveAtDestination(destination);
                    }
                }, 100);
            }

            arriveAtDestination(destination) {
                // Hide travel overlay
                document.getElementById('travel-overlay').classList.remove('active');

                // Update location
                document.getElementById('current-location').textContent = destination.name.split(' - ')[0];

                // Reset controls
                this.wormholeActive = false;
                document.getElementById('portal-status').textContent = 'INACTIVE';
                document.getElementById('system-status').textContent = 'ONLINE';
                document.getElementById('initiate-btn').disabled = false;
                document.getElementById('abort-btn').disabled = true;

                // Reset progress
                document.getElementById('travel-progress').style.width = '0%';

                this.showAlert('Arrival confirmed at ' + destination.name, 'success');
            }

            abortTravel() {
                // Emergency abort
                this.wormholeActive = false;
                document.getElementById('travel-overlay').classList.remove('active');
                document.getElementById('portal-status').textContent = 'EMERGENCY SHUTDOWN';
                document.getElementById('system-status').textContent = 'ABORT SEQUENCE';

                // Reset after delay
                setTimeout(() => {
                    document.getElementById('portal-status').textContent = 'INACTIVE';
                    document.getElementById('system-status').textContent = 'ONLINE';
                    document.getElementById('initiate-btn').disabled = false;
                    document.getElementById('abort-btn').disabled = true;
                }, 3000);

                this.showAlert('Travel aborted - Emergency shutdown initiated', 'error');
            }

            showAlert(message, type = 'info') {
                const alert = document.getElementById('alert');
                const alertText = document.getElementById('alert-text');

                alertText.textContent = message;
                alert.className = 'alert show';

                if (type === 'success') {
                    alert.style.background = 'rgba(46, 204, 113, 0.9)';
                } else if (type === 'error') {
                    alert.style.background = 'rgba(231, 76, 60, 0.9)';
                }

                setTimeout(() => {
                    alert.classList.remove('show');
                }, 3000);
            }

            updateTime() {
                const now = new Date();
                const time = now.toTimeString().split(' ')[0];
                document.getElementById('current-time').textContent = time;
            }

            animate() {
                // Clear canvas
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // Draw stars
                this.drawStars();

                // Draw wormhole effect if active
                if (this.wormholeActive) {
                    this.drawWormhole();
                }

                // Draw particles
                this.updateParticles();

                requestAnimationFrame(() => this.animate());
            }

            drawStars() {
                this.ctx.fillStyle = '#ffffff';
                this.stars.forEach(star => {
                    this.ctx.globalAlpha = star.brightness;
                    this.ctx.beginPath();
                    this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    this.ctx.fill();

                    // Move stars slowly
                    star.x -= 0.1;
                    if (star.x < 0) star.x = this.canvas.width;

                    // Twinkle effect
                    star.brightness += (Math.random() - 0.5) * 0.02;
                    star.brightness = Math.max(0.1, Math.min(1, star.brightness));
                });
                this.ctx.globalAlpha = 1;
            }

            drawWormhole() {
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                const time = Date.now() * 0.001;

                // Draw swirling vortex
                for (let i = 0; i < 50; i++) {
                    const angle = (i / 50) * Math.PI * 2 + time;
                    const radius = i * 8 + Math.sin(time * 2 + i * 0.1) * 20;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;

                    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 20);
                    gradient.addColorStop(0, 'rgba(63, 186, 194, 0.8)');
                    gradient.addColorStop(1, 'rgba(63, 186, 194, 0)');

                    this.ctx.fillStyle = gradient;
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 20, 0, Math.PI * 2);
                    this.ctx.fill();
                }

                // Draw event horizon
                const horizonGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
                horizonGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
                horizonGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)');
                horizonGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                this.ctx.fillStyle = horizonGradient;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
                this.ctx.fill();

                // Add energy particles
                if (Math.random() < 0.3) {
                    this.particles.push({
                        x: centerX + (Math.random() - 0.5) * 400,
                        y: centerY + (Math.random() - 0.5) * 400,
                        vx: (centerX - (centerX + (Math.random() - 0.5) * 400)) * 0.02,
                        vy: (centerY - (centerY + (Math.random() - 0.5) * 400)) * 0.02,
                        life: 1
                    });
                }
            }

            updateParticles() {
                this.particles = this.particles.filter(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.life -= 0.01;

                    if (particle.life > 0) {
                        this.ctx.fillStyle = `rgba(63, 186, 194, ${particle.life})`;
                        this.ctx.beginPath();
                        this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                        this.ctx.fill();
                        return true;
                    }
                    return false;
                });
            }
        }

        // Initialize simulator when page loads
        document.addEventListener('DOMContentLoaded', () => {
            const simulator = new WormholeSimulator();
        });

