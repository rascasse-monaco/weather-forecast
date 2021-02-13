'use strict';
import $ from 'jquery';

function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(err) {
  alert(`位置情報の取得に失敗しました。(${err.code})`);
}

navigator.geolocation.getCurrentPosition(success, fail);

function unixTimeToMillisecond(unixTime) {
  return unixTime * 1000;
}

function ajaxRequest(lat, long) {
  const url = 'https://api.openweathermap.org/data/2.5/forecast';
  const appId = '5a03d053d21cb0580d6d662566f3b195';

  $.ajax({
    url: url,
    data: {
      appid: appId,
      lat: lat,
      lon: long,
      units: 'metric',
      lang: 'ja'
    }
  })
  .done((data) => {
    console.log(data);

    console.log('都市名: ' + data.city.name);
    console.log('国名: ' + data.city.country);

    data.list.forEach((forecast, index) => {
      const time = new Date(unixTimeToMillisecond(forecast.dt));
      const displays = {
        month: time.getMonth() + 1,
        date: time.getDate(),
        hours: time.getHours(),
        min: time.getMinutes().toString().padStart(2, '0'),
        temperature: Math.round(forecast.main.temp),
        description: forecast.weather[0].description
      }
      const iconPath = `../images/${forecast.weather[0].icon}.svg`;

      console.log('日時: ' + `${displays.month}/${displays.date} ${displays.hours}:${displays.min}`);
      console.log('気温: ' + displays.temperature);
      console.log('天気: ' + displays.description);
      console.log('画像パス: ' + iconPath);

      $('#place').text(data.city.name + ', ' + data.city.country);

      if (index === 0) {
        const currentWeather = (`
          <div class="icon">
            <img src="${iconPath}">
          </div>
          <div class="info">
              <p>
                  <span class="description">現在の天気:${displays.description}</span>
                  <span class="temp">${displays.temperature}</span>°C
              </p>
          </div>
        `);
        $('#weather').html(currentWeather);
      } else {
        const tableRow = (`
          <tr>
            <td class="info">
              ${displays.month}/${displays.date} ${displays.hours}:${displays.min}
            </td>
            <td class="icon">
                <img src="${iconPath}">
            </td>
            <td>
                <span class="description">${displays.description}</span>
            </td>
            <td>
                <span class="temp">${displays.temperature}°C</span>
            </td>
          </tr>
        `);
        $('#forecast').append(tableRow);
      }
    });
  })
  .fail(() => {
    console.log('$.ajax failed')
  });
}