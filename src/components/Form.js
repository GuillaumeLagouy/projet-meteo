import EventManager from '../tools/EventManager';
import Key from '../tools/Key'
import AjaxGet from './AjaxGet';

const Form = {
    el: document.querySelector('form'),
    city: null,
    btn: null,

    init(){
        this.city = this.el.querySelector('#form-search');
        this.btn = this.el.querySelector('#search');

        this.btn.addEventListener('click', (e) => {this.send(e)});
    },

    send(e){
        e.preventDefault();
        AjaxGet('http://api.apixu.com/v1/current.json?key='+ Key +'&lang=fr&q='+ this.city.value, (response)=>{
            const requestRes = JSON.parse(response);
            EventManager.dispatchEvent(new CustomEvent('METEO::SearchCity', {detail: requestRes}));
        });
    }
};
export default Form;
