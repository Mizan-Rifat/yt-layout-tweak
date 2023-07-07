import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './content.css'
import { classNames, elements, ids, selectors } from './elements'
import { getStorageValue, setStorageValue } from '../utils'

let initialized = false

chrome.runtime.onMessage.addListener(() => {
  setStorageValue({ layout: 'default' })
  init()
})

const checkIsTheaterMode = () => {
  const collection = document.getElementsByTagName('ytd-watch-flexy')
  const ytd_watch_flexy = collection.item(0)
  return ytd_watch_flexy?.attributes.theater
}

const setDefaultLayout = () => {
  const { commentsSectionEl, primaryBelowEl, extEl, relatedVideosEl } = elements()

  if (!primaryBelowEl?.querySelector(selectors.commentsSectionEl) && commentsSectionEl) {
    primaryBelowEl?.append(commentsSectionEl)
    if (relatedVideosEl) {
      relatedVideosEl.style.display = 'block'
    }
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
  const { commentsSectionEl, secondaryInnerEl, extEl } = elements()
  if (commentsSectionEl) {
    secondaryInnerEl?.append(commentsSectionEl)
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
  const { secondaryEl, theaterModeBtn } = elements()

  const layout = await getStorageValue('layout')

  console.log({ layout })

  let isTheaterMode = checkIsTheaterMode()

  console.log({ isTheaterMode })

  // if (isTheaterMode) {
  //   setDefaultLayout()
  // }

  if (theaterModeBtn) {
    theaterModeBtn.addEventListener('click', () => {
      isTheaterMode = !checkIsTheaterMode()

      if (layout === 'tab') {
        if (isTheaterMode) {
          setDefaultLayout()
        } else {
          setLayout()
        }
      }
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
    }

    setLayout()
    initialized = true
  }
}

export {}
