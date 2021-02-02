document.addEventListener('DOMContentLoaded', (ev) => {
  const searchButton = document.getElementById('search');
  const infoDiv = document.getElementById('info');
  const apiKey = '7921da921d5259a56ac451780774b1bb';
  const cityField = document.getElementById('city');
  // const weatherTable = document.getElementById('weather-table');
  searchButton.addEventListener('click',(ev2) => {
    let city = cityField.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // infoDiv.innerHTML = '';
    fetch(url).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(JSON.stringify(data));
          //let parag = document.createElement('P'); //delete this
          //parag.textContent = JSON.stringify(data); //delete this
          //infoDiv.appendChild(parag); // delete this
          url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`
          fetch(url2).then((response2) => {
            if (response2.status === 200) {
              response2.json().then((data2) => {
                //let parag2 = document.createElement('P'); // delete this
                //parag2.textContent = JSON.stringify(data2); //delete this
                //infoDiv.appendChild(parag2); // delete this
                console.log(JSON.stringify(data2));
                infoDiv.textContent='';
                let weatherTable=document.createElement('table');
                let wtHeader=document.createElement('thead');
                let titleRow=document.createElement('tr');
                let dayTitle=document.createElement('td');
                dayTitle.textContent=" Day ";
                titleRow.appendChild(dayTitle);
                let minTitle=document.createElement('td');
                minTitle.textContent=" Minimum Temperature ";
                titleRow.appendChild(minTitle);
                let maxTitle=document.createElement('td');
                maxTitle.textContent=" Maximum Temperature ";
                titleRow.appendChild(maxTitle);
                let descTitle=document.createElement('td');
                descTitle.textContent=" Description ";
                titleRow.appendChild(descTitle);
                wtHeader.appendChild(titleRow);
                weatherTable.appendChild(wtHeader);
                for (let i = 0; i < data2.daily.length; i++ ) {
                  let row=document.createElement('tr');
                  let day = document.createElement('td');
                  let date = new Date(data2.daily[i].dt * 1000);
                  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                  day.textContent = date.toLocaleDateString("en-US",options);
                  row.appendChild(day);
                  let tmin=document.createElement('td');
                  tmin.textContent = data2.daily[i].temp.min;
                  row.appendChild(tmin);
                  let tmax=document.createElement('td');
                  tmax.textContent = data2.daily[i].temp.max;
                  row.appendChild(tmax);
                  let desc=document.createElement('td')
                  // desc.textContent = data2.daily[i].weather[0].main;
                  let img = document.createElement('img');
                  img.src=`http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}.png`
                  img.alt= data2.daily[i].weather[0].main;
                  desc.appendChild(img);
                  row.appendChild(desc);
                  weatherTable.appendChild(row);
                }
                infoDiv.appendChild(weatherTable);
              });
            } else {
              alert(`Return code ${response2.status} ${response2.statusText}`);
            }
          }).catch((error) => {
            console.log(error);
          });
        });
      } else if (response.status === 404) {
        alert("That city was not found.");
      } else {
        alert(`Return code ${response.status} ${response.statusText}`);
      }
    }).catch((error) => {
      console.log(error);
    });
  });
});
