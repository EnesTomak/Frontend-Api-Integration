const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    //destructure properties
    const {cityDets , weather} = data;

    //güncelleme deteyları template leri
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //gece/gündüz ve simge resimlerini güncelle
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    


    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    //varsa d-none sınıfını kaldır
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none') ;
    }

};

const updateCity = async (city) => {
   
    const cityDets = await getCity(city) ;//citydetails
    const weather = await getWeather(cityDets.Key);

    return{ cityDets, weather };
};

cityForm.addEventListener('submit',e => {
    //varsayılan eylemi engelleme
    e.preventDefault();

    //şehirin değerini al
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //kullanıcı arayüzünü yeni şehirle güncelleme
    updateCity(city)
        .then(data => updateUI(data) )
        .catch(err => console.log(err) );
        
})