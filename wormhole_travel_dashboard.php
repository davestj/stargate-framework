<?php
/**
 * wormhole_travel_dashboard.php - Wormhole Travel Dashboard
 * Author: David (davestj)
 * Converted from HTML on: 2025-07-25 21:40:15
 */

// Include the header
require_once 'header.php';
?>

<!-- Main content for wormhole_travel_dashboard -->
<!-- Main Simulation Canvas -->
    <canvas id="simulation-canvas"></canvas>
    <!-- Control Interface -->
    <div class="control-interface">
        <!-- Top HUD -->
        <div class="top-hud">
            <div class="hud-header">
                <h1>Stargate Wormhole Navigation System</h1>
            </div>
            <div class="status-bar">
                <div class="status-item">
                    <div class="status-label">System Status</div>
                    <div class="status-value" id="system-status">ONLINE</div>
                </div>
                <div class="status-item">
                    <div class="status-label">Current Location</div>
                    <div class="status-value" id="current-location">Earth</div>
                </div>
                <div class="status-item">
                    <div class="status-label">Portal Status</div>
                    <div class="status-value" id="portal-status">INACTIVE</div>
                </div>
                <div class="status-item">
                    <div class="status-label">Time</div>
                    <div class="status-value" id="current-time">00:00:00</div>
                </div>
            </div>
        </div>
        <!-- Navigation Panel -->
        <div class="nav-panel">
            <h2>Navigation Control</h2>
            <div class="destination-select">
                <label>Select Destination</label>
                <select id="destination-select">
                    <option value="mars">Mars - Olympus Mons Base</option>
                    <option value="moon">Moon - Tycho Station</option>
                    <option value="jupiter">Jupiter - Europa Outpost</option>
                    <option value="saturn">Saturn - Titan Colony</option>
                    <option value="alpha-centauri">Alpha Centauri - Proxima b</option>
                    <option value="kepler">Kepler-452b - Earth 2.0</option>
                </select>
            </div>
            <div class="destination-info">
                <div class="info-row">
                    <span class="info-label">Distance:</span>
                    <span class="info-value" id="dest-distance">225M km</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Travel Time:</span>
                    <span class="info-value" id="dest-time">0.8 seconds</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Energy Required:</span>
                    <span class="info-value" id="dest-energy">8.5 TW</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Temporal Drift:</span>
                    <span class="info-value" id="dest-drift">±0.2 ms</span>
                </div>
            </div>
            <div class="safety-check ready" id="safety-check">
                <strong>Safety Status:</strong> All systems nominal
            </div>
            <div class="travel-controls">
                <button class="control-btn primary" id="initiate-btn">Initiate Portal</button>
                <button class="control-btn secondary" id="abort-btn" disabled>Abort</button>
            </div>
            <div class="control-group">
                <label style="font-size: 0.85rem; color: #a0a0a0;">
                    <input type="checkbox" id="auto-stabilize" checked> Auto-stabilize wormhole
                </label>
            </div>
        </div>
        <!-- Power Management Panel -->
        <div class="power-panel">
            <h2>Power Management</h2>
            <div class="power-gauge">
                <svg class="gauge-svg" viewBox="0 0 200 200">
                    <!-- Background circle -->
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#1a1a2e" stroke-width="10"/>
                    <!-- Power level arc -->
                    <circle id="power-arc" cx="100" cy="100" r="80" fill="none" stroke="#3fbac2" stroke-width="10"
                            stroke-dasharray="502" stroke-dashoffset="502" transform="rotate(-90 100 100)"/>
                    <!-- Center text -->
                    <text x="100" y="95" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">
                        <tspan id="power-percent">0</tspan>
                        <tspan font-size="14">%</tspan>
                    </text>
                    <text x="100" y="115" text-anchor="middle" fill="#a0a0a0" font-size="12">POWER</text>
                </svg>
            </div>
            <div class="power-controls">
                <div class="power-slider">
                    <label>Reactor Output</label>
                    <input type="range" id="reactor-output" min="0" max="100" value="0">
                    <div class="power-value" id="reactor-value">0 TW</div>
                </div>
                <div class="power-slider">
                    <label>Field Strength</label>
                    <input type="range" id="field-strength" min="0" max="100" value="0">
                    <div class="power-value" id="field-value">0 Tesla</div>
                </div>
                <button class="control-btn secondary" id="power-up-btn">Power Up Sequence</button>
            </div>
        </div>
        <!-- Bottom Console -->
        <div class="bottom-console">
            <div class="console-grid">
                <div class="console-section">
                    <div class="console-label">Wormhole Stability</div>
                    <div class="console-value">
                        <span id="stability-value">0</span>
                        <span class="console-unit">%</span>
                    </div>
                </div>
                <div class="console-section">
                    <div class="console-label">Gravitational Shear</div>
                    <div class="console-value">
                        <span id="shear-value">0.0</span>
                        <span class="console-unit">G</span>
                    </div>
                </div>
                <div class="console-section">
                    <div class="console-label">Quantum Variance</div>
                    <div class="console-value">
                        <span id="quantum-value">0.00</span>
                        <span class="console-unit">σ</span>
                    </div>
                </div>
                <div class="console-section">
                    <div class="console-label">Navigation Lock</div>
                    <div class="console-value" id="nav-lock" style="color: #e74c3c;">
                        OFFLINE
                    </div>
                </div>
            </div>
        </div>
        <!-- Scanning Effect -->
        <div class="scanning-line"></div>
    </div>
    <!-- Travel Status Overlay -->
    <div class="travel-overlay" id="travel-overlay">
        <div class="travel-status">
            <h2>TRAVERSING WORMHOLE</h2>
            <div class="travel-progress">
                <div class="progress-fill" id="travel-progress"></div>
            </div>
            <div class="travel-eta">ETA: <span id="travel-eta">0.8</span> seconds</div>
        </div>
    </div>
    <!-- Alert System -->
    <div class="alert" id="alert">
        <span id="alert-text">System Alert</span>
    </div>
<?php
// Include the footer
require_once 'footer.php';
?>