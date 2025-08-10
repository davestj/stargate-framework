<?php
/**
 * index.php - Main landing page for Stargate Framework
 * Author: David (davestj)
 * Purpose: Overview and navigation hub for all framework tools
 */

// Include the header
require_once 'header.php';
?>

<!-- Hero Section -->
<section class="hero-section">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Welcome to the Stargate Framework</h1>
            <p class="hero-subtitle">A unified theory for wormhole energy, FTL propulsion, and temporal navigation systems</p>
            <p class="hero-description">
                Leveraging breakthrough mathematics in Base-3, Base-5, Base-8, and Base-17 systems to make 
                interstellar travel a reality. This comprehensive framework represents decades of research 
                into sustainable wormhole generation and faster-than-light transportation.
            </p>
            <div class="hero-actions">
                <a href="interactive_visualization.php" class="btn btn-primary">Explore Visualizations</a>
                <a href="technical_docs.php" class="btn btn-secondary">Read Documentation</a>
            </div>
        </div>
    </div>
</section>

<!-- Key Features Grid -->
<section class="features-section">
    <div class="container">
        <h2 class="section-title text-center">Framework Components</h2>
        <div class="grid grid-3">
            <!-- Interactive Visualization -->
            <div class="card feature-card">
                <div class="feature-icon">🌌</div>
                <h3>Interactive Visualizations</h3>
                <p>Explore the mathematical foundations through real-time animations of Base-3, Base-5, Base-8, and Base-17 systems working in harmony.</p>
                <a href="interactive_visualization.php" class="feature-link">Launch Visualizer →</a>
            </div>
            
            <!-- Metrics Dashboard -->
            <div class="card feature-card">
                <div class="feature-icon">📊</div>
                <h3>Investment Metrics</h3>
                <p>Detailed financial projections, ROI calculations, and development timelines showing the path to commercialization.</p>
                <a href="metrics_feasability_dashboard.php" class="feature-link">View Metrics →</a>
            </div>
            
            <!-- 3D Model -->
            <div class="card feature-card">
                <div class="feature-icon">🔮</div>
                <h3>3D Stargate Model</h3>
                <p>Interactive 3D exploration of the physical stargate design, including reactor core and electromagnetic field generators.</p>
                <a href="3d_interactive_model.php" class="feature-link">Explore Model →</a>
            </div>
            
            <!-- Wormhole Simulator -->
            <div class="card feature-card">
                <div class="feature-icon">🌀</div>
                <h3>Travel Simulator</h3>
                <p>Experience wormhole travel through our real-time simulation, complete with power management and navigation controls.</p>
                <a href="wormhole_travel_dashboard.php" class="feature-link">Start Simulation →</a>
            </div>
            
            <!-- Presentation Builder -->
            <div class="card feature-card">
                <div class="feature-icon">📽️</div>
                <h3>Presentation Builder</h3>
                <p>Generate customized slide decks for different audiences - investors, government officials, technical partners, or media.</p>
                <a href="presentation_builder.php" class="feature-link">Build Presentation →</a>
            </div>
            
            <!-- Executive Summaries -->
            <div class="card feature-card">
                <div class="feature-icon">📄</div>
                <h3>Executive Summaries</h3>
                <p>Create targeted one-page briefs that communicate key concepts and value propositions to busy stakeholders.</p>
                <a href="executive_summary_generator.php" class="feature-link">Generate Summary →</a>
            </div>
        </div>
    </div>
</section>

<!-- Technical Overview -->
<section class="technical-overview">
    <div class="container">
        <h2 class="section-title text-center">Mathematical Foundation</h2>
        <div class="grid grid-4">
            <div class="math-component">
                <div class="math-number">Base-3</div>
                <h4>Energy Generation</h4>
                <p>Ternary nuclear fission for 35% improved efficiency</p>
            </div>
            <div class="math-component">
                <div class="math-number">Base-8</div>
                <h4>Field Stabilization</h4>
                <p>Electromagnetic containment preventing wormhole collapse</p>
            </div>
            <div class="math-component">
                <div class="math-number">Base-5</div>
                <h4>Spatial Navigation</h4>
                <p>Recursive encoding for sub-meter precision across light-years</p>
            </div>
            <div class="math-component">
                <div class="math-number">Base-17</div>
                <h4>Temporal Control</h4>
                <p>Timeline synchronization and multiverse drift prevention</p>
            </div>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="cta-section">
    <div class="container text-center">
        <h2>Ready to Explore the Future?</h2>
        <p class="cta-description">
            Whether you're an investor, researcher, government official, or simply curious about 
            the future of space travel, our comprehensive tools and documentation are here to help 
            you understand the revolutionary potential of the Stargate Framework.
        </p>
        <div class="cta-actions">
            <a href="technical_docs.php" class="btn btn-primary">Technical Documentation</a>
            <a href="theoretical_docs/" class="btn btn-secondary">Research Papers</a>
        </div>
    </div>
</section>

<!-- Page-specific CSS -->
<style>
/* index.css - Styles specific to the landing page */

.hero-section {
    background: linear-gradient(135deg, var(--secondary-color) 0%, #16213e 100%);
    color: var(--text-light);
    padding: 4rem 0;
    text-align: center;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero-subtitle {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
}

.hero-description {
    font-size: 1.125rem;
    max-width: 800px;
    margin: 0 auto 2rem;
    opacity: 0.9;
    line-height: 1.8;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.features-section {
    padding: 4rem 0;
    background: var(--light-bg);
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--text-primary);
}

.feature-card {
    text-align: center;
    transition: transform 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.feature-card p {
    flex: 1;
    margin-bottom: 1.5rem;
}

.feature-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.feature-link:hover {
    color: #45d3db;
}

.technical-overview {
    padding: 4rem 0;
    background: white;
}

.math-component {
    text-align: center;
    padding: 2rem;
}

.math-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.math-component h4 {
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.cta-section {
    padding: 4rem 0;
    background: var(--light-bg);
}

.cta-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
}

.cta-description {
    font-size: 1.125rem;
    max-width: 700px;
    margin: 0 auto 2rem;
    color: var(--text-muted);
}

.cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* Responsive adjustments for MacBook 15" */
@media (min-width: 1440px) {
    .hero-title {
        font-size: 3.5rem;
    }
    
    .section-title {
        font-size: 3rem;
    }
}
</style>

<?php
// Include the footer
require_once 'footer.php';
?>
