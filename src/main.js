import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
$(document).ready(function () {
  $('#weatherLocation').click(function () {
    const city = $('#location').val();
    const lang = $('#language').val();
    const lat = parseFloat($('#lat').val());
    const lon = parseFloat($('#lon').val());
    $('#location').val("");
    $('#lat').val("");
    $('#lon').val("");
    $('#country').val("");
    try {
      let request = new XMLHttpRequest();
      const url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&lang=${lang}`;
      request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          getElements(response);
        }
      };

      request.open("GET", url, true);
      request.send();
    } catch (error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    }
    function getElements(response) {
      $('.showHumidity').html(`The humidity in ${city} is <b class="color">${response.main.humidity}%</b>`);
      $('.showTemp').html(`The temperature in Fahrenheit is <b class="color">${response.main.temp} degrees Fahrenheit.</b>`);
      $('.showDescription').html(`The weather description:<b class="color"> ${response.weather[0].description}</b>`);
      $('.showMain').html(`The weather main:<b class="color"> ${response.weather[0].main}.</b>`)
      $('.showSpeed').html(`The wind speed is <b class="color"> ${response.wind.speed}m/s</b>`);
      $('.showCountry').html(`The country of  city is <b class="color"> ${response.sys.country}</b>`);
      $('.showSunRise').html(`The sunrise is <b class="color">${response.sys.sunrise} UTC</b>`);
      $('.showTimeZone').html(`The timezone is <b class="color">${response.timezone} UTC</b>`);
        $('.showLat').html(`The latitude is <b class="color">${response.coord.lat} 'N</b>`);
      $('.showLon').html(`The longitude is <b class="color">${response.coord.lon}'E</b>`);
    }
  });
});
