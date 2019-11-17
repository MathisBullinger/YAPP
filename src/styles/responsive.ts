export const values = {
  navOnBottom: {
    max: 599,
  },
  navOnSide: {
    min: 600,
  },
  navCollapsed: {
    min: 600,
    max: 1000,
  },
  appbarVisible: {
    max: 599,
  },
  toolbarVisible: {
    min: 600,
  },
}

export default {
  navOnBottom: `(max-width: ${values.navOnBottom.max}px), (orientation: portrait)`,
  navOnSide: `(min-width: ${values.navOnSide.min}px) and (orientation: landscape)`,
  navCollapsed: `(min-width: ${values.navCollapsed.min}px) and (max-width: ${values.navCollapsed.max}px) and (orientation: landscape)`,
  appbarVisible: `(max-width: ${values.appbarVisible.max}px) and (orientation: portrait)`,
  toolbarVisible: `(min-width: ${values.toolbarVisible.min}px)`,
}
