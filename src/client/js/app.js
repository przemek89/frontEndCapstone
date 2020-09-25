/* Global Variables */
let city;
const username = 'przemzbik';
let url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
const wheaterbitAPIKey = 'f47d98058eed419c8e975bd956377b49';
const pixabayAPIKey = '17804428-d164599a2217e2ac0e267fab4';

// calculate countdown till departure
function countdown(event) {
    let countdown = setInterval(function(){
        // Create a new date instance dynamically with JS
        let d = new Date().getTime();

        // Get departure date
        const departure = document.getElementById('departureDate');
        const departureDate = new Date(departure).getTime();

        // Calculate the time difference between departure time and current time
        let difference = departureDate - d;

        // Calculate days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update th UI
        countdownResult = document.getElementById('countdown')
        countdownResult.innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    })
}

// Async GET request to geonames
const getDataGeonames = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

// Async POST request to add a new data to the server
const postData = async (serverUrl = '', data = {}) => {
    const res = await fetch(serverUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await res.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
}

// async GET request to the server to get the most recent data and display it in the app
const updateUI = async () => {
    const response = await fetch('http://localhost:8000/getData', {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
    });

    try{
        const allData = await response.json();
        return allData;
    } catch(error) {
        console.log('error', error);
    }
}

// async GET request to Weatherbit
const getWeatherbit = async (weatherData)=>{
    const weatherbitAPIKey = 'f47d98058eed419c8e975bd956377b49';
    const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${weatherData.lat}&lon=${weatherData.lng}&key=${weatherbitAPIKey}`)

    try {
        const data = await res.json();
        return data;

    }   catch(error) {
        console.log("error", error);
    }
}

// async GET request to Pixabay
const callPixabay = async (pixabayURL)=>{
    const res = await fetch(pixabayURL)

    try {
        const data = await res.json();
        return data;

    }   catch(error) {
        console.log("error", error);
    }
}

function getWeatherData() {
    city = document.querySelector('#city').value;
    url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    // data needed to call pixabay API
    let cityEncoded = encodeURI(city);
    const pixabayURI = `https://pixabay.com/api/?key=${pixabayAPIKey}&q=${cityEncoded}&category=travel&image_type=photo`
    countdown();
    getDataGeonames(url)
        .then(function(data){
            postData('http://localhost:8000/', {latitude: data.geonames[0].lat, longtitude: data.geonames[0].lng, country: data.geonames[0].countryName, city: city})
                .then(getWeatherbit()
                    .then(function(data){
                    postData('http://localhost:8000/postWeatherbit', {temp: data[0].high_temp, description: data[0].weather.description})
                        .then(callPixabay(pixabayURI)
                            .then(function(data){
                            postData('http://localhost:8000/postWeatherbit', {image: data.hits[0].webformatURL})
                                .then(updateUI()
                                    .then(
                                        function(data) {
                                            try {
                                                // select elements in the HTML and update its content
                                                document.getElementById('city').innerHTML = data.longtitude;
                                                document.getElementById('latitude').innerHTML = data.latitude;
                                                document.getElementById('longtitude').innerHTML = data.longtitude;
                                                document.getElementById('country').innerHTML = data.country
                                                document.getElementById('temperature').innerHTML = data.temp;
                                                document.getElementById('description').innerHTML = data.description;
                                                document.getElementById('image').innerHTML = `<img src=${data.image} alt="picture_of_the_destination"></img>`;
                                            } catch(error) {
                                                console.log('error', error);
                                            }
                                    })
                                )
                            })
                    )
                })
            )
        })
    };

export { getWeatherData }