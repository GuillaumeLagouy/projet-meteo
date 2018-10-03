import EventManager from '../tools/EventManager';
import ForecastItem from './ForecastItem';
import Key from '../tools/Key'
import AjaxGet from "./AjaxGet";

const Forecast = {
    el: document.querySelector('table'),
    init(){
        const items = this.el.querySelectorAll('th');

        let newItem;
        var numberDay = 1;
        EventManager.addEventListener('METEO::Forecast', (data) => {
            Array.from(items).map(item => {
                //refacto : utiliser le constructeur
                newItem = new ForecastItem();
                newItem.init(item, data.detail.forecast.forecastday[numberDay]);
                numberDay++;
            });
        })
    },
};

export default Forecast;
