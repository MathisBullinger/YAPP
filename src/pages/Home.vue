<template>
  <div :class="getClass">
    <Paragraph>YAPP</Paragraph>
    <Header s1>Header s1</Header>
    <Header s2>Header s2</Header>
    <Header s3>Header s3</Header>
    <Header s4>Header s4</Header>
    <Header s5>Header s5</Header>
    <Button>hello</Button>
    <ControlBar></ControlBar>
  </div>
</template>

<script>
import Component from '/utils/component'
import ControlBar from '/components/molecular/ControlBar'

export default new Component({
  name: 'Home',
  components: {
    ControlBar,
  },
})
</script>

<style lang="scss" scoped></style>
