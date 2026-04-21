var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Handler per aggiungere monumento dalla form
document.addEventListener('DOMContentLoaded', function () {
    const btnAdd = document.getElementById('btnAddMonumento');
    const btnShow = document.getElementById('btnShowStats');

    if (btnAdd) {
        btnAdd.addEventListener('click', function () {
            const nome = document.getElementById('nomeMonumento').value.trim();
            const latVal = document.getElementById('latMonumento').value;
            const lngVal = document.getElementById('lngMonumento').value;

            const lat = parseFloat(latVal);
            const lng = parseFloat(lngVal);

            if (isNaN(lat) || isNaN(lng)) {
                alert('Inserisci latitudine e longitudine valide.');
                return;
            }

            const monumento = {
                nome: nome || 'Monumento senza nome',
                lat: lat,
                lng: lng
            };

            // Aggiungi marker sulla mappa (usa Leaflet)
            if (typeof L !== 'undefined' && typeof map !== 'undefined') {
                const marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup(monumento.nome);
            } else {
                console.warn('Mappa non disponibile: il marker non è stato aggiunto visivamente.');
            }

            // Aggiungi nell'array tramite la funzione definita in monumenti.js
            if (typeof aggiungiMonumentoArray === 'function') {
                aggiungiMonumentoArray(monumento);
            } else if (window.monumenti) {
                // fallback: aggiunta diretta
                window.monumenti.push(monumento);
            }

            // Pulizia form minima
            document.getElementById('nomeMonumento').value = '';
            document.getElementById('latMonumento').value = '';
            document.getElementById('lngMonumento').value = '';
        });
    }

    if (btnShow) {
        btnShow.addEventListener('click', function () {
            // Mostra statistiche SOLO al click
            if (typeof mostraStatisticheMonumenti === 'function') {
                mostraStatisticheMonumenti();
            } else {
                console.warn('mostraStatisticheMonumenti() non è definita.');
            }
        });
    }
});