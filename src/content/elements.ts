type Selectors = {
  primaryEl: string
  secondaryEl: string
  secondaryInnerEl: string
  relatedVideosEl: string
  primaryBelowEl: string
  commentsSectionEl: string
  contentTabEl: string
  secondaryWrapper: string
  theaterModeBtn: string
  navCenterEl: string
}

type Elements = {
  [K in keyof Selectors]: HTMLElement | null
}

export const selectors: Selectors = {
  primaryEl: 'ytd-watch-flexy #primary',
  secondaryEl: 'ytd-watch-flexy #secondary',
  secondaryInnerEl: 'ytd-watch-flexy #secondary-inner',
  relatedVideosEl: 'ytd-watch-flexy #related',
  primaryBelowEl: 'ytd-watch-flexy #below',
  commentsSectionEl: 'ytd-watch-flexy #comments',
  contentTabEl: 'ytd-watch-flexy #ylt-content-tab',
  secondaryWrapper: 'ytd-watch-flexy .secondary-wrapper',
  theaterModeBtn: "[data-title-no-tooltip='Theater mode']",
  navCenterEl: 'ytd-masthead #container #center',
}

export const classNames = {
  secondaryWrapper: 'secondary-wrapper',
  layoutTab: 'ylt-layout-tab',
  contentTab: 'ylt-content-tab',
  extClass: 'yt-layout-tweak',
}

export const ids = {
  contentTabEl: 'ylt-content-tab',
}

export const getElement: (selector: string) => HTMLElement | null = (selector) =>
  document.querySelector(selector)

export const elements: () => Elements = () =>
  Object.keys(selectors).reduce((acc, selector) => {
    const key = selector as keyof Selectors
    acc[key] = getElement(selectors[key])
    return acc
  }, {} as Elements)
