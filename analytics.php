<?php
/**
 * analytics.php - Analytics tracking component
 * Author: David (davestj)
 * Purpose: Add to header.php for visitor tracking
 */

// I'm creating a simple analytics tracking system
// Add this code to your header.php file before the closing </head> tag
?>

<!-- Google Analytics (replace UA-XXXXX-Y with your tracking ID) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXX-Y');
</script>

<!-- Custom Analytics for Stargate Framework -->
<script>
    // Track which tools are most popular
    window.StargateAnalytics = {
        trackEvent: function(category, action, label, value) {
            // Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    'event_category': category,
                    'event_label': label,
                    'value': value
                });
            }
            
            // Log for development
            console.log('Analytics Event:', {
                category: category,
                action: action,
                label: label,
                value: value,
                timestamp: new Date().toISOString()
            });
        },
        
        // Track tool usage
        trackToolUsage: function(toolName) {
            this.trackEvent('Tool Usage', 'open', toolName);
        },
        
        // Track downloads
        trackDownload: function(fileType) {
            this.trackEvent('Downloads', 'download', fileType);
        },
        
        // Track investor actions
        trackInvestorAction: function(action) {
            this.trackEvent('Investor Engagement', action, window.location.pathname);
        }
    };
    
    // Auto-track page views with custom dimensions
    document.addEventListener('DOMContentLoaded', function() {
        const pageName = document.title.split(' - ')[1] || 'Unknown';
        StargateAnalytics.trackEvent('Page View', 'load', pageName);
    });
</script>

<?php
/**
 * meta_tags.php - SEO meta tags for each page
 * Author: David (davestj)
 * Purpose: Include in header.php with dynamic content
 */

// Define meta tags for each page
$meta_tags = [
    'index' => [
        'title' => 'Stargate Framework - Wormhole Technology for Interstellar Travel',
        'description' => 'Revolutionary mathematical framework combining Base-3, Base-5, Base-8, and Base-17 systems for sustainable wormhole generation and FTL travel.',
        'keywords' => 'wormhole, FTL, faster than light, space travel, stargate, physics, mathematics, David St. John'
    ],
    'interactive_visualization' => [
        'title' => 'Interactive Mathematical Visualizations - Stargate Framework',
        'description' => 'Explore the four mathematical bases powering wormhole technology through real-time interactive visualizations.',
        'keywords' => 'base-3 mathematics, base-8 stabilization, base-5 navigation, base-17 temporal, wormhole physics'
    ],
    'metrics_feasability_dashboard' => [
        'title' => 'Investment Metrics & ROI Calculator - Stargate Framework',
        'description' => 'Detailed financial projections, ROI calculations, and development timelines for wormhole technology commercialization.',
        'keywords' => 'space technology investment, ROI calculator, wormhole economics, stargate funding'
    ],
    '3d_interactive_model' => [
        'title' => '3D Stargate Model - Interactive Wormhole Generator Design',
        'description' => 'Explore the physical design of the stargate wormhole generator with interactive 3D visualization.',
        'keywords' => '3D model, stargate design, wormhole generator, electromagnetic containment'
    ],
    'wormhole_travel_dashboard' => [
        'title' => 'Wormhole Travel Simulator - Experience Interstellar Transit',
        'description' => 'Real-time simulation of wormhole travel including power management and navigation controls.',
        'keywords' => 'wormhole simulator, space travel simulation, stargate navigation, FTL travel'
    ],
    'presentation_builder' => [
        'title' => 'Presentation Builder - Stargate Framework Pitch Decks',
        'description' => 'Create customized presentations for investors, government officials, and technical partners.',
        'keywords' => 'pitch deck builder, investor presentation, stargate presentation, space technology'
    ],
    'executive_summary_generator' => [
        'title' => 'Executive Summary Generator - One-Page Stargate Briefs',
        'description' => 'Generate targeted executive summaries for stakeholders interested in wormhole technology.',
        'keywords' => 'executive summary, one-pager, stargate brief, investor summary'
    ],
    'technical_docs' => [
        'title' => 'Technical Documentation - Stargate Framework Mathematics',
        'description' => 'Comprehensive mathematical foundations and implementation specifications for wormhole generation.',
        'keywords' => 'technical documentation, wormhole mathematics, stargate theory, physics documentation'
    ]
];

// Get current page meta tags
$current_meta = $meta_tags[$current_page] ?? $meta_tags['index'];

