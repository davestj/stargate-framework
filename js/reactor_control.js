/**
 * reactor_control.js - Client-side logic for Reactor Control Dashboard
 * Handles REST API polling and optional WebSocket updates.
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchAll();
    // Poll metrics periodically as a fallback
    setInterval(fetchMetrics, 5000);
    initWebSocket();
});

async function fetchAll() {
    fetchHealth();
    fetchStatus();
    fetchMetrics();
}

async function fetchHealth() {
    try {
        const res = await fetch('/api/v1/health');
        const data = await res.json();
        document.getElementById('health-value').textContent = data.health || 'unknown';
    } catch (err) {
        console.error('Health fetch failed', err);
    }
}

async function fetchStatus() {
    try {
        const res = await fetch('/api/v1/status');
        const data = await res.json();
        document.getElementById('status-value').textContent = data.status || 'unknown';
    } catch (err) {
        console.error('Status fetch failed', err);
    }
}

async function fetchMetrics() {
    try {
        const res = await fetch('/api/v1/metrics');
        const data = await res.json();
        updateMetrics(data);
    } catch (err) {
        console.error('Metrics fetch failed', err);
    }
}

function updateMetrics(data) {
    if (!data) return;
    if (data.cpu !== undefined) {
        document.getElementById('cpu-usage').textContent = `${data.cpu}%`;
    }
    if (data.memory !== undefined) {
        document.getElementById('memory-usage').textContent = `${data.memory} MB`;
    }
    if (data.event_rate !== undefined) {
        document.getElementById('event-rate').textContent = `${data.event_rate} /s`;
    }
}

function initWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${protocol}://${window.location.host}/ws/reactor`;
    try {
        const ws = new WebSocket(wsUrl);
        ws.onmessage = event => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'metrics') {
                    updateMetrics(data.payload);
                }
                if (data.type === 'health') {
                    document.getElementById('health-value').textContent = data.payload;
                }
                if (data.type === 'status') {
                    document.getElementById('status-value').textContent = data.payload;
                }
            } catch (e) {
                console.warn('Invalid WS data', e);
            }
        };
        ws.onopen = () => console.log('WebSocket connected');
        ws.onerror = err => console.error('WebSocket error', err);
    } catch (e) {
        console.warn('WebSocket not available', e);
    }
}
