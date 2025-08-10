<?php
/**
 * convert_html_to_php.php - Automated HTML to PHP converter for Stargate Framework
 * Author: David (davestj)
 * Purpose: Convert existing HTML files to use header.php and footer.php structure
 * 
 * Run this script from command line: php convert_html_to_php.php
 */

// I'm creating a comprehensive conversion tool for your HTML files
class HTMLtoPHPConverter {
    private $files_to_convert = [
        'interactive_visualization',
        'metrics_feasability_dashboard',
        '3d_interactive_model',
        'wormhole_travel_dashboard',
        'presentation_builder',
        'executive_summary_generator'
    ];
    
    private $processed_files = [];
    private $errors = [];
    
    public function __construct() {
        echo "=================================\n";
        echo "Stargate Framework HTML to PHP Converter\n";
        echo "Author: David (davestj)\n";
        echo "=================================\n\n";
    }
    
    /**
     * Main conversion process
     */
    public function convert() {
        // Step 1: Check if all required files exist
        echo "Step 1: Checking for HTML files...\n";
        $this->checkFiles();
        
        // Step 2: Create backup directory
        echo "\nStep 2: Creating backups...\n";
        $this->createBackups();
        
        // Step 3: Extract CSS and JS from each file
        echo "\nStep 3: Extracting CSS and JavaScript...\n";
        $this->extractAssets();
        
        // Step 4: Convert HTML to PHP with includes
        echo "\nStep 4: Converting to PHP structure...\n";
        $this->convertToPhp();
        
        // Step 5: Create any missing directories
        echo "\nStep 5: Setting up directory structure...\n";
        $this->setupDirectories();
        
        // Step 6: Generate summary report
        echo "\nStep 6: Generating report...\n";
        $this->generateReport();
    }
    
    /**
     * Check if HTML files exist
     */
    private function checkFiles() {
        foreach ($this->files_to_convert as $file) {
            $html_file = $file . '.html';
            if (file_exists($html_file)) {
                echo "✓ Found: $html_file\n";
                $this->processed_files[$file] = ['exists' => true];
            } else {
                echo "✗ Missing: $html_file\n";
                $this->processed_files[$file] = ['exists' => false];
                $this->errors[] = "File not found: $html_file";
            }
        }
    }
    
    /**
     * Create backup directory and copy original files
     */
    private function createBackups() {
        $backup_dir = 'backup_' . date('Y-m-d_H-i-s');
        
        if (!is_dir($backup_dir)) {
            mkdir($backup_dir, 0755, true);
            echo "Created backup directory: $backup_dir\n";
        }
        
        foreach ($this->processed_files as $file => $info) {
            if ($info['exists']) {
                $source = $file . '.html';
                $dest = $backup_dir . '/' . $source;
                
                if (copy($source, $dest)) {
                    echo "✓ Backed up: $source\n";
                } else {
                    echo "✗ Failed to backup: $source\n";
                    $this->errors[] = "Backup failed: $source";
                }
            }
        }
    }
    
    /**
     * Extract CSS and JavaScript from HTML files
     */
    private function extractAssets() {
        // Ensure directories exist
        if (!is_dir('css')) mkdir('css', 0755, true);
        if (!is_dir('js')) mkdir('js', 0755, true);
        
        foreach ($this->processed_files as $file => $info) {
            if (!$info['exists']) continue;
            
            $html_content = file_get_contents($file . '.html');
            
            // Extract CSS
            $css_extracted = $this->extractCSS($html_content, $file);
            if ($css_extracted) {
                echo "✓ Extracted CSS: css/$file.css\n";
            }
            
            // Extract JavaScript
            $js_extracted = $this->extractJS($html_content, $file);
            if ($js_extracted) {
                echo "✓ Extracted JS: js/$file.js\n";
            }
            
            $this->processed_files[$file]['css_extracted'] = $css_extracted;
            $this->processed_files[$file]['js_extracted'] = $js_extracted;
        }
    }
    
    /**
     * Extract CSS from HTML content
     */
    private function extractCSS($html_content, $filename) {
        $css_content = '';
        
        // Find all <style> tags
        preg_match_all('/<style[^>]*>(.*?)<\/style>/is', $html_content, $matches);
        
        if (!empty($matches[1])) {
            // Add file header comment
            $css_content = "/**\n";
            $css_content .= " * $filename.css - Extracted styles for $filename\n";
            $css_content .= " * Author: David (davestj)\n";
            $css_content .= " * Extracted on: " . date('Y-m-d H:i:s') . "\n";
            $css_content .= " */\n\n";
            
            // Combine all CSS
            foreach ($matches[1] as $css) {
                $css_content .= trim($css) . "\n\n";
            }
            
            // Write to file
            file_put_contents("css/$filename.css", $css_content);
            return true;
        }
        
        return false;
    }
    
    /**
     * Extract JavaScript from HTML content
     */
    private function extractJS($html_content, $filename) {
        $js_content = '';
        
        // Find all <script> tags (excluding external scripts)
        preg_match_all('/<script(?![^>]*src=)[^>]*>(.*?)<\/script>/is', $html_content, $matches);
        
        if (!empty($matches[1])) {
            // Add file header comment
            $js_content = "/**\n";
            $js_content .= " * $filename.js - Extracted JavaScript for $filename\n";
            $js_content .= " * Author: David (davestj)\n";
            $js_content .= " * Extracted on: " . date('Y-m-d H:i:s') . "\n";
            $js_content .= " */\n\n";
            
            // Combine all JavaScript
            foreach ($matches[1] as $js) {
                $js_content .= trim($js) . "\n\n";
            }
            
            // Write to file
            file_put_contents("js/$filename.js", $js_content);
            return true;
        }
        
        return false;
    }
    