// Function to output meta tags
function outputMetaTags($meta) {
    ?>
    <!-- SEO Meta Tags -->
    <title><?php echo htmlspecialchars($meta['title']); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($meta['description']); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($meta['keywords']); ?>">
    <meta name="author" content="David St. John (davestj)">
    
    <!-- Open Graph Meta Tags for Social Media -->
    <meta property="og:title" content="<?php echo htmlspecialchars($meta['title']); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($meta['description']); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://davestj.com/bthl/stargate_framework/<?php echo $GLOBALS['current_page']; ?>">
    <meta property="og:image" content="https://davestj.com/bthl/stargate_framework/img/stargate-og-image.jpg">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($meta['title']); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($meta['description']); ?>">
    <meta name="twitter:image" content="https://davestj.com/bthl/stargate_framework/img/stargate-twitter-card.jpg">
    
    <!-- Additional SEO Tags -->
    <link rel="canonical" href="https://davestj.com/bthl/stargate_framework/<?php echo $GLOBALS['current_page']; ?>">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ResearchProject",
        "name": "Stargate Framework",
        "description": "<?php echo htmlspecialchars($meta['description']); ?>",
        "url": "https://davestj.com/bthl/stargate_framework/",
        "author": {
            "@type": "Person",
            "name": "David St. John",
            "email": "davestj@gmail.com",
            "sameAs": [
                "https://github.com/davestj",
                "https://bitbucket.org/davestj",
                "https://orcid.org/0009-0000-5077-9751"
            ]
        },
        "datePublished": "2025-01-26",
        "keywords": "<?php echo htmlspecialchars($meta['keywords']); ?>",
        "funding": {
            "@type": "Grant",
            "name": "Seeking Investment",
            "funder": {
                "@type": "Organization",
                "name": "Beyond The Horizon Labs"
            }
        }
    }
    </script>
    <?php
}

// Add this to your header.php file:
// outputMetaTags($current_meta);
?>

<?php
/**
 * tracking_pixel.php - Simple visitor tracking
 * Author: David (davestj)
 * Purpose: Track unique visitors and page views
 */

// Simple file-based analytics (no database required)
function trackVisitor() {
    $log_file = 'visitor_logs/' . date('Y-m-d') . '.log';
    $log_dir = dirname($log_file);
    
    // Create directory if it doesn't exist
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    // Collect visitor data
    $visitor_data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'page' => $_SERVER['REQUEST_URI'] ?? 'unknown',
        'referrer' => $_SERVER['HTTP_REFERER'] ?? 'direct',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ];
    
    // Write to log file
    file_put_contents($log_file, json_encode($visitor_data) . "\n", FILE_APPEND | LOCK_EX);
}

// Call this in your header.php
// trackVisitor();
?>

<?php
/**
 * quick_stats.php - Display visitor statistics
 * Author: David (davestj)
 * Purpose: Simple analytics dashboard
 */

function getVisitorStats() {
    $stats = [
        'today' => 0,
        'week' => 0,
        'month' => 0,
        'pages' => []
    ];
    
    $log_dir = 'visitor_logs/';
    if (!is_dir($log_dir)) {
        return $stats;
    }
    
    // Get all log files
    $files = glob($log_dir . '*.log');
    
    foreach ($files as $file) {
        $date = basename($file, '.log');
        $file_time = strtotime($date);
        
        // Check if within time ranges
        $today = strtotime('today');
        $week_ago = strtotime('-7 days');
        $month_ago = strtotime('-30 days');
        
        if ($file_time >= $today) {
            $lines = file($file, FILE_IGNORE_NEW_LINES);
            $stats['today'] += count($lines);
        }
        
        if ($file_time >= $week_ago) {
            $lines = file($file, FILE_IGNORE_NEW_LINES);
            $stats['week'] += count($lines);
        }
        
        if ($file_time >= $month_ago) {
            $lines = file($file, FILE_IGNORE_NEW_LINES);
            $stats['month'] += count($lines);
            
            // Count page views
            foreach ($lines as $line) {
                $data = json_decode($line, true);
                if ($data && isset($data['page'])) {
                    $page = basename($data['page'], '.php');
                    if (!isset($stats['pages'][$page])) {
                        $stats['pages'][$page] = 0;
                    }
                    $stats['pages'][$page]++;
                }
            }
        }
    }
    
    // Sort pages by popularity
    arsort($stats['pages']);
    
    return $stats;
}

// Display stats (create a simple admin page)
if (basename($_SERVER['PHP_SELF']) == 'quick_stats.php') {
    $stats = getVisitorStats();
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Visitor Statistics - Stargate Framework</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
            .stat-card { background: white; padding: 20px; margin: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .stat-number { font-size: 2em; font-weight: bold; color: #3498db; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #3498db; color: white; }
        </style>
    </head>
    <body>
        <h1>Visitor Statistics</h1>
        
        <div style="display: flex; flex-wrap: wrap;">
            <div class="stat-card">
                <h3>Today</h3>
                <div class="stat-number"><?php echo number_format($stats['today']); ?></div>
                <p>Page views</p>
            </div>
            
            <div class="stat-card">
                <h3>This Week</h3>
                <div class="stat-number"><?php echo number_format($stats['week']); ?></div>
                <p>Page views</p>
            </div>
            
            <div class="stat-card">
                <h3>This Month</h3>
                <div class="stat-number"><?php echo number_format($stats['month']); ?></div>
                <p>Page views</p>
            </div>
        </div>
        
        <div class="stat-card">
            <h3>Popular Pages (Last 30 Days)</h3>
            <table>
                <tr>
                    <th>Page</th>
                    <th>Views</th>
                    <th>Percentage</th>
                </tr>
                <?php foreach ($stats['pages'] as $page => $views): ?>
                <tr>
                    <td><?php echo htmlspecialchars($page); ?></td>
                    <td><?php echo number_format($views); ?></td>
                    <td><?php echo round($views / $stats['month'] * 100, 1); ?>%</td>
                </tr>
                <?php endforeach; ?>
            </table>
        </div>
    </body>
    </html>
    <?php
}
?>
