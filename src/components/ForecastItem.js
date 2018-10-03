import EventManager from "../tools/EventManager";

class ForecastItem{
    constructor() {
        this.el = null;
    }

    init(el, data){
        this.el = el;
        this.day = this.el.querySelector('.day__name');
        this.img = this.el.querySelector('.day__icon');
        this.temp = this.el.querySelector('.day__temp');
        this.fill(data);
    }
    fill(data){
        this.day.innerHTML = data.date;
        this.img.src = data.day.condition.icon;
        this.temp.innerHTML = data.day.avgtemp_c;
    }
}

export default ForecastItem;
