import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './content.css'
import { classNames, elements, ids, selectors } from './elements'
import { getStorageValue, setStorageValue } from '../utils'
import { LayoutTabItems } from './components/LayoutTabItems'

let initialized = false

chrome.runtime.onMessage.addListener(() => {
  init()
})

const checkIsTheaterMode = () => {
  const collection = document.getElementsByTagName('ytd-watch-flexy')
  const ytd_watch_flexy = collection.item(0)
  return ytd_watch_flexy?.attributes.theater
}

const setDefaultLayout = () => {
  const { commentsSectionEl, primaryBelowEl, secondaryInnerEl, extEl, relatedVideosEl } = elements()

  if (commentsSectionEl && relatedVideosEl) {
    if (!primaryBelowEl?.querySelector(selectors.commentsSectionEl)) {
      primaryBelowEl?.append(commentsSectionEl)
    }
    if (!secondaryInnerEl?.querySelector(selectors.relatedVideosEl)) {
      secondaryInnerEl?.append(relatedVideosEl)
    }
    commentsSectionEl.style.display = 'block'
    relatedVideosEl.style.display = 'block'
  }
  if (extEl) {
    extEl.style.display = 'none'
  }
}

const setAlterLayout = () => {
  const { commentsSectionEl, secondaryInnerEl, primaryBelowEl, extEl, relatedVideosEl } = elements()

  if (commentsSectionEl && relatedVideosEl) {
    secondaryInnerEl?.append(commentsSectionEl)
    primaryBelowEl?.append(relatedVideosEl)

    relatedVideosEl.style.display = 'block'
    commentsSectionEl.style.display = 'block'
  }

  if (extEl) {
    extEl.style.display = 'none'
  }
}

const setTabModeLayout = () => {
  const { commentsSectionEl, secondaryInnerEl, extEl, relatedVideosEl } = elements()
  if (!secondaryInnerEl?.querySelector(selectors.commentsSectionEl) && commentsSectionEl) {
    secondaryInnerEl?.append(commentsSectionEl)
  }
  if (!secondaryInnerEl?.querySelector(selectors.relatedVideosEl) && relatedVideosEl) {
    secondaryInnerEl?.append(relatedVideosEl)
    relatedVideosEl.style.display = 'none'
  }
  if (extEl) {
    extEl.style.display = 'block'
  }
}

const setLayout = async () => {
  const layout = await getStorageValue('layout')
  const isTheaterMode = checkIsTheaterMode()
  document.body.classList.remove('tab-layout')

  if (isTheaterMode && layout === 'tab') {
    setDefaultLayout()
  } else if (layout === 'tab') {
    document.body.classList.add('tab-layout')
    setTabModeLayout()
  } else if (layout === 'alter') {
    setAlterLayout()
  } else {
    setDefaultLayout()
  }
}

const init = async () => {
  const { secondaryEl, theaterModeBtn, navCenterEl } = elements()

  let isTheaterMode = checkIsTheaterMode()

  if (theaterModeBtn) {
    theaterModeBtn.addEventListener('click', () => {
      setLayout()
    })
  }

  if (!initialized) {
    // wrap the #secondary element inside a div
    if (secondaryEl) {
      const wrapper = document.createElement('div')
      wrapper.classList.add(classNames.secondaryWrapper)
      secondaryEl.parentNode?.insertBefore(wrapper, secondaryEl)
      wrapper.appendChild(secondaryEl)

      //add tab component to dom
      const tabEl = document.createElement('div')
      tabEl.id = ids.extEl
      ReactDOM.createRoot(tabEl as HTMLElement).render(<App isTheaterMode={isTheaterMode} />)
      secondaryEl.prepend(tabEl)

      const layoutTabEl = document.createElement('div')
      ReactDOM.createRoot(layoutTabEl as HTMLElement).render(
        <LayoutTabItems setLayout={setLayout} />,
      )
      navCenterEl?.prepend(layoutTabEl)
    }

    setLayout()
    initialized = true
  }
}

export {}
