/*Crea il file monumenti.js dove sono presenti due funzioni.
La funzione aggiungiMonumenti(mappa) che prende in ingresso il riferimento della mappa e aggiunge determinati monumenti di Roma sulla mappa utilizzando dei marker.
I monumenti sono presi da un array di oggetti con latitudine e longitudine definiti in maniera globale. Farsi aiutare dall'intelligenza artificiale.
Inoltre è presente la funzione mostraStatisticheMonumenti() che mostra un alert con il numero di monumenti mostrati sulla mappa (cioè la dimensione dell'array di oggetti)
ATTENZIONE: Nel file monumenti.js è presente solo l'array di oggetti e le due funzioni. Nulla di più. */

// Inizializzazione Mappa (se non presente nell'HTML)
var map = L.map('map').setView([41.8902, 12.4922], 13);
L.tileLayer('https://openstreetmap.org{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Dati
const monumenti = [
    { nome: "Colosseo", lat: 41.8902, lng: 12.4922 },
    { nome: "Fontana di Trevi", lat: 41.9009, lng: 12.4833 },
    { nome: "Pantheon", lat: 41.8986, lng: 12.4769 }
];

function ottieniListaMonumenti() {
    return monumenti;
}

// Event Listener per creare la tabella
document.getElementById('btn-crea-tabella').addEventListener('click', () => {
    const lista = ottieniListaMonumenti();
    const container = document.getElementById('container-tabella');

    // Pulizia vecchio contenuto
    container.innerHTML = '';

    const tabella = document.createElement('table');
    tabella.className = 'tabella-monumenti';

    lista.forEach((monumento, index) => {
        const riga = tabella.insertRow();

        const cellaIndex = riga.insertCell(0);
        cellaIndex.textContent = index + 1;

        const cellaLat = riga.insertCell(1);
        cellaLat.textContent = monumento.lat;

        const cellaLng = riga.insertCell(2);
        cellaLng.textContent = monumento.lng;
    });

    container.appendChild(tabella);
});

// Se l'array non esiste già, lo definiamo:
window.monumenti = window.monumenti || [];

/**
 * Aggiunge un monumento all'array globale `monumenti`.
 * monumento: { nome?: string, lat: number, lng: number, ... }
 * restituisce l'array aggiornato.
 */
function aggiungiMonumentoArray(monumento) {
    if (!monumento || typeof monumento.lat !== 'number' || typeof monumento.lng !== 'number') {
        console.warn('Monumento non valido passato ad aggiungiMonumentoArray:', monumento);
        return window.monumenti;
    }
    window.monumenti.push(monumento);
    return window.monumenti;
}
