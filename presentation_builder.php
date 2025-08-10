<?php
/**
 * presentation_builder.php - Presentation Builder
 * Author: David (davestj)
 * Converted from HTML on: 2025-07-25 21:40:15
 */

// Include the header
require_once 'header.php';
?>

<!-- Main content for presentation_builder -->
<div class="app-container">
        <!-- Sidebar Controls -->
        <aside class="sidebar">
            <h2>Presentation Builder</h2>
            <!-- Template Selection -->
            <div class="control-section">
                <h3>Select Template</h3>
                <div class="template-buttons">
                    <button class="template-btn active" data-template="investor">Investor Pitch</button>
                    <button class="template-btn" data-template="technical">Technical Review</button>
                    <button class="template-btn" data-template="government">Government Brief</button>
                    <button class="template-btn" data-template="public">Public Presentation</button>
                </div>
            </div>
            <!-- Customization Options -->
            <div class="control-section">
                <h3>Customize Content</h3>
                <div class="control-group">
                    <label>Presentation Title</label>
                    <input type="text" id="pres-title" value="Stargate Framework">
                </div>
                <div class="control-group">
                    <label>Subtitle</label>
                    <input type="text" id="pres-subtitle" value="Revolutionary Wormhole Technology for Interstellar Travel">
                </div>
                <div class="control-group">
                    <label>Presenter Name</label>
                    <input type="text" id="presenter-name" value="Beyond The Horizon Labs">
                </div>
                <div class="control-group">
                    <label>Funding Goal</label>
                    <input type="text" id="funding-goal" value="$8.7B">
                </div>
                <div class="control-group">
                    <label>Timeline</label>
                    <select id="timeline-select">
                        <option value="7">7 Years</option>
                        <option value="5">5 Years (Accelerated)</option>
                        <option value="10">10 Years (Conservative)</option>
                    </select>
                </div>
                <div class="control-group">
                    <label>Focus Areas</label>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: normal;">
                            <input type="checkbox" id="focus-energy" checked> Energy Generation
                        </label>
                        <label style="font-weight: normal;">
                            <input type="checkbox" id="focus-stability" checked> Wormhole Stability
                        </label>
                        <label style="font-weight: normal;">
                            <input type="checkbox" id="focus-navigation" checked> Navigation Systems
                        </label>
                        <label style="font-weight: normal;">
                            <input type="checkbox" id="focus-safety" checked> Safety Protocols
                        </label>
                    </div>
                </div>
            </div>
            <!-- Action Buttons -->
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="updatePresentation()">Update Slides</button>
                <button class="btn btn-secondary" onclick="showExportModal()">Export</button>
            </div>
        </aside>
        <!-- Main Presentation Area -->
        <main class="presentation-area">
            <!-- Presentation Controls -->
            <div class="presentation-controls">
                <div class="slide-nav">
                    <button onclick="previousSlide()" id="prev-btn">← Previous</button>
                    <span class="slide-counter">
                        <span id="current-slide">1</span> / <span id="total-slides">10</span>
                    </span>
                    <button onclick="nextSlide()" id="next-btn">Next →</button>
                </div>
                <div class="presentation-actions">
                    <button class="btn btn-secondary" onclick="toggleFullscreen()">Fullscreen</button>
                    <button class="btn btn-secondary" onclick="printPresentation()">Print</button>
                </div>
            </div>
            <!-- Slide Viewport -->
            <div class="slide-viewport">
                <div class="slide-container" id="slide-container">
                    <!-- Slides will be dynamically generated here -->
                </div>
            </div>
        </main>
    </div>
    <!-- Export Modal -->
    <div class="modal" id="export-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Export Presentation</h3>
            </div>
            <div class="export-options">
                <div class="export-option" onclick="exportPDF()">
                    <h4>PDF Document</h4>
                    <p>Export as a PDF for easy sharing and printing</p>
                </div>
                <div class="export-option" onclick="exportPowerPoint()">
                    <h4>PowerPoint Format</h4>
                    <p>Download as PPTX for further editing</p>
                </div>
                <div class="export-option" onclick="exportHTML()">
                    <h4>Web Presentation</h4>
                    <p>Self-contained HTML file for online viewing</p>
                </div>
            </div>
            <button class="btn btn-secondary" onclick="hideExportModal()">Cancel</button>
        </div>
    </div>
<?php
// Include the footer
require_once 'footer.php';
?>