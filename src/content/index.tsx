import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './content.css'

chrome.runtime.onMessage.addListener(() => {
  init()
})

const checkIsTheaterMode = () => {
  const collection = document.getElementsByTagName('ytd-watch-flexy')
  const ytd_watch_flexy = collection.item(0)

  return ytd_watch_flexy?.attributes.theater
}

function init() {
  const secondaryEl = document.getElementById('secondary')
  const commentsEl = document.getElementById('comments')
  const suggestionsEl = document.getElementById('secondary-inner')
  const bellowEl = document.getElementById('below')
  const extEl = document.getElementById('chrome-extension')
  const theaterModeBtn = document.querySelector('[data-title-no-tooltip="Theater mode"]')
  let isTheaterMode = checkIsTheaterMode()

  const setTheaterModeLayout = () => {
    if (commentsEl && suggestionsEl) {
      bellowEl?.append(commentsEl)
      suggestionsEl.style.display = 'block'
    }
  }

  const setTabModeLayout = () => {
    secondaryEl.append(commentsEl)
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

  if (secondaryEl && commentsEl && !extEl) {
    const wrapper = document.createElement('div')
    wrapper.classList.add('secondary-wrapper')
    secondaryEl.parentNode?.insertBefore(wrapper, secondaryEl)
    wrapper.appendChild(secondaryEl)
    const root = document.createElement('div')
    root.id = 'chrome-extension'
    ReactDOM.createRoot(root as HTMLElement).render(<App isTheaterMode={isTheaterMode} />)
    if (secondaryEl && commentsEl) {
      secondaryEl.prepend(root)
      setTabModeLayout()
    }
  }
}

export {}
