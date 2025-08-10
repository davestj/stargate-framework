/**
 * main.js - Shared JavaScript functionality for Stargate Framework
 * Author: David (davestj)
 * Purpose: Common functions and utilities used across all pages
 */

// I'm initializing the main JavaScript functionality when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initPageTransitions();
    checkScreenSize();
});

/**
 * Mobile menu toggle functionality
 * This handles the hamburger menu for tablet and mobile devices
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

/**
 * Smooth scrolling for anchor links
 * This improves navigation within long documents
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-navigation').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Page transition effects
 * Adds subtle animations when navigating between pages
 */
function initPageTransitions() {
    // Add fade-in effect to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

/**
 * Check screen size and adjust layouts
 * This ensures optimal display on MacBook 15" and larger screens
 */
function checkScreenSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Log screen dimensions for debugging
    console.log(`Screen dimensions: ${screenWidth}x${screenHeight}`);
    
    // MacBook 15" optimization (1440x900 or higher)
    if (screenWidth >= 1440) {
        document.body.classList.add('large-screen');
        
        // Adjust font sizes for better readability
        if (screenWidth >= 2560) {
            // 4K display optimization
            document.body.classList.add('ultra-hd');
        }
    }
    
    // Handle orientation changes
    window.addEventListener('resize', debounce(function() {
        const newWidth = window.innerWidth;
        if (newWidth >= 1440 && !document.body.classList.contains('large-screen')) {
            document.body.classList.add('large-screen');
        } else if (newWidth < 1440 && document.body.classList.contains('large-screen')) {
            document.body.classList.remove('large-screen');
        }
    }, 250));
}

/**
 * Utility function: Debounce
 * Prevents functions from firing too frequently
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility function: Format numbers with commas
 * Used for displaying large numbers in metrics
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Utility function: Copy to clipboard
 * Allows users to copy code snippets or data
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show notification messages
 * Used for user feedback throughout the application
 */
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Add loading state to buttons
 * Used during async operations
 */
function setButtonLoading(button, isLoading = true) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.innerHTML = '<span class="loading"></span> Loading...';
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || 'Submit';
    }
}

/**
 * Check if element is in viewport
 * Used for lazy loading and animations
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Initialize lazy loading for images
 * Improves page load performance
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Export utility functions for use in other scripts
window.StargateUtils = {
    formatNumber,
    copyToClipboard,
    showNotification,
    setButtonLoading,
    isInViewport,
    debounce
};

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
