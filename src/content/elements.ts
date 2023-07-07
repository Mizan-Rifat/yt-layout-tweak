export const selectors = {
  primaryEl: '#primary',
  secondaryEl: '#secondary',
  secondaryInnerEl: '#secondary',
  relatedVideosEl: '#related',
  commentsSectionEl: '#comments',
  extEl: '#youtube-comments-ext',
}
export const initElements = () => {
  const classNames = {
    secondaryWrapper: 'secondary-wrapper',
  }

  const ids = {
    extEl: 'youtube-comments-ext',
  }

  const secondaryEl = document.querySelector(selectors.secondaryEl)
  const secondaryInnerEl = document.querySelector(selectors.secondaryInnerEl)
  const commentsSectionEl = document.getElementById(selectors.commentsSectionEl)
  const relatedVideosEl = document.getElementById(selectors.relatedVideosEl)
  const extEl = document.getElementById(selectors.extEl)

  return {
    selectors,
    classNames,
    ids,
    secondaryEl,
    secondaryInnerEl,
    commentsSectionEl,
    relatedVideosEl,
    extEl,
  }
}
