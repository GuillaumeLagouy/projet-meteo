import EventManager from '../tools/EventManager';
import ForecastItem from './ForecastItem';
import LocalStorage from './LocalStorage';

const Forecast = {
    el: document.querySelector('table'),
    init(){
        const items = this.el.querySelectorAll('th');

        let newItem;
        EventManager.addEventListener('METEO::Forecast', (data) => {
            //refacto : créer fonction pas fonction anonyme
            let numberDay = 1;
            Array.from(items).map(item => {
                //refacto : utiliser le constructeur
                newItem = new ForecastItem();
                newItem.init(item, data.detail.forecast.forecastday[numberDay]);
                numberDay++;
            });

            document.querySelector('.main-meteo-container').style.display = 'flex';

            setTimeout(() => {LocalStorage.init()}, 1500);
        })
    },
};

export default Forecast;
