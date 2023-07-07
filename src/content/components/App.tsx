import React, { useEffect } from 'react'

const App = ({ isTheaterMode }) => {
  const suggestionsEl = document.getElementById('secondary-inner')
  const commentsEl = document.getElementById('comments')

  console.log({ isTheaterMode })
  const handleClick = (id) => {
    if (id === 'comments') {
      commentsEl.style.display = 'block'
      suggestionsEl.style.display = 'none'
    } else {
      commentsEl.style.display = 'none'
      suggestionsEl.style.display = 'block'
    }
  }

  useEffect(() => {
    if (!isTheaterMode && suggestionsEl) {
      suggestionsEl.style.display = 'none'
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
