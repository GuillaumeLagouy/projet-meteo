import App from './App.vue';

console.log('JS ok');

navigator.geolocation.getCurrentPosition((position) => {
    console.log("Latitude: "+ position.coords.latitude);
    console.log("Longitude: "+ position.coords.longitude);
});


