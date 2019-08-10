enum Weight {
  Light = 300,
  Regular = 400,
  Medium = 500,
}

const BASE = 16
export default {
  title1: {
    size: 96 / BASE,
    weight: Weight.Light,
    spacing: -1.5 / BASE,
  },
  title2: {
    size: 60 / BASE,
    weight: Weight.Light,
    spacing: -0.5 / BASE,
  },
  title3: {
    size: 48 / BASE,
    weight: Weight.Regular,
    spacing: 0 / BASE,
  },
  title4: {
    size: 34 / BASE,
    weight: Weight.Regular,
    spacing: 0.25 / BASE,
  },
  title5: {
    size: 24 / BASE,
    weight: Weight.Regular,
    spacing: 0,
  },
  title6: {
    size: 20 / BASE,
    weight: Weight.Medium,
    spacing: 0.15 / BASE,
  },

  text1: {
    size: 1,
    weight: Weight.Regular,
    spacing: 0.5 / BASE,
  },
  text2: {
    size: 14 / BASE,
    weight: Weight.Regular,
    spacing: 0.25 / BASE,
  },
}
