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
        //sortir

        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        let d = new Date(data.date);
        let dayName = days[d.getDay()];

        this.day.innerHTML = dayName;
        this.img.src = data.day.condition.icon;
        this.temp.innerHTML = data.day.avgtemp_c;
    }
}

export default ForecastItem;
