import EventManager from '../tools/EventManager'
import Form from './Form';

const MainMeteo = {
    el: document.querySelector('#main-meteo'),
    init(){
        this.city = this.el.querySelector('#city');
        this.country = this.el.querySelector('#country');
        this.img = this.el.querySelector('img');
        this.desc = this.el.querySelector('#desc');
        this.temp = this.el.querySelector('#temp');
        this.humidity = this.el.querySelector('#humidity');
        EventManager.addEventListener('METEO::SearchCity', (data) => this.fill(data));
    },

    fill(data){
        this.city.innerHTML = data.detail.location.name;
        this.country.innerHTML = data.detail.location.country;
        this.img.src = data.detail.current.condition.icon;
        this.desc.innerHTML = data.detail.current.condition.text;
        this.temp.innerHTML = data.detail.current.temp_c;
        this.humidity.innerHTML = data.detail.current.humidity;
    }
};

export default MainMeteo;
