<template>
  <div :class="$style.container">
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
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" module>
  .container {
    width: 80%;
    margin: 0 auto;
  }
</style>
