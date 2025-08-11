<?php
/**
 * downloads.php - Downloads and API reference page
 * Author: ChatGPT
 * Provides links to release artifacts and API endpoints.
 */

require_once 'header.php';
?>

<section class="downloads-section">
    <div class="container">
        <h1>Downloads &amp; API</h1>
        <p>Get the latest release artifacts and explore the REST API for the Stargate Framework.</p>

        <h2>GitHub Releases</h2>
        <ul class="download-list">
            <li><a href="https://github.com/davestj/ternary-fission-reactor/releases/latest" target="_blank" rel="noopener">Latest Release</a></li>
            <li><a href="https://github.com/davestj/stargate-framework/archive/refs/heads/main.zip" target="_blank" rel="noopener">Source Code (ZIP)</a></li>
            <li><a href="https://github.com/davestj/stargate-framework/archive/refs/heads/main.tar.gz" target="_blank" rel="noopener">Source Code (TAR.GZ)</a></li>
        </ul>

        <h2>API Endpoints</h2>
        <p>The following endpoints are available under <code>/api/v1/</code>:</p>
        <ul class="api-list">
            <li><a href="/api/v1/stargate/activate"><code>POST /api/v1/stargate/activate</code></a> – Initiate stargate activation sequence.</li>
            <li><a href="/api/v1/stargate/status"><code>GET /api/v1/stargate/status</code></a> – Retrieve current stargate status.</li>
            <li><a href="/api/v1/stargate/deactivate"><code>POST /api/v1/stargate/deactivate</code></a> – Shutdown active stargate.</li>
        </ul>
    </div>
</section>

<?php
require_once 'footer.php';
?>
