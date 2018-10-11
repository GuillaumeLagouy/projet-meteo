import EventManager from "../tools/EventManager";

class City {
    constructor(city, country){
        this.city = city;
        this.country = country;
    }
    build(geoloc){
        const el = document.getElementById('cities');
        const cityArticle = document.createElement('article');

        if(geoloc){
            cityArticle.innerHTML = `
                <h1>${this.city}</h1>
                <h2>${this.country}</h2>
            `;
            this.listen(cityArticle);
        } else {
            cityArticle.innerHTML = `
                <h1>${this.city}</h1>
                <h2>${this.country}</h2>
                <button class="btn-delete"><span>X</span></button>
            `;
            this.listen(cityArticle);
        }
        el.append(cityArticle);
    }
    listen(el){
        const item = el;
        const cityName = this.city;
        const model = {item, cityName};
        if(item.querySelector('.btn-delete') !== null ){
            item.querySelector('.btn-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                EventManager.dispatchEvent(new CustomEvent('METEO::RemoveCity', {detail: model}));
            });
        }
        item.addEventListener('click', () => {
            EventManager.dispatchEvent(new CustomEvent('METEO::DisplayMeteo', {detail : cityName}));
            document.location = '#page-meteo';
        })
    }
}

export default City;
