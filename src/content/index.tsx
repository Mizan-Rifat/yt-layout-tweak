import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './content.css'
import { classNames, elements, ids, selectors } from './elements'

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

  if (
    secondaryEl &&
    commentsSectionEl &&
    secondaryInnerEl &&
    primaryBelowEl &&
    theaterModeBtn &&
    relatedVideosEl
  ) {
    let isTheaterMode = checkIsTheaterMode()

    const setDefaultLayout = () => {
      if (!primaryBelowEl.querySelector(selectors.commentsSectionEl)) {
        primaryBelowEl.append(commentsSectionEl)
        relatedVideosEl.style.display = 'block'
      }
      if (extEl) {
        extEl.style.display = 'none'
      }
    }

    const setTabModeLayout = () => {
      secondaryInnerEl?.append(commentsSectionEl)
      if (extEl) {
        extEl.style.display = 'block'
      }
    }

    console.log({ isTheaterMode })

    if (isTheaterMode) {
      setDefaultLayout()
    }

    if (theaterModeBtn) {
      theaterModeBtn.addEventListener('click', () => {
        isTheaterMode = !checkIsTheaterMode()
        if (isTheaterMode) {
          setDefaultLayout()
        } else {
          setTabModeLayout()
        }
      })
    }

    if (!extEl) {
      const wrapper = document.createElement('div')
      wrapper.classList.add(classNames.secondaryWrapper)
      secondaryEl.parentNode?.insertBefore(wrapper, secondaryEl)
      wrapper.appendChild(secondaryEl)

      const tabEl = document.createElement('div')
      tabEl.id = ids.extEl
      ReactDOM.createRoot(tabEl as HTMLElement).render(<App isTheaterMode={isTheaterMode} />)

      secondaryEl.prepend(tabEl)
      setTabModeLayout()
    }
  }
}

export {}
