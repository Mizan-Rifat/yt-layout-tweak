import React, { useEffect } from 'react'
import { elements } from '../elements'

const App = ({ isTheaterMode }: { isTheaterMode: boolean }) => {
  const { commentsSectionEl, relatedVideosEl } = elements()

  const handleClick = (id: string) => {
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
    if (!isTheaterMode && relatedVideosEl) {
      relatedVideosEl.style.display = 'none'
    }
  }, [])

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={() => handleClick('comments')}>Comments</button>
      <button onClick={() => handleClick('suggestions')}>Suggestions</button>
    </div>
  )
}

export default App
