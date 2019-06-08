<template>
  <div :class="getClass">
    <Header s2>Connection Info</Header>
    connection: {{ connection }}
  </div>
</template>

<script>
import Component from '/utils/component'

const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection

export default new Component({
  name: 'Debug',
  data: () => ({
    connection: '',
  }),
  methods: {
    getConnection() {
      this.connection = JSON.stringify(connection)
    },
  },
  mounted() {
    this.getConnection()
    connection.addEventListener('change', this.getConnection)
  },
})
</script>

<style lang="scss" scoped></style>
