<template>
  <div>
    <button class="btn btn-success" @click="updateCounter(1)">Add</button>
    <button class="btn btn-danger" @click="updateCounter(-1)">Subtruct</button>
  </div>
</template>
<script>
export default {
  name: 'Actions',

  methods: {
    updateCounter(value) {
      // this.$emit('counterUpdated', value)
      // this.$store.state.counter += value
      // this.$store.commit('changeCounter', value) // передаем то что должны вызвать
      this.$store.dispatch('asyncChangeCounter', {
        conterValue: value,
        timeoutDelay: 200
      });
    }
  }
}
</script>
