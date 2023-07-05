import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './content.css'

chrome.runtime.onMessage.addListener(() => {
  init()
})

function init() {
  const secondaryEl = document.getElementById('secondary')
  const commentsEl = document.getElementById('comments')

  if (secondaryEl && commentsEl) {
    secondaryEl.prepend(commentsEl)
  }

  const root = document.createElement('div')
  root.id = 'chrome-extension'
  document.body.append(root)
  console.log({ root })

  if (secondaryEl && commentsEl) {
    ReactDOM.createRoot(root as HTMLElement).render(<App />)
  }
}

export {}
