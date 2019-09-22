<template>
  <h2>Counter {{ counter }}</h2>
</template>
<script>
export default {
    name: 'counter',
    computed: {
      counter() {
        return this.$store.getters.computedCounter
      }
    }
    // props: ['counter']
}
</script>