    /**
     * Convert HTML files to PHP with header/footer includes
     */
    private function convertToPhp() {
        foreach ($this->processed_files as $file => $info) {
            if (!$info['exists']) continue;
            
            $html_content = file_get_contents($file . '.html');
            
            // Extract body content
            $body_content = $this->extractBodyContent($html_content);
            
            // Extract page title
            $page_title = $this->extractPageTitle($html_content);
            
            // Create PHP file content
            $php_content = "<?php\n";
            $php_content .= "/**\n";
            $php_content .= " * $file.php - " . ucwords(str_replace('_', ' ', $file)) . "\n";
            $php_content .= " * Author: David (davestj)\n";
            $php_content .= " * Converted from HTML on: " . date('Y-m-d H:i:s') . "\n";
            $php_content .= " */\n\n";
            $php_content .= "// Include the header\n";
            $php_content .= "require_once 'header.php';\n";
            $php_content .= "?>\n\n";
            
            // Add body content (cleaned up)
            $php_content .= $this->cleanupBodyContent($body_content, $file);
            
            $php_content .= "\n<?php\n";
            $php_content .= "// Include the footer\n";
            $php_content .= "require_once 'footer.php';\n";
            $php_content .= "?>";
            
            // Write PHP file
            $php_filename = $file . '.php';
            if (file_put_contents($php_filename, $php_content)) {
                echo "✓ Created: $php_filename\n";
                $this->processed_files[$file]['converted'] = true;
                
                // Optionally remove original HTML file
                // unlink($file . '.html');
            } else {
                echo "✗ Failed to create: $php_filename\n";
                $this->errors[] = "Conversion failed: $php_filename";
            }
        }
    }
    
    /**
     * Extract content between <body> tags
     */
    private function extractBodyContent($html) {
        // Match content between body tags
        if (preg_match('/<body[^>]*>(.*?)<\/body>/is', $html, $matches)) {
            return $matches[1];
        }
        
        // If no body tags found, return everything after <html>
        if (preg_match('/<html[^>]*>(.*?)<\/html>/is', $html, $matches)) {
            return $matches[1];
        }
        
        // Last resort - return everything
        return $html;
    }
    
    /**
     * Extract page title from HTML
     */
    private function extractPageTitle($html) {
        if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $matches)) {
            return trim($matches[1]);
        }
        return 'Stargate Framework';
    }
    
    /**
     * Clean up body content - remove script and style tags
     */
    private function cleanupBodyContent($content, $filename) {
        // Remove <style> tags (CSS already extracted)
        $content = preg_replace('/<style[^>]*>.*?<\/style>/is', '', $content);
        
        // Remove <script> tags (JS already extracted)
        $content = preg_replace('/<script(?![^>]*src=)[^>]*>.*?<\/script>/is', '', $content);
        
        // Remove empty lines
        $content = preg_replace('/^\s*[\r\n]/m', '', $content);
        
        // Add page-specific comment
        $comment = "<!-- Main content for $filename -->\n";
        
        return $comment . trim($content);
    }
    
    /**
     * Setup directory structure
     */
    private function setupDirectories() {
        $directories = ['css', 'js', 'img', 'img/diagrams'];
        
        foreach ($directories as $dir) {
            if (!is_dir($dir)) {
                if (mkdir($dir, 0755, true)) {
                    echo "✓ Created directory: $dir\n";
                } else {
                    echo "✗ Failed to create: $dir\n";
                    $this->errors[] = "Directory creation failed: $dir";
                }
            } else {
                echo "✓ Directory exists: $dir\n";
            }
        }
    }
    
    /**
     * Generate conversion report
     */
    private function generateReport() {
        $report = "=================================\n";
        $report .= "CONVERSION REPORT\n";
        $report .= "=================================\n\n";
        
        $report .= "Files Processed:\n";
        foreach ($this->processed_files as $file => $info) {
            $status = isset($info['converted']) && $info['converted'] ? '✓' : '✗';
            $report .= "$status $file\n";
        }
        
        if (!empty($this->errors)) {
            $report .= "\nErrors Encountered:\n";
            foreach ($this->errors as $error) {
                $report .= "- $error\n";
            }
        }
        
        $report .= "\nNext Steps:\n";
        $report .= "1. Review the generated PHP files\n";
        $report .= "2. Test each page for functionality\n";
        $report .= "3. Check CSS and JS files for completeness\n";
        $report .= "4. Delete backup directory once verified\n";
        $report .= "5. Update any internal links from .html to .php\n";
        
        // Save report
        file_put_contents('conversion_report.txt', $report);
        
        echo "\n$report";
        echo "\nReport saved to: conversion_report.txt\n";
    }
}

// Run the converter
try {
    $converter = new HTMLtoPHPConverter();
    $converter->convert();
    
    echo "\n✅ Conversion complete!\n";
    echo "Remember to test all pages thoroughly before removing backups.\n";
    
} catch (Exception $e) {
    echo "\n❌ Error during conversion: " . $e->getMessage() . "\n";
    echo "Please check the error and try again.\n";
}
?>
