<template>
  <div>
  </div>
</template>

<script>
import Form from './components/Form';
import MainMeteo from './components/MainMeteo';
import Forecast from './components/Forecast';
import Cities from './components/Cities'

const meteo = ((form, mainmeteo, cities) =>{

    document.querySelector('.main-meteo-container').style.display = 'none';

    form.init();
    mainmeteo.init();
    cities.init();
    
})(Form, MainMeteo, Cities);
Forecast.init();
</script>

<style lang="scss">
  @import './assets/styles/style';
  @import './assets/styles/variables';
</style>
