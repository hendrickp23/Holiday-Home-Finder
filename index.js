const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
	document.body.classList.toggle('nav-open');
});

navLinks.forEach((link) => {
	link.addEventListener('click', () => {
		document.body.classList.remove('nav-open');
	});
});

let map, infoWindow;
let markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 40.712776, lng: -74.005974 },
		zoom: 10,
	});
	infoWindow = new google.maps.InfoWindow();
	const locationButton = document.createElement('button');
	locationButton.textContent = 'Pan to Current Location';
	locationButton.classList.add('custom-map-control-button');
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
	locationButton.addEventListener('click', () => {
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					infoWindow.setPosition(pos);
					infoWindow.setContent('Location found.');
					infoWindow.open(map);
					map.setCenter(pos);
				},
				() => {
					handleLocationError(true, infoWindow, map.getCenter());
				}
			);
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter());
		}
	});
	// This event listener will call addMarker() when the map is clicked.
	map.addListener('click', (event) => {
		addMarker(event.latLng);
	});
	// Adds a marker at the center of the map.
	addMarker(haightAshbury);

	// Adds a marker to the map and push to the array.
	function addMarker(location) {
		const marker = new google.maps.Marker({
			position: location,
			map: map,
		});
		markers.push(marker);
	}

	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
		for (let i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
		setMapOnAll(null);
	}

	// Shows any markers currently in the array.
	function showMarkers() {
		setMapOnAll(map);
	}

	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
		clearMarkers();
		markers = [];
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(
			browserHasGeolocation
				? 'Error: The Geolocation service failed.'
				: "Error: Your browser doesn't support geolocation."
		);
		infoWindow.open(map);
	}
}

async;
defer;
src =
	'https://maps.googleapis.com/maps/api/js?key=AIzaSyDlZXovONgrv5eodZGXq8tAKhUOlpOPOvk&callback=initMap';
type = 'text/javascript';
