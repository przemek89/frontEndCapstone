/* Global Variables */
let city;
const username = 'przemzbik';
let url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async GET request to OWM API
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

function getWeatherData() {
    city = document.querySelector('#city').value;
    let userResponse = document.getElementById('feelings').value;
    url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
    getDataGeonames(url)
        .then(function(data){
            postData('http://localhost:8000/', {latitude: data.geonames[0].lat, longtitude: data.geonames[0].lng, country: data.geonames[0].countryName})
                .then(
                    updateUI().then(
                        function(data) {
                            try {
                                // select elements in the HTML and update its content
                                document.getElementById('latitude').innerHTML = data.latitude;
                                document.getElementById('longtitude').innerHTML = data.longtitude;
                                document.getElementById('country').innerHTML = data.country
                            } catch(error) {
                                console.log('error', error);
                            }
                        })
                )
            })
};

export { getWeatherData }