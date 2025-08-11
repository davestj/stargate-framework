<?php
/**
 * header.php - Shared header component for Stargate Framework website
 * Author: David (davestj)
 * Purpose: DRY principle - single header for all pages
 */

// Get the current page for active navigation highlighting
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Stargate Framework - <?php echo ucwords(str_replace('_', ' ', $current_page)); ?></title>

    <!-- Shared CSS for all pages -->
    <link rel="stylesheet" href="css/main.css">

    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Page-specific CSS -->
    <?php if(file_exists("css/{$current_page}.css")): ?>
        <link rel="stylesheet" href="css/<?php echo $current_page; ?>.css">
    <?php endif; ?>

    <!-- Three.js for 3D viewer -->
    <?php if($current_page == '3d_interactive_model'): ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <?php endif; ?>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
</head>
<body>
    <!-- Main Navigation -->
    <nav class="main-navigation">
        <div class="nav-container">
            <div class="nav-brand">
                <a href="index.php">
                    <i class="nav-icon fas fa-atom" aria-hidden="true"></i>
                    <span class="brand-text">
                        <h1>Stargate Framework</h1>
                        <span class="tagline">Beyond The Horizon Labs</span>
                    </span>
                </a>
            </div>

            <ul class="nav-menu nav-primary" id="nav-primary">
                <li class="nav-item <?php echo ($current_page == 'index') ? 'active' : ''; ?>">
                    <a href="index.php"><i class="nav-icon fas fa-home" aria-hidden="true"></i>Overview</a>
                </li>
                <li class="nav-item <?php echo ($current_page == 'interactive_visualization') ? 'active' : ''; ?>">
                    <a href="interactive_visualization.php"><i class="nav-icon fas fa-chart-bar" aria-hidden="true"></i>Visualizations</a>
                </li>
                <li class="nav-item <?php echo ($current_page == 'metrics_feasability_dashboard') ? 'active' : ''; ?>">
                    <a href="metrics_feasability_dashboard.php"><i class="nav-icon fas fa-tachometer-alt" aria-hidden="true"></i>Metrics</a>
                </li>
                <li class="nav-item <?php echo ($current_page == '3d_interactive_model') ? 'active' : ''; ?>">
                    <a href="3d_interactive_model.php"><i class="nav-icon fas fa-cube" aria-hidden="true"></i>3D Model</a>
                </li>
            </ul>

            <button class="nav-secondary-toggle" id="nav-secondary-toggle" aria-label="Toggle navigation" aria-controls="nav-secondary" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>

            <ul class="nav-menu nav-secondary" id="nav-secondary">
                <li class="nav-item <?php echo ($current_page == 'wormhole_travel_dashboard') ? 'active' : ''; ?>">
                    <a href="wormhole_travel_dashboard.php"><i class="nav-icon fas fa-rocket" aria-hidden="true"></i>Simulator</a>
                </li>
                <li class="nav-item <?php echo ($current_page == 'presentation_builder') ? 'active' : ''; ?>">
                    <a href="presentation_builder.php"><i class="nav-icon fas fa-chalkboard" aria-hidden="true"></i>Presentations</a>
                </li>
                <li class="nav-item <?php echo ($current_page == 'executive_summary_generator') ? 'active' : ''; ?>">
                    <a href="executive_summary_generator.php"><i class="nav-icon fas fa-file-alt" aria-hidden="true"></i>Summaries</a>
                </li>
                <li class="nav-item <?php echo ($current_page == 'technical_docs') ? 'active' : ''; ?>">
                    <a href="technical_docs.php"><i class="nav-icon fas fa-book" aria-hidden="true"></i>Documentation</a>
                </li>
                <li class="nav-item <?php echo ($current_page == 'downloads') ? 'active' : ''; ?>">
                    <a href="downloads.php"><i class="nav-icon fas fa-download" aria-hidden="true"></i>Downloads</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Page Content Wrapper -->
    <main class="main-content">
