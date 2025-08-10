<?php
/**
 * footer.php - Shared footer component for Stargate Framework website
 * Author: David (davestj)
 * Purpose: DRY principle - single footer for all pages
 */
?>
    </main> <!-- Close main-content from header.php -->

    <!-- Footer -->
    <footer class="main-footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Stargate Framework</h3>
                    <p>A unified theory for wormhole energy, FTL propulsion, and temporal navigation systems.</p>
                    <p class="copyright">&copy; <?php echo date('Y'); ?> Beyond The Horizon Labs</p>
                </div>

                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="theoretical_docs/">Research Papers</a></li>
                        <li><a href="https://github.com/davestj/stargate-framework" target="_blank">GitHub Repository</a></li>
                        <li><a href="mailto:davestj@gmail.com">Contact</a></li>
                        <li><a href="https://orcid.org/0009-0000-5077-9751" target="_blank">ORCID</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Technical Resources</h4>
                    <ul>
                        <li><a href="technical_docs.php#base3">Base-3 Mathematics</a></li>
                        <li><a href="technical_docs.php#base8">Base-8 Stabilization</a></li>
                        <li><a href="technical_docs.php#base5">Base-5 Navigation</a></li>
                        <li><a href="technical_docs.php#base17">Base-17 Temporal</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Project Status</h4>
                    <div class="status-indicator">
                        <span class="status-dot active"></span>
                        <span>Active Development</span>
                    </div>
                    <p class="small-text">Seeking funding partners for Phase 1 implementation</p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>Created by David (davestj) |
                   <a href="https://davestj.com">davestj.com</a> |
                   <a href="https://bitbucket.org/davestj">Bitbucket</a> |
                   <a href="https://github.com/davestj">GitHub</a>
                </p>
            </div>
        </div>
    </footer>

    <!-- Shared JavaScript -->
    <script src="js/main.js"></script>

    <!-- Page-specific JavaScript -->
    <?php if(file_exists("js/{$current_page}.js")): ?>
        <script src="js/<?php echo $current_page; ?>.js"></script>
    <?php endif; ?>

    <!-- Global site analytics (if needed) -->
    <script>
        // I'm adding a simple page view tracker for internal analytics
        console.log('Page loaded:', '<?php echo $current_page; ?>');
    </script>
</body>
</html>
