/**
 * presentation_builder.js - Extracted JavaScript for presentation_builder
 * Author: David (davestj)
 * Extracted on: 2025-07-25 21:40:15
 */

// presentation.js - Interactive presentation builder logic
        
        // I'm setting up the presentation state and slide management
        let currentSlideIndex = 0;
        let slides = [];
        let currentTemplate = 'investor';
        
        // Initialize the presentation builder
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            generatePresentation();
        });
        
        function setupEventListeners() {
            // Template selection
            document.querySelectorAll('.template-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentTemplate = this.dataset.template;
                    generatePresentation();
                });
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') previousSlide();
                else if (e.key === 'ArrowRight') nextSlide();
                else if (e.key === 'Escape' && document.fullscreenElement) {
                    document.exitFullscreen();
                }
            });
        }
        
        function generatePresentation() {
            slides = [];
            
            // Generate slides based on template
            switch(currentTemplate) {
                case 'investor':
                    generateInvestorSlides();
                    break;
                case 'technical':
                    generateTechnicalSlides();
                    break;
                case 'government':
                    generateGovernmentSlides();
                    break;
                case 'public':
                    generatePublicSlides();
                    break;
            }
            
            // Update slide count and show first slide
            document.getElementById('total-slides').textContent = slides.length;
            currentSlideIndex = 0;
            showSlide(0);
        }
        
        function generateInvestorSlides() {
            // Title slide
            slides.push({
                type: 'title',
                content: `
                    <div class="slide title-slide">
                        <h1 id="slide-title">Stargate Framework</h1>
                        <p class="subtitle" id="slide-subtitle">Revolutionary Wormhole Technology for Interstellar Travel</p>
                        <p class="author" id="slide-author">Beyond The Horizon Labs</p>
                    </div>
                `
            });
            
            // Problem slide
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide">
                        <h2>The Challenge</h2>
                        <ul>
                            <li>Current space travel is limited by the speed of light</li>
                            <li>Mars missions take 6-9 months with conventional propulsion</li>
                            <li>Interstellar travel is effectively impossible with current technology</li>
                            <li>Humanity needs breakthrough technology for space colonization</li>
                        </ul>
                    </div>
                `
            });
            
            // Solution overview
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide">
                        <h2>Our Solution: The Stargate Framework</h2>
                        <p>A unified theory combining four mathematical systems to enable:</p>
                        <ul>
                            <li>Instantaneous travel through stable wormholes</li>
                            <li>Energy-efficient faster-than-light propulsion</li>
                            <li>Precise temporal and spatial navigation</li>
                            <li>Safe, repeatable interstellar transportation</li>
                        </ul>
                    </div>
                `
            });
            
            // Technology overview
            slides.push({
                type: 'visual',
                content: `
                    <div class="slide visual-slide">
                        <h2>Core Technology Components</h2>
                        <div class="visual-content">
                            <div class="metrics-grid">
                                <div class="metric-card">
                                    <div class="metric-value">Base-3</div>
                                    <div class="metric-label">Ternary Nuclear Fission<br>35% more efficient</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">Base-8</div>
                                    <div class="metric-label">EM Field Stabilization<br>Prevents wormhole collapse</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">Base-5</div>
                                    <div class="metric-label">Geospatial Navigation<br>Sub-meter precision</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">Base-17</div>
                                    <div class="metric-label">Temporal Calculations<br>Timeline synchronization</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            
            // Market opportunity
            slides.push({
                type: 'visual',
                content: `
                    <div class="slide visual-slide">
                        <h2>Market Opportunity</h2>
                        <div class="visual-content">
                            <div class="metrics-grid">
                                <div class="metric-card">
                                    <div class="metric-value">$2T</div>
                                    <div class="metric-label">Total Addressable Market by 2040</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">450%</div>
                                    <div class="metric-label">Projected Annual Growth</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">$5B</div>
                                    <div class="metric-label">Annual Revenue Potential</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">2.8y</div>
                                    <div class="metric-label">Break-even Timeline</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            
            // Investment timeline
            slides.push({
                type: 'visual',
                content: `
                    <div class="slide visual-slide">
                        <h2>Development Timeline</h2>
                        <div class="visual-content">
                            <div class="timeline-visual">
                                <div class="timeline-line"></div>
                                <div class="timeline-point" style="left: 10%;">1</div>
                                <div class="timeline-label above" style="left: 10%;">
                                    <strong>Year 1</strong><br>Theory Validation
                                </div>
                                <div class="timeline-point" style="left: 30%;">2</div>
                                <div class="timeline-label below" style="left: 30%;">
                                    <strong>Year 2-3</strong><br>Prototype Development
                                </div>
                                <div class="timeline-point" style="left: 50%;">3</div>
                                <div class="timeline-label above" style="left: 50%;">
                                    <strong>Year 4-5</strong><br>Testing & Refinement
                                </div>
                                <div class="timeline-point" style="left: 70%;">4</div>
                                <div class="timeline-label below" style="left: 70%;">
                                    <strong>Year 6</strong><br>First Portal Tests
                                </div>
                                <div class="timeline-point" style="left: 90%;">5</div>
                                <div class="timeline-label above" style="left: 90%;">
                                    <strong>Year 7</strong><br>Commercial Operations
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            
            // Funding requirements
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide">
                        <h2>Investment Requirements</h2>
                        <p><strong>Total Investment: <span id="funding-display">$8.7B</span> over <span id="timeline-display">7</span> years</strong></p>
                        <ul>
                            <li><strong>Phase 1 (Years 1-2):</strong> $2.1B - Theory validation and initial R&D</li>
                            <li><strong>Phase 2 (Years 3-5):</strong> $3.22B - Prototype development and testing</li>
                            <li><strong>Phase 3 (Years 6-7):</strong> $3.38B - Full system integration and deployment</li>
                        </ul>
                        <p style="margin-top: 2rem;"><em>Structured funding approach minimizes risk and ensures milestone-based progress</em></p>
                    </div>
                `
            });
            
            // Competitive advantages
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide">
                        <h2>Competitive Advantages</h2>
                        <ul>
                            <li><strong>First-mover advantage</strong> in wormhole technology</li>
                            <li><strong>Proprietary mathematical framework</strong> proven through computational validation</li>
                            <li><strong>35% energy efficiency gain</strong> over theoretical alternatives</li>
                            <li><strong>Partnership opportunities</strong> with SpaceX, NASA, and Space Force</li>
                            <li><strong>Alignment with Stargate AI initiative</strong> ($500B government investment)</li>
                        </ul>
                    </div>
                `
            });
            
            // Team and partnerships
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide">
                        <h2>Strategic Partnerships</h2>
                        <ul>
                            <li><strong>SpaceX:</strong> Manufacturing and launch infrastructure</li>
                            <li><strong>NASA JPL:</strong> Research collaboration and testing facilities</li>
                            <li><strong>U.S. Space Force:</strong> Security and operational deployment</li>
                            <li><strong>Stargate AI Data Centers:</strong> Computational resources for simulations</li>
                            <li><strong>International Space Agencies:</strong> Global collaboration opportunities</li>
                        </ul>
                    </div>
                `
            });
            
            // Call to action
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide" style="text-align: center;">
                        <h2>Join Us in Making History</h2>
                        <p style="font-size: 1.4rem; margin: 2rem 0;">Be part of humanity's greatest leap forward</p>
                        <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px; margin: 2rem 0;">
                            <p style="font-size: 1.3rem; margin-bottom: 1rem;"><strong>Investment Opportunity:</strong></p>
                            <p style="font-size: 2rem; color: #3fbac2; font-weight: bold; margin: 0;">$100M - $500M</p>
                            <p style="margin-top: 1rem;">Minimum investment for founding partners</p>
                        </div>
                        <p style="font-size: 1.1rem; color: #7f8c8d;">Contact: invest@stargateframework.com</p>
                    </div>
                `
            });
        }
        
        function generateTechnicalSlides() {
            // Technical presentation focuses on the science
            slides.push({
                type: 'title',
                content: `
                    <div class="slide title-slide">
                        <h1>Stargate Framework</h1>
                        <p class="subtitle">Technical Architecture & Mathematical Foundations</p>
                        <p class="author">Beyond The Horizon Labs - Technical Division</p>
                    </div>
                `
            });
            
            // Mathematical foundation
            slides.push({
                type: 'visual',
                content: `
                    <div class="slide visual-slide">
                        <h2>Mathematical Foundation</h2>
                        <div class="visual-content">
                            <div class="equation-display">
                                E_total = ∑(E_base3 × S_base8 × N_base5 × T_base17)
                            </div>
                            <p style="text-align: center; margin-top: 2rem;">
                                Unified field equation integrating all four mathematical bases<br>
                                for stable wormhole generation and navigation
                            </p>
                        </div>
                    </div>
                `
            });
            
            // Add more technical slides...
            // I'll add a few key ones for demonstration
            
            slides.push({
                type: 'visual',
                content: `
                    <div class="slide visual-slide">
                        <h2>Base-3 Ternary Fission Process</h2>
                        <div class="visual-content">
                            <div class="equation-display">
                                E_split = (m/3)c² × 3 = mc²<br><br>
                                Efficiency: η = 0.87 (vs 0.64 traditional)
                            </div>
                            <p style="text-align: center; margin-top: 2rem;">
                                Three-phase energy cycle ensures stable power generation<br>
                                with 35% improvement in energy conversion efficiency
                            </p>
                        </div>
                    </div>
                `
            });
        }
        
        function generateGovernmentSlides() {
            // Government briefing focuses on national security and strategic advantages
            slides.push({
                type: 'title',
                content: `
                    <div class="slide title-slide">
                        <h1>Stargate Framework</h1>
                        <p class="subtitle">Strategic National Asset for Space Dominance</p>
                        <p class="author">Classified Briefing - Beyond The Horizon Labs</p>
                    </div>
                `
            });
            
            // Strategic importance
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide">
                        <h2>Strategic National Importance</h2>
                        <ul>
                            <li>Ensures U.S. leadership in space technology for decades</li>
                            <li>Enables rapid deployment of assets to any point in solar system</li>
                            <li>Creates insurmountable technological advantage</li>
                            <li>Aligns with Space Force mission objectives</li>
                            <li>Supports Stargate AI initiative goals</li>
                        </ul>
                    </div>
                `
            });
        }
        
        function generatePublicSlides() {
            // Public presentation focuses on benefits to humanity
            slides.push({
                type: 'title',
                content: `
                    <div class="slide title-slide">
                        <h1>The Stargate Project</h1>
                        <p class="subtitle">Opening the Universe for Humanity</p>
                        <p class="author">A Beyond The Horizon Labs Initiative</p>
                    </div>
                `
            });
            
            // Benefits to humanity
            slides.push({
                type: 'content',
                content: `
                    <div class="slide content-slide">
                        <h2>A New Era for Humanity</h2>
                        <ul>
                            <li>Travel to Mars in seconds, not months</li>
                            <li>Access to unlimited resources from asteroids</li>
                            <li>Establishing colonies on distant worlds</li>
                            <li>Solving Earth's resource challenges</li>
                            <li>Uniting humanity through shared exploration</li>
                        </ul>
                    </div>
                `
            });
        }
        
        function showSlide(index) {
            const container = document.getElementById('slide-container');
            if (index >= 0 && index < slides.length) {
                container.innerHTML = slides[index].content;
                container.classList.add('slide-transition');
                
                // Update dynamic content
                updateSlideContent();
                
                // Update navigation
                document.getElementById('current-slide').textContent = index + 1;
                document.getElementById('prev-btn').disabled = index === 0;
                document.getElementById('next-btn').disabled = index === slides.length - 1;
                
                // Remove transition class after animation
                setTimeout(() => {
                    container.classList.remove('slide-transition');
                }, 500);
            }
        }
        
        function updateSlideContent() {
            // Update dynamic fields based on user inputs
            const title = document.getElementById('pres-title').value;
            const subtitle = document.getElementById('pres-subtitle').value;
            const presenter = document.getElementById('presenter-name').value;
            const funding = document.getElementById('funding-goal').value;
            const timeline = document.getElementById('timeline-select').value;
            
            // Update title slide
            const titleElement = document.getElementById('slide-title');
            if (titleElement) titleElement.textContent = title;
            
            const subtitleElement = document.getElementById('slide-subtitle');
            if (subtitleElement) subtitleElement.textContent = subtitle;
            
            const authorElement = document.getElementById('slide-author');
            if (authorElement) authorElement.textContent = presenter;
            
            // Update funding displays
            const fundingDisplay = document.getElementById('funding-display');
            if (fundingDisplay) fundingDisplay.textContent = funding;
            
            const timelineDisplay = document.getElementById('timeline-display');
            if (timelineDisplay) timelineDisplay.textContent = timeline;
        }
        
        function previousSlide() {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                showSlide(currentSlideIndex);
            }
        }
        
        function nextSlide() {
            if (currentSlideIndex < slides.length - 1) {
                currentSlideIndex++;
                showSlide(currentSlideIndex);
            }
        }
        
        function updatePresentation() {
            // Regenerate presentation with current settings
            generatePresentation();
        }
        
        function toggleFullscreen() {
            const elem = document.querySelector('.slide-viewport');
            if (!document.fullscreenElement) {
                elem.requestFullscreen().catch(err => {
                    console.error('Error attempting to enable fullscreen:', err);
                });
            } else {
                document.exitFullscreen();
            }
        }
        
        function printPresentation() {
            window.print();
        }
        
        function showExportModal() {
            document.getElementById('export-modal').classList.add('show');
        }
        
        function hideExportModal() {
            document.getElementById('export-modal').classList.remove('show');
        }
        
        function exportPDF() {
            // In a real implementation, this would generate a PDF
            alert('PDF export functionality would be implemented here using a library like jsPDF');
            hideExportModal();
        }
        
        function exportPowerPoint() {
            // In a real implementation, this would generate a PPTX file
            alert('PowerPoint export would use a library like PptxGenJS');
            hideExportModal();
        }
        
        function exportHTML() {
            // Create a self-contained HTML file
            const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${document.getElementById('pres-title').value}</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        .slide { width: 100vw; height: 100vh; display: none; padding: 4rem; }
        .slide.active { display: flex; }
        /* Include minimal styles for standalone viewing */
    </style>
</head>
<body>
    ${slides.map((slide, i) => `<div class="slide ${i === 0 ? 'active' : ''}">${slide.content}</div>`).join('')}
    <script>
        let current = 0;
        const slides = document.querySelectorAll('.slide');
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && current < slides.length - 1) {
                slides[current].classList.remove('active');
                current++;
                slides[current].classList.add('active');
            } else if (e.key === 'ArrowLeft' && current > 0) {
                slides[current].classList.remove('active');
                current--;
                slides[current].classList.add('active');
            }
        });

