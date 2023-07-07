import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './content.css'
import { classNames, elements, ids } from './elements'

chrome.runtime.onMessage.addListener(() => {
  init()
})

const checkIsTheaterMode = () => {
  const collection = document.getElementsByTagName('ytd-watch-flexy')
  const ytd_watch_flexy = collection.item(0)
  return ytd_watch_flexy?.attributes.theater
}

const init = () => {
  const {
    secondaryEl,
    commentsSectionEl,
    secondaryInnerEl,
    primaryBelowEl,
    extEl,
    theaterModeBtn,
    relatedVideosEl,
  } = elements()

  let isTheaterMode = checkIsTheaterMode()

  const setTheaterModeLayout = () => {
    if (commentsSectionEl && secondaryInnerEl) {
      primaryBelowEl?.append(commentsSectionEl)
      secondaryInnerEl.style.display = 'block'
    }
  }

  const setTabModeLayout = () => {
    if (commentsSectionEl) {
      secondaryInnerEl?.append(commentsSectionEl)
    }
  }

  console.log({ isTheaterMode })

  if (isTheaterMode) {
    setTheaterModeLayout()
  }

  if (theaterModeBtn) {
    theaterModeBtn.addEventListener('click', () => {
      isTheaterMode = !checkIsTheaterMode()
      if (isTheaterMode) {
        setTheaterModeLayout()
      } else {
        setTabModeLayout()
      }
    })
  }

  if (secondaryEl && commentsSectionEl && !extEl) {
    const wrapper = document.createElement('div')
    wrapper.classList.add(classNames.secondaryWrapper)
    secondaryEl.parentNode?.insertBefore(wrapper, secondaryEl)
    wrapper.appendChild(secondaryEl)

    const tabEl = document.createElement('div')
    tabEl.id = ids.extEl
    ReactDOM.createRoot(tabEl as HTMLElement).render(<App isTheaterMode={isTheaterMode} />)
    if (secondaryEl && commentsSectionEl) {
      secondaryEl.prepend(tabEl)
      setTabModeLayout()
    }
  }
}

export {}
