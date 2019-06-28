<template>
  <div :class="getClass">
    <Header s2>Connection Info</Header>
    type: {{ connection.type }}
    <br>
    effective type: {{ connection.effectiveType }}
    <br>
    downlink: {{ connection.downlink }}
    <br>
    downlink max: {{ connection.downlinkMax }}
    <br>
    save data: {{ connection.saveData }}
  </div>
</template>

<script>
import Component from '~/scripts/component'

const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection

export default new Component({
  name: 'Debug',
  data: () => ({
    connection: '',
  }),
  methods: {
    getConnection() {
      this.connection = connection
    },
  },
  mounted() {
    this.getConnection()
    connection.addEventListener('change', this.getConnection)
  },
})
</script>

<style lang="scss" scoped></style>
