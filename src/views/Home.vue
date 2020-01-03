<template>
  <v-container>
    <v-row>
      <v-col xs="12" align="center">
        <h1>Meteorite Lookup</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6" offset-md="3  " xs="12">
        <v-form>
          <v-select
            :items="filterItems"
            label="Select Filter"
            v-model="selectedFilter"
            dense
            outlined>
          </v-select>
          <v-text-field
            v-model="filterValue"
            :label="inputValueLabel"
            :type="inputValueType"
            outlined
            dense
            required></v-text-field>
          <v-btn color="primary" @click="queryMeteorites">
            Get Meteorite
          </v-btn>
        </v-form>

        <meteorite-list v-if="meteorites.length !== 0"></meteorite-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapGetters } from 'vuex'
import meteoriteList from '@/views/MeteoriteList.vue'
import axios from 'axios'

export default {
  data () {
    return {
      filterValue: '',
      filterItems: ['Year', 'Recclass'],
      selectedFilter: 'Year'
    }
  },
  computed: {
    ...mapGetters('meteorite', [
      'meteorites'
    ]),
    inputValueLabel () {
      return 'Please Enter ' + this.selectedFilter
    },
    inputValueType () {
      if (this.selectedFilter === 'Year') {
        return 'number'
      } else {
        return 'text'
      }
    }
  },
  watch: {
    selectedFilter () {
      this.filterValue = ''
    }
  },
  components: {
    meteoriteList
  },
  methods: {
    ...mapMutations('meteorite', [
      'setMeteorites'
    ]),
    queryMeteorites () {
      axios.get(`http://localhost:8080/meteorites/?${this.selectedFilter.toLowerCase()}=${this.filterValue}`)
        .then((res) => {
          this.setMeteorites(res.data.meteorites)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
