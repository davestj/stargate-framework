<?php
/**
 * reactor_control.php - Reactor Control Dashboard
 * Author: OpenAI ChatGPT
 * Description: Monitors reactor health and metrics with optional live updates.
 */

// Include the shared header
require_once 'header.php';
?>

<section class="reactor-dashboard">
    <h1>Reactor Control Dashboard</h1>
    <div class="health-status">
        <h2>System Health: <span id="health-value">--</span></h2>
        <p>Status: <span id="status-value">--</span></p>
    </div>
    <div class="metrics-grid">
        <div class="metric-card">
            <h3>CPU Usage</h3>
            <div class="metric-value" id="cpu-usage">--%</div>
        </div>
        <div class="metric-card">
            <h3>Memory Usage</h3>
            <div class="metric-value" id="memory-usage">-- MB</div>
        </div>
        <div class="metric-card">
            <h3>Event Rate</h3>
            <div class="metric-value" id="event-rate">-- /s</div>
        </div>
    </div>
</section>

<?php
// Include the shared footer
require_once 'footer.php';
?>
