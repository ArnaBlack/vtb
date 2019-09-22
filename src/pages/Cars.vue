<template>
  <div>
    <h1>Cars</h1>
    <ul>
      <router-link
        tag="li"
        v-for="car in 5"
        :key="car"
        :to="'/car/' + car">
        <a> {{ car }} </a>
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'Cars'
  }
</script>
