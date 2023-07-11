import React, { useEffect, useState } from 'react'
import { getStorageValue, setStorageValue } from '../../utils'
import { Alter, Default, Tab } from './Icons'

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
    <div className="ylt-layout-tab">
      <button
        className={currentLayout === 'default' ? 'active' : undefined}
        onClick={() => handleClick('default')}
      >
        <Default />
      </button>
      <button
        className={currentLayout === 'tab' ? 'active' : undefined}
        onClick={() => handleClick('tab')}
      >
        <Tab />
      </button>
      <button
        className={currentLayout === 'alter' ? 'active' : undefined}
        onClick={() => handleClick('alter')}
      >
        <Alter />
      </button>
    </div>
  )
}
