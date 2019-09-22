<template>
  <div>
    <h4>Car name: {{ $route.query.name }}</h4>
    <h5>Car year: {{ year }}</h5>

    <div class="scroll"></div>
    <h6 id="scroll">Hello fom the bottom</h6>
  </div>
</template>
<script>

  export default {
    computed: {
      year() {
        return this.$route.query.year
      }
    },
    beforeRouteEnter (to, fromR,next) {
      console.log('fggg')
      next()
    }
  }
</script>

<style scoped>
  .scroll {
    width: 100px;
    height: 1000px;
    background-color: #ccc;
  }
</style>
