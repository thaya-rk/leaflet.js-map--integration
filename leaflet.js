// External dataset with additional details
const externalDataset = [
  { state: 'Jharkhand', district: 'Hazaribagh', mineName: 'Rohne', lat: 23.7416667, lon: 85.26666667, area: 45.7621, revenue: 8, details: '20' },
  { state: 'Jharkhand', district: 'Ramgarh/Hazaribagh', mineName: 'Rabodih OCP', lat: 23.727778, lon: 85.409167, area: 22.49, revenue: 10, details: '40' },
  { state: 'Jharkhand', district: 'Ramgarh', mineName: 'Jogeshwar & Khas Jogeshwar', lat: 23.758567, lon: 85.591373, area: 2.66, revenue: 84.03, details: '50' },
  { state: 'Odisha', district: 'Angul', mineName: 'Talcher Coalfield', lat: 20.951542, lon: 85.215668, area: 1800, revenue: 148.01, details: '90' },
  { state: 'Odisha', district: 'Angul', mineName: 'Bhubaneswari OCP', lat: 20.962009, lon: 85.178092, area: 15, revenue: 20, details: '100' },
  { state: 'Odisha', district: 'Angul', mineName: 'Hirakud OCP', lat: 20.35, lon: 86.56, area: 7.2, revenue: 40, details: '25' },
  { state: 'Odisha', district: 'Jharsuguda', mineName: 'Ib Valley OCP', lat: 21.85, lon: 83.933333, area: 1375, revenue: 80, details: '30' },
  { state: 'Odisha', district: 'Angul', mineName: 'Lepri OCP', lat: 20.63, lon: 86.8146, area: 51.37, revenue: 79.5, details: '85' },
  { state: 'Chattisgarh', district: 'Korba', mineName: 'Gevra OC', lat: 22.3382, lon: 82.546, area: 41.84, revenue: 50, details: '50' }
];

// Add external dataset to the coords array
const coords = externalDataset.map(({ lat, lon, area }) => ({ lat, lon, area }));

// Your existing Leaflet code
var map = L.map('map').setView([27.616, 74.806], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var markers = [];

for (let i = 0; i < coords.length; i++) {
  var marker = L.marker([coords[i].lat, coords[i].lon]).addTo(map);

  // Add a popup to the marker with information
  marker.bindPopup(`
    <b>State:</b> ${externalDataset[i].state}<br>
    <b>District:</b> ${externalDataset[i].district}<br>
    <b>Mine Name:</b> ${externalDataset[i].mineName}<br>
    <b>Latitude:</b> ${coords[i].lat}<br>
    <b>Longitude:</b> ${coords[i].lon}<br>
    <b>Area:</b> ${coords[i].area}<br>
    <b>Revenue:</b> ${externalDataset[i].revenue}<br>
    <b>Details:</b> ${externalDataset[i].details}
  `);

  // Save the marker object in an array
  markers.push(marker);

  // Open the popup when hovering over the marker
  marker.on('mouseover', function () {
    this.openPopup();
    zoomLess([coords[i].lat, coords[i].lon]);
  });

  // Close the popup when the mouse leaves the marker
  marker.on('mouseout', function () {
    this.closePopup();
  });

  // Attach a click event to show details when the marker is clicked
  marker.on('click', function () {
    showMarkerDetails(i);
  });
}

function showMarkerDetails(markerIndex) {
  var selectedMarker = markers[markerIndex];
  var selectedCoords = coords[markerIndex];
  var detailsContainer = document.getElementById('markerDetails');

  // Clear existing details
  detailsContainer.innerHTML = '';

  // Show additional details in the details container
  detailsContainer.innerHTML += `<p><b>State:</b> ${externalDataset[markerIndex].state}</p>`;
  detailsContainer.innerHTML += `<p><b>District:</b> ${externalDataset[markerIndex].district}</p>`;
  detailsContainer.innerHTML += `<p><b>Mine Name:</b> ${externalDataset[markerIndex].mineName}</p>`;
  detailsContainer.innerHTML += `<p><b>Latitude:</b> ${selectedCoords.lat}</p>`;
  detailsContainer.innerHTML += `<p><b>Longitude:</b> ${selectedCoords.lon}</p>`;
  detailsContainer.innerHTML += `<p><b>Area:</b> ${selectedCoords.area}</p>`;
  detailsContainer.innerHTML += `<p><b>Revenue:</b> ${externalDataset[markerIndex].revenue}</p>`;
  detailsContainer.innerHTML += `<p><b>Details:</b> ${externalDataset[markerIndex].details}</p>`;
}
