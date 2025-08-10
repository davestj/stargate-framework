<?php
/**
 * test_setup.php - Installation verification script for Stargate Framework
 * Author: David (davestj)
 * Purpose: Verify all components are properly installed and working
 */

// I'm creating a comprehensive test script to verify your installation
$test_results = [];
$all_tests_passed = true;

// Function to perform a test
function test($name, $condition, $success_msg = "Passed", $fail_msg = "Failed") {
    global $test_results, $all_tests_passed;
    
    if ($condition) {
        $test_results[] = ["✓", $name, $success_msg];
    } else {
        $test_results[] = ["✗", $name, $fail_msg];
        $all_tests_passed = false;
    }
}

// Test 1: Check PHP version
test(
    "PHP Version",
    version_compare(PHP_VERSION, '7.0.0', '>='),
    "PHP " . PHP_VERSION . " (OK)",
    "PHP " . PHP_VERSION . " (Requires 7.0+)"
);

// Test 2: Check required files exist
$required_files = [
    'header.php' => 'Header component',
    'footer.php' => 'Footer component',
    'index.php' => 'Main landing page',
    'css/main.css' => 'Main stylesheet',
    'js/main.js' => 'Main JavaScript'
];

foreach ($required_files as $file => $description) {
    test(
        $description,
        file_exists($file),
        "Found: $file",
        "Missing: $file"
    );
}

// Test 3: Check directory permissions
$directories = ['css', 'js', 'img', 'theoretical_docs'];
foreach ($directories as $dir) {
    test(
        "Directory: $dir",
        is_dir($dir) && is_writable($dir),
        "Exists and writable",
        is_dir($dir) ? "Not writable" : "Does not exist"
    );
}

// Test 4: Check page files
$pages = [
    'interactive_visualization',
    'metrics_feasability_dashboard',
    '3d_interactive_model',
    'wormhole_travel_dashboard',
    'presentation_builder',
    'executive_summary_generator',
    'technical_docs'
];

foreach ($pages as $page) {
    test(
        "Page: $page",
        file_exists($page . '.php'),
        "Found: $page.php",
        "Missing: $page.php"
    );
}

// Test 5: Check external dependencies
test(
    "Internet Connection",
    @fopen("https://cdnjs.cloudflare.com", "r"),
    "Connected (CDN access OK)",
    "No connection (CDN may not work)"
);

// Test 6: Check .htaccess
test(
    "URL Rewriting",
    file_exists('.htaccess'),
    ".htaccess found",
    ".htaccess missing (clean URLs won't work)"
);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stargate Framework - Installation Test</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f7fa;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            color: #2c3e50;
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .test-results {
            margin-bottom: 2rem;
        }
        
        .test-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .test-item:last-child {
            border-bottom: none;
        }
        
        .status {
            font-size: 1.5rem;
            margin-right: 1rem;
            width: 30px;
        }
        
        .status.pass { color: #2ecc71; }
        .status.fail { color: #e74c3c; }
        
        .test-name {
            flex: 1;
            font-weight: 500;
        }
        
        .test-result {
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        .summary {
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .summary.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .summary.failure {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #3498db;
            color: white;
        }
        
        .btn-primary:hover {
            background: #2980b9;
        }
        
        .btn-secondary {
            background: #95a5a6;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #7f8c8d;
        }
        
        .info-box {
            background: #e3f2fd;
            border-left: 4px solid #3498db;
            padding: 1rem;
            margin-top: 2rem;
        }
        
        .info-box h3 {
            margin-top: 0;
            color: #1976d2;
        }
        
        .info-box ul {
            margin-bottom: 0;
        }
        
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Stargate Framework Installation Test</h1>
        
        <div class="summary <?php echo $all_tests_passed ? 'success' : 'failure'; ?>">
            <?php if ($all_tests_passed): ?>
                <h2>✅ All Tests Passed!</h2>
                <p>Your Stargate Framework installation is ready to use.</p>
            <?php else: ?>
                <h2>⚠️ Some Tests Failed</h2>
                <p>Please fix the issues below before proceeding.</p>
            <?php endif; ?>
        </div>
        
        <div class="test-results">
            <h2>Test Results</h2>
            <?php foreach ($test_results as $result): ?>
                <div class="test-item">
                    <span class="status <?php echo $result[0] === '✓' ? 'pass' : 'fail'; ?>">
                        <?php echo $result[0]; ?>
                    </span>
                    <span class="test-name"><?php echo $result[1]; ?></span>
                    <span class="test-result"><?php echo $result[2]; ?></span>
                </div>
            <?php endforeach; ?>
        </div>
        
        <?php if (!$all_tests_passed): ?>
        <div class="info-box">
            <h3>How to Fix Common Issues</h3>
            <ul>
                <li><strong>Missing files:</strong> Run the conversion script or manually create the files</li>
                <li><strong>Permission issues:</strong> Run <code>chmod 755 css js img</code></li>
                <li><strong>Missing .htaccess:</strong> Create it using the deployment guide</li>
                <li><strong>PHP version:</strong> Contact your hosting provider to upgrade PHP</li>
            </ul>
        </div>
        <?php endif; ?>
        
        <div class="actions">
            <a href="index.php" class="btn btn-primary">Go to Homepage</a>
            <a href="technical_docs.php" class="btn btn-secondary">View Documentation</a>
        </div>
        
        <div class="info-box" style="margin-top: 3rem;">
            <h3>Quick Links for Testing</h3>
            <p>Test each component of your Stargate Framework:</p>
            <ul>
                <li><a href="interactive_visualization.php">Interactive Visualizations</a></li>
                <li><a href="metrics_feasability_dashboard.php">Investment Metrics</a></li>
                <li><a href="3d_interactive_model.php">3D Model Viewer</a></li>
                <li><a href="wormhole_travel_dashboard.php">Travel Simulator</a></li>
                <li><a href="presentation_builder.php">Presentation Builder</a></li>
                <li><a href="executive_summary_generator.php">Executive Summary Generator</a></li>
            </ul>
        </div>
    </div>
</body>
</html>
