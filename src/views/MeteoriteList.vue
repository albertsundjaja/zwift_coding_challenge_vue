<template>
  <div class="container">
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="1"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="center=m.position"
        :label="m.text"
      />
    </GmapMap>
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
    markers () {
      let markers = []
      this.meteorites.forEach((meteorite) => {
        if (meteorite.geolocation) {
          markers.push({
            text: meteorite.name,
            position: {
              lng: meteorite.geolocation.coordinates[0],
              lat: meteorite.geolocation.coordinates[1]
            }
          })
        }
      })
      return markers
    },
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
