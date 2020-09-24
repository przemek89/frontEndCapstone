/* Global Variables */
let zip_code;
const api_key = 'd00c322fdf629b33b42279052c8f1710&units=imperial';
let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},CH&appid=${api_key}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async GET request to OWM API
const getData = async (url) => {
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

// event listener for Generate button
// select the generate button element
const generateButton = document.querySelector('#generate');

// add event listener for generate button
generateButton.addEventListener('click', function getWeatherData() {
    zip_code = document.querySelector('#zip').value;
    let userResponse = document.getElementById('feelings').value;
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},CH&appid=${api_key}`;
    getData(url)
        .then(function(data){
            postData('http://localhost:8000/', {temperature:data.main.temp, date:newDate, userResponse:userResponse})
                .then(
                    updateUI().then(
                        function(data) {
                            try {
                                // select elements in the HTML and update its content
                                document.getElementById('date').innerHTML = data.date;
                                document.getElementById('temp').innerHTML = data.temperature;
                                document.getElementById('content').innerHTML = data.userResponse
                            } catch(error) {
                                console.log('error', error);
                            }
                        })
                )
            })
})
