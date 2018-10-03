<template>
  <div>
  </div>
</template>

<script>
import Form from './components/Form';
import MainMeteo from './components/MainMeteo';
import Forecast from './components/Forecast';

const meteo = ((form, mainmeteo) =>{
    form.init();
    mainmeteo.init();
})(Form, MainMeteo);
Forecast.init();
</script>

<style lang="scss">
  @import './assets/styles/style';
  @import './assets/styles/variables';
</style>
