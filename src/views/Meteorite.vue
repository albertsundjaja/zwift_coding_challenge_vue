<template>
  <v-card outlined class="mx-auto meteorite-detail">
      Name: {{name}} <br/>
      Mass: {{mass}} <br/>
      Recclass: {{recclass}}
  </v-card>
</template>

<script>
export default {
  props: {
    'name': {
      type: String,
      required: true
    },
    'mass': {
      type: String,
      default: '-1',
      required: true
    },
    'recclass': {
      type: String,
      default: '-1',
      required: true
    }
  }
}
</script>

<style scoped>
.meteorite-detail {
  padding: 10px;
  margin: 5px;
}
</style>
