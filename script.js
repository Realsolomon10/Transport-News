document.addEventListener('DOMContentLoaded', () => {
    // Update live clock
    const timeDisplay = document.getElementById('current-time');
    
    function updateTime() {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    
    setInterval(updateTime, 1000);
    updateTime();

    // Generate dynamic times based on current time to make the demo realistic
    const now = new Date();
    
    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    
    function formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }

    // Bus Data
    const buses = [
        {
            id: 'l1',
            line: 'L1',
            destination: 'Faches-Thumesnil',
            direction: 'Southbound',
            departures: [
                { time: '1 Min', status: 'approaching', label: 'Approaching' },
                { time: formatTime(addMinutes(now, 12)), status: 'ontime', label: 'On Time' },
                { time: formatTime(addMinutes(now, 27)), status: 'ontime', label: 'On Time' }
            ]
        },
        {
            id: 'l5',
            line: 'L5',
            destination: 'Haubourdin',
            direction: 'Westbound',
            departures: [
                { time: formatTime(addMinutes(now, 4)), status: 'delayed', label: 'Delayed (+5m)' },
                { time: formatTime(addMinutes(now, 19)), status: 'ontime', label: 'On Time' },
                { time: formatTime(addMinutes(now, 34)), status: 'ontime', label: 'On Time' }
            ]
        },
        {
            id: 'l90',
            line: 'L90',
            destination: 'Lille Europe',
            direction: 'City Center',
            departures: [
                { time: '2 Min', status: 'approaching', label: 'Approaching' },
                { time: formatTime(addMinutes(now, 20)), status: 'ontime', label: 'On Time' },
                { time: formatTime(addMinutes(now, 40)), status: 'ontime', label: 'On Time' }
            ]
        },
        {
            id: 'citl',
            line: 'CITL',
            destination: 'Porte des Postes',
            direction: 'Circular',
            departures: [
                { time: formatTime(addMinutes(now, 7)), status: 'ontime', label: 'On Time' },
                { time: formatTime(addMinutes(now, 17)), status: 'ontime', label: 'On Time' },
                { time: formatTime(addMinutes(now, 27)), status: 'ontime', label: 'On Time' }
            ]
        },
        {
            id: 'l14',
            line: '14',
            destination: 'Wattignies',
            direction: 'Southbound',
            departures: [
                { time: formatTime(addMinutes(now, 9)), status: 'ontime', label: 'On Time' },
                { time: formatTime(addMinutes(now, 29)), status: 'ontime', label: 'On Time' },
                { time: formatTime(addMinutes(now, 49)), status: 'ontime', label: 'On Time' }
            ]
        }
    ];

    const busGrid = document.getElementById('bus-grid');

    // Render bus cards
    buses.forEach(bus => {
        const card = document.createElement('div');
        card.className = 'bus-card';
        
        let departuresHTML = '';
        bus.departures.forEach(dep => {
            departuresHTML += `
                <div class="departure-item">
                    <span class="departure-time">${dep.time}</span>
                    <span class="departure-status status-${dep.status}">${dep.label}</span>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="bus-header">
                <div class="bus-line ${bus.id}">${bus.line}</div>
                <div class="bus-info">
                    <h2>${bus.destination}</h2>
                    <p>${bus.direction}</p>
                </div>
            </div>
            <div class="departures">
                ${departuresHTML}
            </div>
        `;
        
        busGrid.appendChild(card);
    });
});
