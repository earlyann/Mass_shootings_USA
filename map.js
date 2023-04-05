// Initialize the map
var map = L.map('map').setView([39.50, -98.35], 4); // Set the center to the United States

// Add a base map layer (DarkMatter)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);


// Load the GeoJSON data using D3.js
d3.json("data/data.geojson").then(data => {
    // Log data to console to view while building out code
    // console.log(data);
    // Create a GeoJSON layer with custom hover info
    L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
            const victims = feature.properties.total_victims;
            const markerRadius = Math.sqrt(victims) * 2; // You can adjust the scaling factor (5 in this case) to get the desired marker size

            return L.circleMarker(latlng, {
                radius: markerRadius,
                fillColor: "#FF4500",
                color: "#000",
                weight: .05,
                opacity: 0.5,
                fillOpacity: 0.5
            });
        },
        onEachFeature: (feature, layer) => {
            const properties = feature.properties;
            const popupContent = `
                <strong>Case:</strong> ${properties.case}<br>
                <strong>Year:</strong> ${properties.year}<br>
                <strong>Age of Shooter:</strong> ${properties.age_of_shooter}<br>
                <strong>Gender:</strong> ${properties.gender}<br>
                <strong>Type:</strong> ${properties.type}<br>
                <strong>Weapon Type:</strong> ${properties.weapon_type}<br>
                <strong>Total Victims:</strong> ${properties.total_victims}
    `;

    layer.bindPopup(popupContent);
    layer.on('mouseover', (e) => e.target.openPopup());
    layer.on('mouseout', (e) => e.target.closePopup());
}
    }).addTo(map);
}).catch(error => console.error('Error loading GeoJSON:', error));



