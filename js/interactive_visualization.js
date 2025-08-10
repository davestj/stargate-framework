/**
 * interactive_visualization.js - Extracted JavaScript for interactive_visualization
 * Author: David (davestj)
 * Extracted on: 2025-07-25 21:40:15
 */

// index.js - Main JavaScript for interactive visualizations
        
        // I'm initializing the visualization system here
        class StargateVisualizer {
            constructor() {
                // Setting up canvas contexts for each visualization
                this.canvases = {
                    overview: document.getElementById('overview-viz'),
                    base3: document.getElementById('base3-viz'),
                    base8: document.getElementById('base8-viz'),
                    base5: document.getElementById('base5-viz'),
                    base17: document.getElementById('base17-viz'),
                    integration: document.getElementById('integration-viz')
                };
                
                // Getting 2D contexts for drawing
                this.contexts = {};
                for (let key in this.canvases) {
                    if (this.canvases[key]) {
                        this.contexts[key] = this.canvases[key].getContext('2d');
                    }
                }
                
                // Animation properties
                this.animationFrames = 0;
                this.animations = {};
                
                // Initialize event listeners
                this.initializeEventListeners();
                
                // Start the animation loop
                this.animate();
            }
            
            initializeEventListeners() {
                // Tab switching functionality
                const tabs = document.querySelectorAll('.nav-tab');
                tabs.forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        // Remove active class from all tabs and containers
                        tabs.forEach(t => t.classList.remove('active'));
                        document.querySelectorAll('.visualization-container').forEach(c => {
                            c.classList.remove('active');
                        });
                        
                        // Add active class to clicked tab and corresponding container
                        e.target.classList.add('active');
                        const tabName = e.target.dataset.tab;
                        document.getElementById(tabName).classList.add('active');
                        
                        // Trigger specific visualization
                        this.activateVisualization(tabName);
                    });
                });
                
                // Control listeners for Base-3
                const fissionRate = document.getElementById('fission-rate');
                if (fissionRate) {
                    fissionRate.addEventListener('input', (e) => {
                        document.getElementById('fission-rate-value').textContent = e.target.value + '%';
                        this.updateBase3Parameters();
                    });
                }
                
                const energyOutput = document.getElementById('energy-output');
                if (energyOutput) {
                    energyOutput.addEventListener('input', (e) => {
                        document.getElementById('energy-output-value').textContent = e.target.value + ' TW';
                        this.updateBase3Parameters();
                    });
                }
                
                // Control listeners for Base-8
                const fieldStrength = document.getElementById('field-strength');
                if (fieldStrength) {
                    fieldStrength.addEventListener('input', (e) => {
                        document.getElementById('field-strength-value').textContent = e.target.value + ' T';
                    });
                }
                
                // Control listeners for Base-5
                const timeDrift = document.getElementById('time-drift');
                if (timeDrift) {
                    timeDrift.addEventListener('input', (e) => {
                        document.getElementById('time-drift-value').textContent = e.target.value + ' years';
                    });
                }
                
                // Control listeners for Base-17
                const temporalTarget = document.getElementById('temporal-target');
                if (temporalTarget) {
                    temporalTarget.addEventListener('input', (e) => {
                        const value = parseInt(e.target.value);
                        let label = 'Present';
                        if (value < 0) label = Math.abs(value) + ' years ago';
                        else if (value > 0) label = value + ' years future';
                        document.getElementById('temporal-target-value').textContent = label;
                    });
                }
                
                // Integration controls
                const systemPower = document.getElementById('system-power');
                if (systemPower) {
                    systemPower.addEventListener('input', (e) => {
                        document.getElementById('system-power-value').textContent = e.target.value + '%';
                        this.updateIntegrationStatus();
                    });
                }
            }
            
            activateVisualization(name) {
                // Clear any existing animations for this visualization
                if (this.animations[name]) {
                    cancelAnimationFrame(this.animations[name]);
                }
                
                // Start the appropriate visualization
                switch(name) {
                    case 'overview':
                        this.drawOverview();
                        break;
                    case 'base3':
                        this.drawBase3Energy();
                        break;
                    case 'base8':
                        this.drawBase8Stabilization();
                        break;
                    case 'base5':
                        this.drawBase5Navigation();
                        break;
                    case 'base17':
                        this.drawBase17Temporal();
                        break;
                    case 'integration':
                        this.drawIntegration();
                        break;
                }
            }
            
            drawOverview() {
                const ctx = this.contexts.overview;
                const canvas = this.canvases.overview;
                
                // Clear canvas
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw central stargate ring
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = 150;
                
                // Animated glow effect
                const glowIntensity = Math.sin(this.animationFrames * 0.02) * 0.3 + 0.7;
                
                // Outer glow
                const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5);
                gradient.addColorStop(0, `rgba(63, 186, 194, ${glowIntensity})`);
                gradient.addColorStop(1, 'rgba(63, 186, 194, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw stargate ring
                ctx.strokeStyle = '#3fbac2';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Draw inner portal effect
                const portalGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
                portalGradient.addColorStop(0, 'rgba(63, 186, 194, 0.3)');
                portalGradient.addColorStop(0.5, 'rgba(63, 186, 194, 0.1)');
                portalGradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
                ctx.fillStyle = portalGradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw the four base systems around the stargate
                const systems = [
                    { name: 'Base-3 Energy', angle: 0, color: '#ff6b6b' },
                    { name: 'Base-8 Stabilization', angle: Math.PI / 2, color: '#4ecdc4' },
                    { name: 'Base-5 Navigation', angle: Math.PI, color: '#45b7d1' },
                    { name: 'Base-17 Temporal', angle: Math.PI * 1.5, color: '#f39c12' }
                ];
                
                systems.forEach((system, index) => {
                    const x = centerX + Math.cos(system.angle) * (radius + 100);
                    const y = centerY + Math.sin(system.angle) * (radius + 100);
                    
                    // Draw connection line
                    ctx.strokeStyle = system.color;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.moveTo(centerX + Math.cos(system.angle) * radius, centerY + Math.sin(system.angle) * radius);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    
                    // Draw system node
                    ctx.fillStyle = system.color;
                    ctx.beginPath();
                    ctx.arc(x, y, 20, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw label
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(system.name, x, y + 40);
                });
                
                // Continue animation
                this.animations.overview = requestAnimationFrame(() => this.drawOverview());
            }
            
            drawBase3Energy() {
                const ctx = this.contexts.base3;
                const canvas = this.canvases.base3;
                
                // Clear canvas
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Get current parameters
                const fissionRate = document.getElementById('fission-rate').value / 100;
                const energyOutput = document.getElementById('energy-output').value;
                
                // Draw nuclear reactor visualization
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                // Draw three-way fission visualization
                const angle = this.animationFrames * 0.02;
                const splitAngles = [0, Math.PI * 2/3, Math.PI * 4/3];
                
                splitAngles.forEach((baseAngle, index) => {
                    const currentAngle = baseAngle + angle;
                    const distance = 100 + Math.sin(this.animationFrames * 0.03 + index) * 20;
                    
                    // Calculate fragment position
                    const x = centerX + Math.cos(currentAngle) * distance;
                    const y = centerY + Math.sin(currentAngle) * distance;
                    
                    // Draw energy burst
                    const burstGradient = ctx.createRadialGradient(x, y, 0, x, y, 50);
                    burstGradient.addColorStop(0, `rgba(255, 107, 107, ${fissionRate})`);
                    burstGradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
                    ctx.fillStyle = burstGradient;
                    ctx.beginPath();
                    ctx.arc(x, y, 50, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw fragment
                    ctx.fillStyle = '#ff6b6b';
                    ctx.beginPath();
                    ctx.arc(x, y, 15, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw phase label
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(`Phase ${index + 1}`, x, y + 35);
                });
                
                // Draw central nucleus
                ctx.fillStyle = '#ff4444';
                ctx.beginPath();
                ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw energy output meter
                const meterX = 100;
                const meterY = canvas.height - 100;
                const meterWidth = 200;
                const meterHeight = 20;
                
                ctx.fillStyle = '#333';
                ctx.fillRect(meterX, meterY, meterWidth, meterHeight);
                
                ctx.fillStyle = '#ff6b6b';
                ctx.fillRect(meterX, meterY, meterWidth * (energyOutput / 100), meterHeight);
                
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px Arial';
                ctx.textAlign = 'left';
                ctx.fillText('Energy Output: ' + energyOutput + ' TW', meterX, meterY - 10);
                
                // Continue animation
                this.animations.base3 = requestAnimationFrame(() => this.drawBase3Energy());
            }
            
            drawBase8Stabilization() {
                const ctx = this.contexts.base8;
                const canvas = this.canvases.base8;
                
                // Clear canvas
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = 150;
                
                // Draw eight electromagnetic loops
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI * 2 / 8) * i;
                    const loopX = centerX + Math.cos(angle) * radius;
                    const loopY = centerY + Math.sin(angle) * radius;
                    
                    // Draw magnetic field lines
                    ctx.strokeStyle = `rgba(78, 205, 196, 0.3)`;
                    ctx.lineWidth = 1;
                    
                    for (let j = 0; j < 5; j++) {
                        ctx.beginPath();
                        const fieldRadius = 30 + j * 10;
                        ctx.arc(loopX, loopY, fieldRadius, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    
                    // Draw superconducting loop
                    const pulseIntensity = Math.sin(this.animationFrames * 0.03 + i * Math.PI / 4) * 0.5 + 0.5;
                    ctx.fillStyle = `rgba(78, 205, 196, ${0.5 + pulseIntensity * 0.5})`;
                    ctx.beginPath();
                    ctx.arc(loopX, loopY, 20, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw connection to center
                    ctx.strokeStyle = '#4ecdc4';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(loopX, loopY);
                    ctx.stroke();
                }
                
                // Draw central wormhole throat
                const throatGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
                throatGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
                throatGradient.addColorStop(0.5, 'rgba(78, 205, 196, 0.5)');
                throatGradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
                ctx.fillStyle = throatGradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw harmonic waves
                const harmonicBalance = document.getElementById('harmonic-balance').value / 100;
                ctx.strokeStyle = `rgba(78, 205, 196, ${harmonicBalance})`;
                ctx.lineWidth = 2;
                
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    const waveRadius = 80 + i * 40 + Math.sin(this.animationFrames * 0.02) * 10;
                    ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
                    ctx.stroke();
                }
                
                // Continue animation
                this.animations.base8 = requestAnimationFrame(() => this.drawBase8Stabilization());
            }
            
            drawBase5Navigation() {
                const ctx = this.contexts.base5;
                const canvas = this.canvases.base5;
                
                // Clear canvas
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw planetary system with drift calculation
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                // Draw origin planet (Earth)
                ctx.fillStyle = '#45b7d1';
                ctx.beginPath();
                ctx.arc(centerX - 200, centerY, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Earth', centerX - 200, centerY + 50);
                
                // Calculate drift over time
                const timeDrift = document.getElementById('time-drift').value;
                const driftAngle = (timeDrift / 1000) * Math.PI * 2;
                const driftX = Math.cos(driftAngle) * 100;
                const driftY = Math.sin(driftAngle) * 50;
                
                // Draw destination planet (Mars) with drift
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.arc(centerX + 200 + driftX, centerY + driftY, 25, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Mars', centerX + 200 + driftX, centerY + driftY + 45);
                
                // Draw navigation calculation visualization
                ctx.strokeStyle = '#45b7d1';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                
                // Draw predicted path
                ctx.beginPath();
                ctx.moveTo(centerX - 170, centerY);
                ctx.quadraticCurveTo(centerX, centerY - 50, centerX + 200 + driftX, centerY + driftY);
                ctx.stroke();
                
                // Draw base-5 recursive calculations
                ctx.setLineDash([]);
                ctx.font = '12px monospace';
                ctx.fillStyle = '#45b7d1';
                
                for (let i = 0; i < 5; i++) {
                    const calcY = 50 + i * 25;
                    const base5Value = Math.pow(5, i);
                    ctx.fillText(`5^${i} = ${base5Value} units`, 50, calcY);
                }
                
                // Draw precision indicator
                const precision = document.getElementById('nav-precision').value / 100;
                const indicatorX = canvas.width - 200;
                const indicatorY = 100;
                
                ctx.fillStyle = '#333';
                ctx.fillRect(indicatorX, indicatorY, 150, 150);
                
                // Draw targeting reticle
                ctx.strokeStyle = '#45b7d1';
                ctx.lineWidth = 2;
                const reticleSize = 60 * precision;
                ctx.beginPath();
                ctx.arc(indicatorX + 75, indicatorY + 75, reticleSize, 0, Math.PI * 2);
                ctx.stroke();
                
                // Draw crosshairs
                ctx.beginPath();
                ctx.moveTo(indicatorX + 75 - reticleSize, indicatorY + 75);
                ctx.lineTo(indicatorX + 75 + reticleSize, indicatorY + 75);
                ctx.moveTo(indicatorX + 75, indicatorY + 75 - reticleSize);
                ctx.lineTo(indicatorX + 75, indicatorY + 75 + reticleSize);
                ctx.stroke();
                
                // Continue animation
                this.animations.base5 = requestAnimationFrame(() => this.drawBase5Navigation());
            }
            
            drawBase17Temporal() {
                const ctx = this.contexts.base17;
                const canvas = this.canvases.base17;
                
                // Clear canvas
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                // Get temporal parameters
                const temporalTarget = parseInt(document.getElementById('temporal-target').value);
                const multiverseDrift = document.getElementById('multiverse-drift').value / 100;
                
                // Draw temporal spiral
                ctx.strokeStyle = '#f39c12';
                ctx.lineWidth = 2;
                
                const spiralPoints = [];
                for (let i = 0; i < 300; i++) {
                    const angle = i * 0.1;
                    const radius = i * 0.5;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    spiralPoints.push({x, y, time: i - 150});
                }
                
                // Draw the spiral
                ctx.beginPath();
                spiralPoints.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.stroke();
                
                // Highlight current position
                const currentIndex = Math.floor(spiralPoints.length / 2);
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(spiralPoints[currentIndex].x, spiralPoints[currentIndex].y, 8, 0, Math.PI * 2);
                ctx.fill();
                
                // Highlight target position
                const targetIndex = currentIndex + Math.floor(temporalTarget / 10);
                if (targetIndex >= 0 && targetIndex < spiralPoints.length) {
                    ctx.fillStyle = '#f39c12';
                    ctx.beginPath();
                    ctx.arc(spiralPoints[targetIndex].x, spiralPoints[targetIndex].y, 10, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw connection line
                    ctx.strokeStyle = '#f39c12';
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.moveTo(spiralPoints[currentIndex].x, spiralPoints[currentIndex].y);
                    ctx.lineTo(spiralPoints[targetIndex].x, spiralPoints[targetIndex].y);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                
                // Draw multiverse layers
                for (let i = 0; i < 5; i++) {
                    const layerOffset = (i - 2) * 30 * multiverseDrift;
                    ctx.strokeStyle = `rgba(243, 156, 18, ${0.3 - i * 0.05})`;
                    ctx.lineWidth = 1;
                    
                    ctx.beginPath();
                    spiralPoints.forEach((point, index) => {
                        const x = point.x + layerOffset;
                        const y = point.y + layerOffset * 0.5;
                        if (index === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    });
                    ctx.stroke();
                }
                
                // Draw base-17 calculation visualization
                ctx.fillStyle = '#f39c12';
                ctx.font = '12px monospace';
                ctx.textAlign = 'left';
                
                for (let i = 0; i < 4; i++) {
                    const calc = Math.pow(17, i);
                    ctx.fillText(`17^${i} = ${calc} dimensions`, 50, 50 + i * 20);
                }
                
                // Continue animation
                this.animations.base17 = requestAnimationFrame(() => this.drawBase17Temporal());
            }
            
            drawIntegration() {
                const ctx = this.contexts.integration;
                const canvas = this.canvases.integration;
                
                // Clear canvas
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                
                // Get system parameters
                const systemPower = document.getElementById('system-power').value / 100;
                const stability = systemPower * 0.9; // Stability follows power
                
                // Update stability display
                document.getElementById('wormhole-stability').value = stability * 100;
                document.getElementById('wormhole-stability-value').textContent = Math.floor(stability * 100) + '%';
                
                // Draw integrated stargate system
                const stargateRadius = 180;
                
                // Draw outer ring with power indication
                ctx.strokeStyle = `rgba(63, 186, 194, ${systemPower})`;
                ctx.lineWidth = 20;
                ctx.beginPath();
                ctx.arc(centerX, centerY, stargateRadius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Draw energy flow from Base-3
                if (systemPower > 0.1) {
                    for (let i = 0; i < 3; i++) {
                        const angle = (Math.PI * 2 / 3) * i + this.animationFrames * 0.01;
                        const startRadius = stargateRadius + 50;
                        const endRadius = stargateRadius;
                        
                        const startX = centerX + Math.cos(angle) * startRadius;
                        const startY = centerY + Math.sin(angle) * startRadius;
                        const endX = centerX + Math.cos(angle) * endRadius;
                        const endY = centerY + Math.sin(angle) * endRadius;
                        
                        // Energy beam
                        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
                        gradient.addColorStop(0, 'rgba(255, 107, 107, 0)');
                        gradient.addColorStop(1, `rgba(255, 107, 107, ${systemPower})`);
                        
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.lineTo(endX, endY);
                        ctx.stroke();
                    }
                }
                
                // Draw Base-8 stabilization field
                if (systemPower > 0.25) {
                    ctx.strokeStyle = `rgba(78, 205, 196, ${systemPower * 0.5})`;
                    for (let i = 0; i < 8; i++) {
                        const angle = (Math.PI * 2 / 8) * i;
                        const x = centerX + Math.cos(angle) * stargateRadius;
                        const y = centerY + Math.sin(angle) * stargateRadius;
                        
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.arc(x, y, 30, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
                
                // Draw wormhole portal effect
                if (systemPower > 0.5) {
                    // Create swirling portal effect
                    const portalRadius = stargateRadius - 30;
                    
                    for (let i = 0; i < 50; i++) {
                        const spiralAngle = i * 0.3 + this.animationFrames * 0.02;
                        const spiralRadius = (portalRadius / 50) * i;
                        const opacity = (1 - i / 50) * systemPower;
                        
                        const x = centerX + Math.cos(spiralAngle) * spiralRadius;
                        const y = centerY + Math.sin(spiralAngle) * spiralRadius;
                        
                        ctx.fillStyle = `rgba(63, 186, 194, ${opacity * 0.5})`;
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    
                    // Event horizon
                    const horizonGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, portalRadius);
                    horizonGradient.addColorStop(0, `rgba(0, 0, 0, ${systemPower})`);
                    horizonGradient.addColorStop(0.7, `rgba(63, 186, 194, ${systemPower * 0.3})`);
                    horizonGradient.addColorStop(1, 'rgba(63, 186, 194, 0)');
                    
                    ctx.fillStyle = horizonGradient;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, portalRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Draw status indicators
                const indicators = [
                    { label: 'Base-3 Energy', value: systemPower, color: '#ff6b6b', x: 50, y: 50 },
                    { label: 'Base-8 Field', value: systemPower * 0.95, color: '#4ecdc4', x: 50, y: 100 },
                    { label: 'Base-5 Lock', value: systemPower * 0.9, color: '#45b7d1', x: 50, y: 150 },
                    { label: 'Base-17 Sync', value: systemPower * 0.85, color: '#f39c12', x: 50, y: 200 }
                ];
                
                indicators.forEach(indicator => {
                    // Background
                    ctx.fillStyle = '#333';
                    ctx.fillRect(indicator.x, indicator.y, 200, 20);
                    
                    // Progress
                    ctx.fillStyle = indicator.color;
                    ctx.fillRect(indicator.x, indicator.y, 200 * indicator.value, 20);
                    
                    // Label
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'left';
                    ctx.fillText(indicator.label, indicator.x, indicator.y - 5);
                    
                    // Percentage
                    ctx.textAlign = 'right';
                    ctx.fillText(Math.floor(indicator.value * 100) + '%', indicator.x + 200, indicator.y - 5);
                });
                
                // Draw operational status
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                
                if (systemPower > 0.9) {
                    ctx.fillStyle = '#00ff00';
                    ctx.fillText('STARGATE OPERATIONAL', centerX, canvas.height - 50);
                } else if (systemPower > 0.5) {
                    ctx.fillStyle = '#ffaa00';
                    ctx.fillText('INITIALIZATION IN PROGRESS', centerX, canvas.height - 50);
                } else {
                    ctx.fillStyle = '#ff0000';
                    ctx.fillText('SYSTEM OFFLINE', centerX, canvas.height - 50);
                }
                
                // Continue animation
                this.animations.integration = requestAnimationFrame(() => this.drawIntegration());
            }
            
            updateBase3Parameters() {
                // This method is called when Base-3 controls are adjusted
                // Additional logic can be added here to update calculations
            }
            
            updateIntegrationStatus() {
                // This method is called when integration controls are adjusted
                // Additional logic can be added here
            }
            
            animate() {
                this.animationFrames++;
                
                // Initialize with overview visualization
                if (this.animationFrames === 1) {
                    this.activateVisualization('overview');
                }
                
                requestAnimationFrame(() => this.animate());
            }
        }
        
        // Initialize the visualizer when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            const visualizer = new StargateVisualizer();
        });

