import React from 'react'
import ReactDOM from 'react-dom/client'
import ContentTab from './components/ContentTab'
import './content.scss'
import { classNames, elements, ids, selectors } from './elements'
import { getStorageValue } from '../utils'
import { LayoutTabItems } from './components/LayoutTabItems'

let initialized = false

chrome.runtime.onMessage.addListener(() => {
  init()
})

const checkIsTheaterMode = () => {
  const collection = document.getElementsByTagName('ytd-watch-flexy')
  const ytd_watch_flexy = collection.item(0)
  // @ts-ignore
  return ytd_watch_flexy?.attributes.theater
}

const setDefaultLayout = () => {
  const { commentsSectionEl, primaryBelowEl, secondaryInnerEl, contentTabEl, secondaryEl } =
    elements()

  if (commentsSectionEl && secondaryInnerEl) {
    if (!primaryBelowEl?.querySelector(selectors.commentsSectionEl)) {
      primaryBelowEl?.append(commentsSectionEl)
    }
    if (!secondaryEl?.querySelector(selectors.secondaryInnerEl)) {
      secondaryEl?.append(secondaryInnerEl)
    }
    commentsSectionEl.style.display = 'block'
    secondaryInnerEl.style.display = 'block'
  }
  if (contentTabEl) {
    contentTabEl.style.display = 'none'
  }
}

const setSwapLayout = () => {
  const { commentsSectionEl, secondaryInnerEl, primaryBelowEl, contentTabEl, secondaryEl } =
    elements()

  if (commentsSectionEl && secondaryInnerEl) {
    secondaryEl?.append(commentsSectionEl)
    primaryBelowEl?.append(secondaryInnerEl)

    secondaryInnerEl.style.display = 'block'
    commentsSectionEl.style.display = 'block'
  }

  if (contentTabEl) {
    contentTabEl.style.display = 'none'
  }
}

const setTabbedLayout = async () => {
  const activeTab = await getStorageValue('activeTab')
  const { secondaryEl, commentsSectionEl, secondaryInnerEl, contentTabEl } = elements()

  if (!secondaryEl?.querySelector(selectors.commentsSectionEl) && commentsSectionEl) {
    console.log('1')

    secondaryEl?.append(commentsSectionEl)
  }
  if (!secondaryEl?.querySelector(selectors.secondaryInnerEl) && secondaryInnerEl) {
    console.log('2')

    secondaryEl?.append(secondaryInnerEl)
  }

  if (activeTab === 'comments') {
    commentsSectionEl!.style.display = 'block'
    secondaryInnerEl!.style.display = 'none'
  } else {
    commentsSectionEl!.style.display = 'none'
    secondaryInnerEl!.style.display = 'block'
  }
  if (contentTabEl) {
    contentTabEl.style.display = 'block'
  }
}

const setLayout = async () => {
  const layout = await getStorageValue('layout')
  const isTheaterMode = checkIsTheaterMode()
  document.body.classList.remove('tabbed-layout')

  if (isTheaterMode && layout === 'tabbed') {
    setDefaultLayout()
  } else if (layout === 'tabbed') {
    document.body.classList.add('tabbed-layout')
    setTabbedLayout()
  } else if (layout === 'swap') {
    setSwapLayout()
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
      tabEl.id = ids.contentTabEl
      tabEl.classList.add(classNames.extClass)
      ReactDOM.createRoot(tabEl as HTMLElement).render(<ContentTab isTheaterMode={isTheaterMode} />)
      secondaryEl.prepend(tabEl)

      const layoutTabEl = document.createElement('div')
      layoutTabEl.classList.add(classNames.extClass)
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
