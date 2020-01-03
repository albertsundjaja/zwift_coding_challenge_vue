<template>
  <div class="container">
    <v-select
      v-model="selectedSort"
      label="Sort by mass"
      :items="sortOptions"
      outlined
      dense
      >
    </v-select>
    <meteorite v-for="meteorite in meteorites" :key="meteorite.id"
      :name="meteorite.name"
      :mass="meteorite.mass"
      :recclass="meteorite.recclass"
      ></meteorite>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Meteorite from '@/views/Meteorite.vue'

export default {
  data () {
    return {
      sortOptions: ['Ascending', 'Descending'],
      selectedSort: '',
      meteoritesData: this.$store.getters['meteorite/meteorites'].filter((meteorite) => {
        return meteorite.hasOwnProperty('mass')
      })
    }
  },
  computed: {
    meteorites () {
      let returnedMeteorites = this.$store.getters['meteorite/meteorites'].filter((meteorite) => {
        return meteorite.hasOwnProperty('mass')
      })

      if (this.selectedSort) {
        if (this.selectedSort === 'Ascending') {
          returnedMeteorites.sort((a, b) => {
            let aMass = parseInt(a.mass)
            let bMass = parseInt(b.mass)
            if (aMass > bMass) {
              return 1
            } else {
              return -1
            }
          })
        } else {
          returnedMeteorites.sort((a, b) => {
            let aMass = parseInt(a.mass)
            let bMass = parseInt(b.mass)
            if (aMass < bMass) {
              return 1
            } else {
              return -1
            }
          })
        }
      }

      return returnedMeteorites
    }
  },
  components: {
    Meteorite
  }
}
</script>

<style scoped>
.container {
  margin:10px;
}
</style>
