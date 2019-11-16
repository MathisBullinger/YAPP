import { cardGrid as grid, layout } from '~/styles'
import { css } from '~/utils'
import { values } from '~/styles/responsive'

const getNavSize = (mode: 'mobile' | 'side' | 'collapsed') =>
  mode === 'mobile'
    ? 0
    : css.parseSize(
        mode === 'collapsed'
          ? layout.desktop.navWidthCollapsed
          : layout.desktop.navWidth
      )

function getSizeAt(
  columns: number,
  width: number,
  mode: 'mobile' | 'side' | 'collapsed'
) {
  return Math.ceil(
    (width - (mode !== 'mobile' ? (columns - 1) * grid.buffer : 0)) / columns
  )
}

function getWidthAt(
  windowWidth: number,
  mode: 'mobile' | 'side' | 'collapsed'
) {
  return (
    windowWidth -
    getNavSize(mode) -
    (mode !== 'mobile' ? css.parseSize('4rem') : 0)
  )
}

export default [
  ...grid.steps
    .map(([min, max], i) => ({ min, max, i }))
    .map(({ min, max, i }) => ({
      query: [
        ...(min ? [`(min-width: ${min}px)`] : []),
        ...(max ? [`(max-width: ${max}px)`] : []),
        '(orientation: portrait)',
      ].join(' and '),
      size:
        getSizeAt(
          i + grid.minCards,
          getWidthAt(max || min, 'mobile'),
          'mobile'
        ) + 'px',
    })),
  ...grid.steps
    .map(([min, max], i) => ({ min, max, i }))
    .filter(({ min }) => min < values.navCollapsed.max)
    .map(({ min, max, i }) => ({
      query: [
        ...(min ? [`(min-width: ${min}px)`] : []),
        `(max-width: ${Math.min(values.navCollapsed.max, max)}px)`,
        '(orientation: landscape)',
      ].join(' and '),
      size: `${getSizeAt(
        i + grid.minCards,
        getWidthAt(max || min, 'collapsed'),
        'collapsed'
      )}px`,
    })),
  ...grid.steps
    .map(([min, max], i) => ({ min, max, i }))
    .filter(({ max }) => max > values.navCollapsed.max)
    .map(({ min, max, i }) => ({
      query: [
        `(min-width: ${Math.max(values.navOnSide.min, min)}px)`,
        ...(max ? [`(max-width: ${max}px)`] : []),
        '(orientation: landscape)',
      ].join(' and '),
      size: `${getSizeAt(
        i + grid.minCards,
        getWidthAt(max || min, 'side'),
        'side'
      )}px`,
    })),
]
