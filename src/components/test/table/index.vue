<template>
  <div v-if="filteredData.length">
    <table>
      <thead>
        <tr>
          <th v-for="(key, index) in columns" :key="index" @click="sortBy(key)" :class="{ active: sortKey == key }">
            {{ capitalize(key) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, ind) in filteredData" :key="ind">
          <td v-for="(key, index) in columns" :key="index">
            {{ entry[key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      {{ count }}
      <button @click="count++">Count</button>
    </div>

    <div>
      <input type="number" :value="c" @change="setC"> Celsius =
      <input type="number" :value="f" @change="setF"> Fahrenheit
    </div>
  </div>
  <p v-else>No matches found.</p>

</template>

<script setup>

export default {
  name: 'cus-table',
  props: {
    data: {
      type: Array,
      default: () => [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ]
    },
    columns: {
      type: Array,
      default: () => ['name', 'power']
    }
  },
  data() {
    return {
      count: 0,
      sortKey: '',
      sortOrders: {
        name: 1,
        power: 1
      },
      c: 0,
      f: 32
    }
  },
  computed: {
    filteredData() {
      const key = this.sortKey.value
      let data = []
      if (key) {
        const order = this.sortOrders[key]
        data = this.data.slice().sort((a, b) => {
          a = a[key]
          b = b[key]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data.length ? data : this.data
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] *= -1
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    setC(e, v = +e.target.value) {
      this.c.value = v
      this.f.value = v * (9 / 5) + 32
    },
    setF(e, v = +e.target.value) {
      this.f.value = v
      this.c.value = (v - 32) * (5 / 9)
    }
  }
}

</script>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>