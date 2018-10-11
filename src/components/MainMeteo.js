import EventManager from '../tools/EventManager';
import Key from '../tools/Key';
import AjaxGet from './AjaxGet';
import Forecast from './Forecast';


const MainMeteo = {
    el: document.querySelector('#main-meteo'),

    init(){
        this.city = this.el.querySelector('#city');
        this.country = this.el.querySelector('#country');
        this.img = this.el.querySelector('img');
        this.desc = this.el.querySelector('#desc');
        this.temp = this.el.querySelector('#temp');
        this.humidity = this.el.querySelector('#humidity');

        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            Forecast.init();
            AjaxGet('http://api.apixu.com/v1/forecast.json?key=' + Key +'&days=6&q=' + latitude + ',' + longitude, (response) => {
                const data = JSON.parse(response);
                this.fill(data);
                EventManager.dispatchEvent(new CustomEvent('METEO::Forecast', {detail: data}));
            });
        });
    },

    fill(data, search){
        if(search){
            this.city.innerHTML = data.detail.location.name;
            this.country.innerHTML = data.detail.location.country;
            this.img.src = data.detail.current.condition.icon;
            this.desc.innerHTML = data.detail.current.condition.text;
            this.temp.innerHTML = data.detail.current.temp_c;
            this.humidity.innerHTML = data.detail.current.humidity;
        } else {
            this.city.innerHTML = data.location.name;
            this.country.innerHTML = data.location.country;
            this.img.src = data.current.condition.icon;
            this.desc.innerHTML = data.current.condition.text;
            this.temp.innerHTML = data.current.temp_c;
            this.humidity.innerHTML = data.current.humidity;
        }
    }
};

export default MainMeteo;
