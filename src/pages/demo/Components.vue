<template>
  <div :class="getClass">
    <Header s1>Header s1</Header>
    <Header s2>Header s2</Header>
    <Header s3>Header s3</Header>
    <Header s4>Header s4</Header>
    <Header s5>Header s5</Header>
    <Paragraph>Paragraph</Paragraph>
    <Button>Button</Button>
  </div>
</template>

<script>
import Component from '/utils/component'

export default new Component({
  name: 'ComponentDemo',
})
</script>

<style lang="scss" scoped></style>
