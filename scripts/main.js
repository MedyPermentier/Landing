function weerData() {

	// construct request
	var request = "https://api.openweathermap.org/data/2.5/weather?appid=948e98212b9ec7261ce53328ed8bbe2f&q=Maastricht,nl";

	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		//console.log(response);

		var plaats = response.name; //plaats ophalen
		var minT = Math.floor(response.main.temp_min - 273.15); // minimun tempratuur in graden celcius ophalen
		var maxT = Math.floor(response.main.temp_max - 273.15); // maximun tempratuur in graden celcius ophalen
		var tempratuur = Math.floor(response.main.temp - 273.15); // actuele tempratuur in graden celcius ophalen
		var wind = response.wind.speed; // actuele windsnelheid ophalen
		var melding = document.getElementById('melding'); // pak het id 'melding' uit de html code
		
		var box1 = document.getElementById('plaats'); // haal het id 'plaats' op
		box1.innerHTML = plaats; // en zet daar de plaatsnaam in, Maastricht

		var box2 = document.getElementById('minmax'); // haal het id 'minmax' op 
		box2.innerHTML = "Min " + minT + "&#176;C <br>" + "Max " + maxT + "&#176;C"; // en zet daar de minimum en maximum tempratuur 

		var box3 = document.getElementById('tempratuur'); // haal het id 'tempratuur' op
		box3.innerHTML = tempratuur + "&#176;C"; // en zet daar de actuele tempratuur in graden celcius in

		var box4 = document.getElementById('wind'); // haal het id 'wind' op
		box4.innerHTML = "Windsnelheid: " + wind + " m/s"; // en zet daar de actuele windsnelehid in met m/s erachter

		if (wind >= 8) { // als de windsnelheid harder is dan 8 m/s
			document.getElementById('melding').innerHTML = "Op dit moment waait is het niet veilig om te landen en om te fietsen"; // laat dan deze melding zien dat je niet mag landen
		}

		else { // in alle andere gevallen 
			document.getElementById('melding').innerHTML = "Met een windsnelheid van " + wind + " m/s is het veilig om te landen en kun je heerlijk door Maastricht fietsen!"; // laat dan deze melding zien dat het veilig is om te landen
		}
	})
	
	// catch error
	.catch(function (error) {
		console.error('Request failed', error);
	});
}

function fietsData() {

	// construct request
	var request = 'https://api.citybik.es/v2/networks/nextbike-maastricht';

	// get current weather
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render free city bikes
	.then(function(response) {
		// console.log(response);

		var plaats = response.network.stations[9].name; // haal de plaatsnaam op
		var aantal = response.network.stations[9].free_bikes; // haal het actuele aantal vrije fietsen op
	
		if (aantal > 0) { // als er meer dan 0 fietsen zijn
			document.getElementById('aantal').innerHTML = "In " + plaats + " zijn er op dit moment " + aantal + " fietsen te huur."; // laat dan deze melding zien
		}

		else { // in alle andere gevallen
			document.getElementById('aantal').innerHTML = "Op dit moment zijn er helaas geen fietsen te huur"; // laat dan deze melding zien
		}
	})

	.catch(function (error) {
		console.error('Request failed', error);
	});
};

// animatie van de melding of het wel of niet veilig is om te landen
var tlm = new TimelineMax(); // Creeeren van een TimelineMax (Tweenmax) variabele

tlm.from(melding, 2, {opacity:0, scale:0.5, y: 100, ease:Back.easeOut}); // animatie van de melding

// Voer deze functies uit
weerData();
fietsData();