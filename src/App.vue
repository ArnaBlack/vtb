<template>
  <div :class="$style.container"
        class="pt-2">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <!--<li class="nav-item">
              <router-link class="nav-link" to="/">home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cars">cars</router-link>
            </li> -->
            <router-link tag="li" class="nav-item" exact to="/" active-class="active">
              <a class="nav-link">Home</a>
            </router-link>
            <router-link tag="li" class="nav-item" to="/cars" active-class="active">
              <a class="nav-link">Cars</a>
            </router-link>
            <router-link tag="li" class="nav-item" to="/car/3" active-class="active">
              <a class="nav-link">Cars3</a>
            </router-link>
            <router-link tag="li" class="nav-item" to="/car/4" active-class="active">
              <a class="nav-link">Cars4</a>
            </router-link>

          </ul>
        </div>
    </nav>
      <router-view></router-view>
      <div class="form-group">
        <label for="name">
          Name
        </label>
        <input id="name" class="form-control" type="text" v-model.trim="CarName">
      </div>
       <div class="form-group">
        <label for="year">
          Year
        </label>
        <input id="year" class="form-control" type="text" v-model.number="CarYear">
      </div>

      <button class="btn btn-success" @click="createCar">Create car</button>
      <button class="btn btn-primary" @click="loadCars">Load Cars</button>

      <hr>

      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="car in cars"
          :key="car.id">
          <strong>{{ car.name }}</strong> - {{ car.year }}
        </li>
      </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      CarName: '',
      CarYear: 2018,
      cars: [],
      resource: null
    }
  },
  methods: {
    createCar() {
      const car = {
        name: this.CarName,
        year: this.CarYear
      }

      // this.$http.post('http://localhost:3000/cars', car)
      //   .then(response => {
      //     return response.json()
      //   })
      //   .then(newCar => {
      //     console.log(newCar)
      //   })

      this.resource.save({}, car)
    },
      // put delete
    loadCars() {
      // this.$http.get('http://localhost:3000/cars')
      //  .then(response => {
      //     return response.json()
      //   })
      //   .then(cars => {
      //     this.cars = cars
      //   })
      this.resource.get()
        .then(response => response.json())
        .then(cars => this.cars = cars)
    }
  },

  created() {
    this.resource = this.$resource('cars');
  }
}
</script>

<style lang="scss" module>
  .container {
    width: 80%;
    margin: 0 auto;
  }
</style>
