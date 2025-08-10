<?php
/**
 * metrics_feasability_dashboard.php - Metrics Feasability Dashboard
 * Author: David (davestj)
 * Converted from HTML on: 2025-07-25 21:40:15
 */

// Include the header
require_once 'header.php';
?>

<!-- Main content for metrics_feasability_dashboard -->
<!-- Header -->
    <header class="header">
        <h1>Stargate Framework - Investment Metrics Dashboard</h1>
        <p>Real-time feasibility analysis and ROI projections for wormhole technology development</p>
    </header>
    <!-- Key Performance Indicators -->
    <section class="kpi-section">
        <div class="kpi-grid">
            <div class="kpi-card energy animate-in">
                <div class="kpi-label">Energy Requirement</div>
                <div class="kpi-value" id="energy-requirement">12.5 TW</div>
                <div class="kpi-change">↓ 15% from initial estimates</div>
            </div>
            <div class="kpi-card cost animate-in" style="animation-delay: 0.1s">
                <div class="kpi-label">Total Investment Needed</div>
                <div class="kpi-value" id="total-investment">$8.2B</div>
                <div class="kpi-change">Phase 1: $2.1B</div>
            </div>
            <div class="kpi-card timeline animate-in" style="animation-delay: 0.2s">
                <div class="kpi-label">Time to Prototype</div>
                <div class="kpi-value" id="time-to-prototype">3.5y</div>
                <div class="kpi-change">6 months ahead of schedule</div>
            </div>
            <div class="kpi-card efficiency animate-in" style="animation-delay: 0.3s">
                <div class="kpi-label">Energy Efficiency</div>
                <div class="kpi-value" id="efficiency">87%</div>
                <div class="kpi-change">↑ 12% with Base-3 optimization</div>
            </div>
        </div>
    </section>
    <!-- Main Dashboard Content -->
    <main class="dashboard-content">
        <div class="dashboard-grid">
            <!-- Development Progress -->
            <div class="dashboard-card animate-in">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M13 2.03v2.02c4.39.54 7.5 4.53 6.96 8.92-.46 3.64-3.32 6.53-6.96 6.96v2.02c5.5-.55 9.5-5.43 8.95-10.93-.45-4.75-4.19-8.5-8.95-8.95z"/>
                        <path d="M11 2.03v2.02C6.61 4.59 3.5 8.58 4.04 12.97c.46 3.64 3.32 6.53 6.96 6.96v2.02C5.5 21.4 1.5 16.52 2.05 11.02 2.5 6.27 6.24 2.53 11 2.03z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Development Progress
                </h3>
                <div class="progress-item">
                    <div class="progress-label">
                        <span>Theoretical Framework</span>
                        <span>95%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 95%; background: #2ecc71;"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-label">
                        <span>Mathematical Validation</span>
                        <span>88%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 88%; background: #3498db;"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-label">
                        <span>Prototype Design</span>
                        <span>72%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 72%; background: #f39c12;"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-label">
                        <span>Material Sourcing</span>
                        <span>45%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 45%; background: #e74c3c;"></div>
                    </div>
                </div>
                <div class="progress-item">
                    <div class="progress-label">
                        <span>Lab Testing</span>
                        <span>12%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 12%; background: #9b59b6;"></div>
                    </div>
                </div>
            </div>
            <!-- Cost Breakdown -->
            <div class="dashboard-card animate-in" style="animation-delay: 0.1s">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                    </svg>
                    Investment Breakdown
                </h3>
                <table class="cost-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Phase 1</th>
                            <th>Phase 2</th>
                            <th>Phase 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Research & Development</td>
                            <td>$450M</td>
                            <td>$380M</td>
                            <td>$220M</td>
                        </tr>
                        <tr>
                            <td>Materials & Components</td>
                            <td>$620M</td>
                            <td>$1.2B</td>
                            <td>$890M</td>
                        </tr>
                        <tr>
                            <td>Infrastructure</td>
                            <td>$380M</td>
                            <td>$750M</td>
                            <td>$1.1B</td>
                        </tr>
                        <tr>
                            <td>Testing & Validation</td>
                            <td>$290M</td>
                            <td>$410M</td>
                            <td>$520M</td>
                        </tr>
                        <tr>
                            <td>Personnel & Operations</td>
                            <td>$360M</td>
                            <td>$480M</td>
                            <td>$650M</td>
                        </tr>
                        <tr class="total">
                            <td>Total per Phase</td>
                            <td>$2.1B</td>
                            <td>$3.22B</td>
                            <td>$3.38B</td>
                        </tr>
                    </tbody>
                </table>
                <div style="margin-top: 1rem; text-align: right;">
                    <strong>Total Investment: $8.7B over 7 years</strong>
                </div>
            </div>
            <!-- Energy Requirements Chart -->
            <div class="dashboard-card animate-in" style="animation-delay: 0.2s">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
                    </svg>
                    Energy Requirements Over Time
                </h3>
                <div class="chart-container">
                    <canvas id="energy-chart" class="chart-canvas"></canvas>
                </div>
                <p style="margin-top: 1rem; color: #7f8c8d;">
                    Base-3 ternary fission reduces energy requirements by 35% compared to traditional approaches. 
                    Peak consumption occurs during wormhole initialization, with steady-state operation requiring only 
                    2.3 TW for Earth-Mars transit.
                </p>
            </div>
            <!-- Development Timeline -->
            <div class="dashboard-card animate-in" style="animation-delay: 0.3s">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                    Development Timeline
                </h3>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-marker">1</div>
                        <div class="timeline-content">
                            <h4>Q1 2025 - Q4 2025</h4>
                            <p>Complete theoretical validation and secure Phase 1 funding</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-marker">2</div>
                        <div class="timeline-content">
                            <h4>Q1 2026 - Q2 2027</h4>
                            <p>Build and test Base-3 energy reactor prototype</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-marker">3</div>
                        <div class="timeline-content">
                            <h4>Q3 2027 - Q4 2028</h4>
                            <p>Develop Base-8 electromagnetic containment system</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-marker">4</div>
                        <div class="timeline-content">
                            <h4>Q1 2029 - Q2 2030</h4>
                            <p>Integrate navigation systems and conduct first portal tests</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-marker">5</div>
                        <div class="timeline-content">
                            <h4>Q3 2030 - Q4 2031</h4>
                            <p>Full system integration and human-rated testing</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ROI Calculator -->
            <div class="dashboard-card animate-in" style="animation-delay: 0.4s">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                    ROI Calculator
                </h3>
                <div class="calculator-input">
                    <label>Cargo capacity per transit (tons):</label>
                    <input type="number" id="cargo-capacity" value="1000" min="100" max="10000">
                </div>
                <div class="calculator-input">
                    <label>Cost per kg to Mars (current):</label>
                    <input type="number" id="current-cost" value="50000" min="1000" max="100000">
                </div>
                <div class="calculator-input">
                    <label>Transits per year:</label>
                    <input type="number" id="transits-per-year" value="100" min="10" max="1000">
                </div>
                <div class="roi-result">
                    <p>Estimated Annual Revenue:</p>
                    <div class="value" id="annual-revenue">$5B</div>
                    <p style="margin-top: 1rem;">Break-even in <strong id="break-even">2.8</strong> years after operations begin</p>
                </div>
            </div>
            <!-- Market Opportunity -->
            <div class="dashboard-card animate-in" style="animation-delay: 0.5s">
                <h3>
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Market Opportunity
                </h3>
                <div class="chart-container">
                    <canvas id="market-chart" class="chart-canvas"></canvas>
                </div>
                <div style="margin-top: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;">Addressable Markets:</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                            <strong>Space Logistics:</strong> $450B by 2035
                        </li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                            <strong>Interplanetary Mining:</strong> $1.2T by 2040
                        </li>
                        <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                            <strong>Space Tourism:</strong> $85B by 2032
                        </li>
                        <li style="padding: 0.5rem 0;">
                            <strong>Scientific Research:</strong> $230B by 2035
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
<?php
// Include the footer
require_once 'footer.php';
?>