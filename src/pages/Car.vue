<template>
  <div>
    <h1>Car id {{ id }}</h1>
    <button class="btn btn-sm btn-info"
      @click="goBackToCars"> Back </button>
      <br>
      <!-- <router-link
        tag="button"
        class="btn btn-success"
        :to="'/car/'+ id + '/full'">Full Info</router-link> -->
        <router-link
          tag="button"
          class="btn btn-success"
          :to="{name: 'CarFull', params: {id: id}, query: {name: 'Mazda', year: 2000}, hash: '#scroll'}"
        >Full Info</router-link>

        <hr>
        <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'Car',
    data() {
      return {
        // id: this.$router.currentRoute.params['id']
        id: this.$route.params['id']
      }
    },
    methods: {
      goBackToCars() {
        this.$router.push('/cars');
      }
    },
    watch: {
      $route (toR, fromR) {
        this.id = toR.params['id']
      }
    },

    beforeRouteLeave(to, fromF, next) {
      console.log('beforeRouteLeave');
      if(window.confirm('are you sure to leave?')) {
        next()
      }
      else {
        next(false)
      }
    }
  }
</script>
