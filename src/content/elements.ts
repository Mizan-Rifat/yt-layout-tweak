type Selectors = {
  primaryEl: string
  secondaryEl: string
  secondaryInnerEl: string
  relatedVideosEl: string
  primaryBelowEl: string
  commentsSectionEl: string
  extEl: string
  secondaryWrapper: string
  theaterModeBtn: string
}

type Elements = {
  [K in keyof Selectors]: HTMLElement | null
}

export const selectors: Selectors = {
  primaryEl: '#primary',
  secondaryEl: '#secondary',
  secondaryInnerEl: '#secondary-inner',
  relatedVideosEl: '#related',
  primaryBelowEl: '#below',
  commentsSectionEl: '#comments',
  extEl: '#youtube-comments-ext',
  secondaryWrapper: '.secondary-wrapper',
  theaterModeBtn: "[data-title-no-tooltip='Theater mode']",
}

export const classNames = {
  secondaryWrapper: 'secondary-wrapper',
}

export const ids = {
  extEl: 'youtube-comments-ext',
}

export const getElement: (selector: string) => HTMLElement | null = (selector) =>
  document.querySelector(selector)

export const elements: () => Elements = () =>
  Object.keys(selectors).reduce((acc, selector) => {
    const key = selector as keyof Selectors
    acc[key] = getElement(selectors[key])
    return acc
  }, {} as Elements)
