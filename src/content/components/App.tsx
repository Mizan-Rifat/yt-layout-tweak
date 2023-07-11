import React, { useEffect, useState } from 'react'
import { elements } from '../elements'
import { getStorageValue, setStorageValue } from '../../utils'

const App = ({ isTheaterMode }: { isTheaterMode: boolean }) => {
  const [activeItem, setActiveItem] = useState('comments')
  const { commentsSectionEl, relatedVideosEl } = elements()

  console.log({ isTheaterMode })

  const handleClick = (id: string) => {
    setActiveItem(id)
    setStorageValue({ activeTab: id })
    if (commentsSectionEl && relatedVideosEl) {
      if (id === 'comments') {
        commentsSectionEl.style.display = 'block'
        relatedVideosEl.style.display = 'none'
      } else {
        commentsSectionEl.style.display = 'none'
        relatedVideosEl.style.display = 'block'
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      const activeTab = await getStorageValue('activeTab')
      setActiveItem(activeTab)
      const layout = await getStorageValue('layout')
      if (!isTheaterMode && relatedVideosEl && layout === 'tab' && activeTab === 'comments') {
        relatedVideosEl.style.display = 'none'
      }
    })()
  }, [])

  return (
    <div className="ylt-content-tab">
      <button
        className={activeItem === 'comments' ? 'active' : undefined}
        onClick={() => handleClick('comments')}
      >
        Comments
      </button>
      <button
        className={activeItem === 'relatedVideos' ? 'active' : undefined}
        onClick={() => handleClick('relatedVideos')}
      >
        Related videos
      </button>
    </div>
  )
}

export default App
