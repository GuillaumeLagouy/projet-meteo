import EventManager from '../tools/EventManager';
import Key from '../tools/Key'
import AjaxGet from './AjaxGet';
import Cities from './Cities';

const Form = {
    el: document.querySelector('form'),
    city: null,
    btnSearch: null,

    init(){
        const autocomplete_list = document.getElementById('autocomplete-list');
        autocomplete_list.style.display = 'none';

        this.city = this.el.querySelector('#form-search');
        this.city.addEventListener('keyup', () => {this.autocomplete()});

        this.btnSearch = this.el.querySelector('#search');
        this.btnSearch.addEventListener('click', (e) => {
            this.city.value !== '' ? this.send(e) : e.preventDefault();
            this.city.value = '';
        });
    },

    send(e){
        e.preventDefault();

        AjaxGet('http://api.apixu.com/v1/forecast.json?key='+ Key +'&days=6&lang=fr&q='+ this.city.value, (response) =>{
            const requestRes = JSON.parse(response);
            EventManager.dispatchEvent(new CustomEvent('METEO::SearchCity', {detail: requestRes}));
        });
    },

    autocomplete(){
        const autocomplete_list = document.getElementById('autocomplete-list');
        const min_characters = 3;
        if(this.city.value.length >= min_characters){

            AjaxGet('http://api.apixu.com/v1/search.json?key='+ Key + '&q=' + this.city.value, (response) => {

                autocomplete_list.style.display = 'block';
                const requestRes = JSON.parse(response);
                autocomplete_list.innerHTML = '';

                requestRes.forEach((item) => {

                    const li = document.createElement('li');
                    li.innerText = item.name;
                    autocomplete_list.appendChild(li);
                    let model = {city: item.name.split(',')[0], country: item.country};

                    li.addEventListener('click', () => {
                        Cities.addCity(model, true);
                        this.city.value = '';
                        autocomplete_list.innerHTML = '';
                        autocomplete_list.style.display = 'none';
                    });
                })
            })
        } else {
            autocomplete_list.innerHTML = '';
            autocomplete_list.style.display = 'none';
        }
    }
};
export default Form;
