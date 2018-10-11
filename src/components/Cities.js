import EventManager from '../tools/EventManager';
import Key from '../tools/Key';
import City from './City';
import AjaxGet from "./AjaxGet";
import MainMeteo from "./MainMeteo";

const Cities = {
    el: document.querySelector('#cities'),
    listCity: [],

    init(){
       //afficher la ville geolocalisée
        navigator.geolocation.getCurrentPosition(position => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            AjaxGet('http://api.apixu.com/v1/forecast.json?key=' + Key +'&q=' + latitude + ',' + longitude, (response) => {
                const data = JSON.parse(response);
                let currentCity = new City(data.location.name, data.location.country);
                currentCity.build(true);
            });
        });

        EventManager.addEventListener('METEO::SearchCity', (data) => this.addCity(data, false));
        EventManager.addEventListener('METEO::RemoveCity', (data) => this.removeCity(data));
    },
    addCity(data, auto){

        if(auto){
            var cityName = data.city;
            var country = data.country;
        } else {
            cityName = data.detail.location.name;
            country = data.detail.location.country;
        }

        let newCity = new City(cityName, country);
        const found = this.listCity.includes(cityName);
        if(!found){
            this.listCity.push(cityName);
            newCity.build();
            this.displayMeteo();
            //mettre dans localstorage
        }
    },
    removeCity(data){
        const article = data.detail.item;
        article.parentNode.removeChild(article);
        let index = this.listCity.indexOf(data.detail.cityName);
        if(index !== -1) this.listCity.splice(index, 1);
        MainMeteo.init();
        //supprimer du localstorage
    },
    displayMeteo(){
        EventManager.addEventListener('METEO::DisplayMeteo', (data) => {
            AjaxGet('http://api.apixu.com/v1/forecast.json?key='+ Key +'&days=6&lang=fr&q='+ data.detail, (response) =>{
                const requestRes = JSON.parse(response);
                MainMeteo.fill(requestRes);
                EventManager.dispatchEvent(new CustomEvent('METEO::Forecast', {detail: requestRes}));
            });
        });
    }
    //loadcity quand ville geoloc fini de charger
};

export default Cities;
