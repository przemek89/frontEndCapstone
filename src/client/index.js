import { getWeatherData } from './js/app'

import './styles/style.scss'

// select the generate button element
const generateButton = document.querySelector('#generate');

document.addEventListener('DOMContentLoaded', (event) => {
    // add event listener for generate button
    generateButton.addEventListener('click', getWeatherData);
});

export {
    getWeatherData
}