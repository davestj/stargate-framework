/**
 * metrics_feasability_dashboard.js - Extracted JavaScript for metrics_feasability_dashboard
 * Author: David (davestj)
 * Extracted on: 2025-07-25 21:40:15
 */

// dashboard.js - Interactive metrics and calculations
        
        // Initialize dashboard when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // I'm setting up all the interactive elements and charts
            initializeCharts();
            setupCalculator();
            animateProgressBars();
            updateMetrics();
        });
        
        function initializeCharts() {
            // Energy Requirements Chart
            const energyCtx = document.getElementById('energy-chart');
            if (energyCtx) {
                drawEnergyChart(energyCtx.getContext('2d'));
            }
            
            // Market Opportunity Chart
            const marketCtx = document.getElementById('market-chart');
            if (marketCtx) {
                drawMarketChart(marketCtx.getContext('2d'));
            }
        }
        
        function drawEnergyChart(ctx) {
            const canvas = ctx.canvas;
            const width = canvas.width = canvas.offsetWidth * 2;
            const height = canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Chart data
            const data = [
                { phase: 'Initialization', energy: 12.5, color: '#e74c3c' },
                { phase: 'Stabilization', energy: 8.3, color: '#f39c12' },
                { phase: 'Transit', energy: 2.3, color: '#2ecc71' },
                { phase: 'Arrival', energy: 4.1, color: '#3498db' }
            ];
            
            // Calculate dimensions
            const padding = 40;
            const chartWidth = canvas.offsetWidth - padding * 2;
            const chartHeight = canvas.offsetHeight - padding * 2;
            const barWidth = chartWidth / data.length * 0.6;
            const maxEnergy = Math.max(...data.map(d => d.energy));
            
            // Draw axes
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, canvas.offsetHeight - padding);
            ctx.lineTo(canvas.offsetWidth - padding, canvas.offsetHeight - padding);
            ctx.stroke();
            
            // Draw bars
            data.forEach((item, index) => {
                const x = padding + (index * chartWidth / data.length) + (chartWidth / data.length - barWidth) / 2;
                const barHeight = (item.energy / maxEnergy) * chartHeight;
                const y = canvas.offsetHeight - padding - barHeight;
                
                // Bar
                ctx.fillStyle = item.color;
                ctx.fillRect(x, y, barWidth, barHeight);
                
                // Value label
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(item.energy + ' TW', x + barWidth / 2, y - 10);
                
                // Phase label
                ctx.font = '12px Arial';
                ctx.fillText(item.phase, x + barWidth / 2, canvas.offsetHeight - padding + 20);
            });
            
            // Y-axis labels
            ctx.fillStyle = '#7f8c8d';
            ctx.font = '11px Arial';
            ctx.textAlign = 'right';
            for (let i = 0; i <= 5; i++) {
                const y = canvas.offsetHeight - padding - (i * chartHeight / 5);
                const value = (maxEnergy * i / 5).toFixed(1);
                ctx.fillText(value + ' TW', padding - 10, y + 4);
            }
        }
        
        function drawMarketChart(ctx) {
            const canvas = ctx.canvas;
            const width = canvas.width = canvas.offsetWidth * 2;
            const height = canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Pie chart data
            const data = [
                { label: 'Space Logistics', value: 450, color: '#3498db' },
                { label: 'Mining', value: 1200, color: '#2ecc71' },
                { label: 'Tourism', value: 85, color: '#f39c12' },
                { label: 'Research', value: 230, color: '#9b59b6' }
            ];
            
            const total = data.reduce((sum, item) => sum + item.value, 0);
            const centerX = canvas.offsetWidth / 2;
            const centerY = canvas.offsetHeight / 2;
            const radius = Math.min(centerX, centerY) - 40;
            
            let currentAngle = -Math.PI / 2;
            
            // Draw pie slices
            data.forEach((item, index) => {
                const sliceAngle = (item.value / total) * Math.PI * 2;
                
                // Draw slice
                ctx.fillStyle = item.color;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fill();
                
                // Draw label
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText((item.value / total * 100).toFixed(0) + '%', labelX, labelY);
                
                currentAngle += sliceAngle;
            });
            
            // Draw center circle
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            // Total market value
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('$' + (total / 1000).toFixed(1) + 'T', centerX, centerY);
            ctx.font = '12px Arial';
            ctx.fillText('Total Market', centerX, centerY + 18);
        }
        
        function setupCalculator() {
            // I'm setting up the ROI calculator with real-time updates
            const inputs = ['cargo-capacity', 'current-cost', 'transits-per-year'];
            
            inputs.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    input.addEventListener('input', calculateROI);
                }
            });
            
            // Initial calculation
            calculateROI();
        }
        
        function calculateROI() {
            const capacity = parseFloat(document.getElementById('cargo-capacity').value) || 1000;
            const currentCost = parseFloat(document.getElementById('current-cost').value) || 50000;
            const transits = parseFloat(document.getElementById('transits-per-year').value) || 100;
            
            // Calculate revenue (assuming we charge 10% of current cost)
            const ourCostPerKg = currentCost * 0.1;
            const revenuePerTransit = capacity * 1000 * ourCostPerKg;
            const annualRevenue = revenuePerTransit * transits;
            
            // Calculate break-even
            const totalInvestment = 8700000000; // $8.7B
            const operatingMargin = 0.6; // 60% margin
            const netAnnualRevenue = annualRevenue * operatingMargin;
            const breakEvenYears = totalInvestment / netAnnualRevenue;
            
            // Update display
            document.getElementById('annual-revenue').textContent = '$' + (annualRevenue / 1000000000).toFixed(1) + 'B';
            document.getElementById('break-even').textContent = breakEvenYears.toFixed(1);
        }
        
        function animateProgressBars() {
            // I'm animating the progress bars on page load
            const progressBars = document.querySelectorAll('.progress-fill');
            
            progressBars.forEach((bar, index) => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100 + index * 100);
            });
        }
        
        function updateMetrics() {
            // Simulate real-time metric updates
            setInterval(() => {
                // Update energy requirement with small fluctuation
                const energyElement = document.getElementById('energy-requirement');
                if (energyElement) {
                    const baseValue = 12.5;
                    const fluctuation = (Math.random() - 0.5) * 0.2;
                    energyElement.textContent = (baseValue + fluctuation).toFixed(1) + ' TW';
                }
                
                // Update efficiency
                const efficiencyElement = document.getElementById('efficiency');
                if (efficiencyElement) {
                    const baseEfficiency = 87;
                    const fluctuation = (Math.random() - 0.5) * 2;
                    efficiencyElement.textContent = Math.floor(baseEfficiency + fluctuation) + '%';
                }
            }, 3000);
        }
        
        // Export data functionality for reports
        window.exportDashboardData = function() {
            const data = {
                timestamp: new Date().toISOString(),
                metrics: {
                    energyRequirement: document.getElementById('energy-requirement').textContent,
                    totalInvestment: document.getElementById('total-investment').textContent,
                    timeToPrototype: document.getElementById('time-to-prototype').textContent,
                    efficiency: document.getElementById('efficiency').textContent
                },
                calculator: {
                    cargoCapacity: document.getElementById('cargo-capacity').value,
                    currentCost: document.getElementById('current-cost').value,
                    transitsPerYear: document.getElementById('transits-per-year').value,
                    annualRevenue: document.getElementById('annual-revenue').textContent,
                    breakEven: document.getElementById('break-even').textContent
                }
            };
            
            console.log('Dashboard Data Export:', data);
            return data;
        };

