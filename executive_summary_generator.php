<?php
/**
 * executive_summary_generator.php - Executive Summary Generator
 * Author: David (davestj)
 * Converted from HTML on: 2025-07-25 21:40:15
 */

// Include the header
require_once 'header.php';
?>

<!-- Main content for executive_summary_generator -->
<!-- Header -->
    <header class="app-header">
        <h1>Executive Summary Generator</h1>
        <p>Create targeted one-page briefs for stakeholders</p>
    </header>
    <!-- Main Application Container -->
    <div class="app-container">
        <!-- Configuration Panel -->
        <aside class="config-panel">
            <!-- Audience Selection -->
            <div class="config-section">
                <h3>Select Target Audience</h3>
                <div class="audience-selector">
                    <div class="audience-option selected" data-audience="investor">
                        <h4>Investors</h4>
                        <p>Focus on ROI, market opportunity, and financial projections</p>
                    </div>
                    <div class="audience-option" data-audience="government">
                        <h4>Government Officials</h4>
                        <p>Emphasize national security, strategic advantages, and public benefit</p>
                    </div>
                    <div class="audience-option" data-audience="technical">
                        <h4>Technical Partners</h4>
                        <p>Highlight scientific breakthroughs and engineering challenges</p>
                    </div>
                    <div class="audience-option" data-audience="media">
                        <h4>Media & Public</h4>
                        <p>Focus on human impact and transformative potential</p>
                    </div>
                </div>
            </div>
            <!-- Key Information -->
            <div class="config-section">
                <h3>Key Information</h3>
                <div class="form-group">
                    <label>Project Phase</label>
                    <select id="project-phase">
                        <option value="concept">Concept & Validation</option>
                        <option value="development">Active Development</option>
                        <option value="testing">Testing & Refinement</option>
                        <option value="deployment">Ready for Deployment</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Funding Required</label>
                    <input type="text" id="funding-required" value="$8.7 billion" placeholder="e.g., $8.7 billion">
                </div>
                <div class="form-group">
                    <label>Timeline</label>
                    <input type="text" id="timeline" value="7 years" placeholder="e.g., 7 years">
                </div>
                <div class="form-group">
                    <label>Key Partnership</label>
                    <input type="text" id="key-partnership" placeholder="e.g., SpaceX, NASA" value="SpaceX, NASA JPL, U.S. Space Force">
                </div>
            </div>
            <!-- Content Options -->
            <div class="config-section">
                <h3>Content to Include</h3>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="include-technical" checked>
                        Technical Overview
                    </label>
                    <label>
                        <input type="checkbox" id="include-financial" checked>
                        Financial Projections
                    </label>
                    <label>
                        <input type="checkbox" id="include-timeline" checked>
                        Development Timeline
                    </label>
                    <label>
                        <input type="checkbox" id="include-risks" checked>
                        Risk Assessment
                    </label>
                    <label>
                        <input type="checkbox" id="include-team">
                        Team Information
                    </label>
                    <label>
                        <input type="checkbox" id="include-competition">
                        Competitive Analysis
                    </label>
                </div>
            </div>
            <!-- Custom Message -->
            <div class="config-section">
                <h3>Custom Message</h3>
                <div class="form-group">
                    <label>Opening Statement (Optional)</label>
                    <textarea id="custom-opening" placeholder="Add a personalized opening statement..."></textarea>
                </div>
                <div class="form-group">
                    <label>Classification Level</label>
                    <select id="classification">
                        <option value="public">Public Release</option>
                        <option value="confidential">Confidential</option>
                        <option value="classified">Classified</option>
                    </select>
                </div>
            </div>
            <!-- Generate Button -->
            <button class="generate-btn" onclick="generateSummary()">Generate Executive Summary</button>
        </aside>
        <!-- Preview Area -->
        <main class="preview-area">
            <div class="summary-container">
                <!-- Export Controls -->
                <div class="export-controls">
                    <button class="export-btn" onclick="exportPDF()">Export PDF</button>
                    <button class="export-btn" onclick="exportWord()">Export Word</button>
                    <button class="export-btn" onclick="printSummary()">Print</button>
                </div>
                <!-- Summary Document -->
                <div class="summary-document" id="summary-document">
                    <!-- Content will be dynamically generated here -->
                    <div style="text-align: center; color: #95a5a6; padding: 100px 20px;">
                        <h2>Configure your summary settings</h2>
                        <p>Select your target audience and customize the content options, then click "Generate Executive Summary"</p>
                    </div>
                </div>
                <!-- Generating Overlay -->
                <div class="generating-overlay" id="generating-overlay">
                    <div class="generating-content">
                        <div class="spinner"></div>
                        <p>Generating executive summary...</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
<?php
// Include the footer
require_once 'footer.php';
?>