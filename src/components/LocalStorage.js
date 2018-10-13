import Cities from  './Cities';


const LocalStorage = {

    listLocalStorage: [],
    myStorage: localStorage,

    init(){
        this.display(this.myStorage);
    },

    add(city){
        this.listLocalStorage.push(city);
        this.updateStorage(this.listLocalStorage);
    },

    remove(city){
        this.listLocalStorage.map((item) => {
            let index = this.listLocalStorage.indexOf(item);
            if(item.city === city.city){
                this.listLocalStorage.splice(index, 1);
                this.updateStorage(this.listLocalStorage);
            }
        });
    },

    updateStorage(storage){
        this.myStorage.setItem('list-city-storage', JSON.stringify(storage));

    },
    display(localstorage){
        const listLocalCity = JSON.parse(localstorage['list-city-storage']);
        setTimeout(() => {
            listLocalCity.map((city) => {
                Cities.addCity(city, true);
            });
        }, 4000);
    }
};
export default LocalStorage;
