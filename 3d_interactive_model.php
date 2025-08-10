<?php
/**
 * 3d_interactive_model.php - 3D Interactive Model Viewer
 * Author: David (davestj)
 * Created: 2025-07-25
 * Modified: 2025-07-28
 * Purpose: Interactive 3D visualization of the Stargate wormhole generator
 *
 * CHANGELOG:
 * - 2025-07-28: Fixed viewport containment issues, restructured HTML for proper layering
 * - 2025-07-28: Added viewport meta tag fix for mobile responsiveness
 * - 2025-07-28: Reorganized UI elements to prevent overflow and missing components
 * - 2025-07-28: Added proper container structure for canvas element
 */

// Include the header
require_once 'header.php';
?>

<!-- Main 3D Model Viewer Container -->
<div class="model-viewer-container">
    <!-- Canvas Container with proper boundaries -->
    <div id="canvas-container">
        <!-- Three.js canvas will be inserted here -->
    </div>

    <!-- UI Overlay Container - Properly structured -->
    <div class="ui-overlay">
        <!-- Top Header Bar -->
        <div class="header-bar">
            <h1>Stargate 3D Model</h1>
            <p>Interactive exploration of the wormhole generator design</p>
        </div>

        <!-- Left Stats Panel -->
        <div class="stats-panel">
            <div class="panel-content">
                <h3>Model Statistics</h3>
                <div class="stat-row">
                    <span class="stat-label">Model Scale:</span>
                    <span class="stat-value" id="scale-stat">1:100</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Components:</span>
                    <span class="stat-value" id="components-stat">12</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Energy Output:</span>
                    <span class="stat-value" id="energy-stat">0 TW</span>
                </div>
            </div>
        </div>

        <!-- Right Control Panel -->
        <div class="control-panel">
            <div class="panel-content">
                <h3>Model Controls</h3>

                <!-- Rotation Speed Control -->
                <div class="control-group">
                    <label>Rotation Speed</label>
                    <input type="range" id="rotation-speed" min="0" max="100" value="20">
                    <div class="control-value" id="rotation-value">20%</div>
                </div>

                <!-- Portal Activity Control -->
                <div class="control-group">
                    <label>Portal Activity</label>
                    <input type="range" id="portal-activity" min="0" max="100" value="0">
                    <div class="control-value" id="portal-value">0%</div>
                </div>

                <!-- View Mode Selection -->
                <div class="control-group">
                    <label>View Mode</label>
                    <div class="toggle-group">
                        <button class="toggle-btn active" data-mode="exterior">Exterior</button>
                        <button class="toggle-btn" data-mode="interior">Interior</button>
                        <button class="toggle-btn" data-mode="xray">X-Ray</button>
                    </div>
                </div>

                <!-- Component Selection -->
                <div class="control-group">
                    <label>Components</label>
                    <div class="toggle-group">
                        <button class="toggle-btn active" data-component="all">All</button>
                        <button class="toggle-btn" data-component="reactor">Reactor</button>
                        <button class="toggle-btn" data-component="field">EM Field</button>
                    </div>
                </div>

                <!-- Display Options -->
                <div class="control-group">
                    <label>Display Options</label>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="show-labels" checked> Component Labels
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="show-grid" checked> Reference Grid
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="show-particles"> Energy Particles
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Info Panel -->
        <div class="info-panel" id="info-panel">
            <div class="panel-content">
                <h4>Stargate Ring Assembly</h4>
                <p>The main ring structure houses the electromagnetic field generators and serves as the primary containment system for the wormhole aperture.</p>
                <div class="specs">
                    <div class="spec-item">
                        <span class="spec-label">Diameter:</span>
                        <span class="spec-value">50 meters</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Material:</span>
                        <span class="spec-value">Graphene-Neutronium Composite</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">EM Loops:</span>
                        <span class="spec-value">8 Superconducting</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Power Required:</span>
                        <span class="spec-value">12.5 TW (peak)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom View Controls -->
        <div class="view-controls">
            <button class="view-btn" onclick="setView('front')">Front View</button>
            <button class="view-btn" onclick="setView('side')">Side View</button>
            <button class="view-btn" onclick="setView('iso')">Isometric</button>
            <button class="view-btn" onclick="toggleAnimation()">
                <span id="animation-toggle-text">Pause Animation</span>
            </button>
        </div>
    </div>

    <!-- Component Labels Container -->
    <div class="labels-container">
        <div class="component-label" id="label-reactor">Base-3 Reactor Core</div>
        <div class="component-label" id="label-emfield">Base-8 EM Field Generator</div>
        <div class="component-label" id="label-portal">Wormhole Aperture</div>
    </div>

    <!-- Loading Screen -->
    <div class="loading-screen" id="loading-screen">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Initializing 3D Model...</p>
            <div class="loading-progress">
                <div class="progress-bar" id="loading-progress"></div>
            </div>
        </div>
    </div>
</div>

<?php
// Include the footer
require_once 'footer.php';
?>

<!--
CARRYOVER CONTEXT FOR NEXT CHAT:
- We fixed the 3D model viewer viewport issues by restructuring the HTML
- Added proper container hierarchy for better element containment
- Reorganized UI panels to prevent overflow
- Next steps could include:
  1. Adding touch controls for mobile interaction
  2. Implementing WebGL performance monitoring
  3. Adding more detailed component animations
  4. Creating a tour mode for educational purposes
-->