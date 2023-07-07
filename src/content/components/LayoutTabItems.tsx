import React, { useEffect, useState } from 'react'
import { getStorageValue, setStorageValue } from '../../utils'

export const LayoutTabItems = ({ setLayout }: { setLayout: () => void }) => {
  const [currentLayout, setCurrentLayout] = useState('')
  const handleClick = (layout: string) => {
    setStorageValue({ layout })
    setCurrentLayout(layout)
    setLayout()
  }

  useEffect(() => {
    ;(async () => {
      const layout = await getStorageValue('layout')
      setCurrentLayout(layout)
    })()
  }, [])

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button
        className={currentLayout === 'default' ? 'active' : undefined}
        onClick={() => handleClick('default')}
      >
        default
      </button>
      <button
        className={currentLayout === 'tab' ? 'active' : undefined}
        onClick={() => handleClick('tab')}
      >
        tab
      </button>
      <button
        className={currentLayout === 'alter' ? 'active' : undefined}
        onClick={() => handleClick('alter')}
      >
        alter
      </button>
    </div>
  )
}
