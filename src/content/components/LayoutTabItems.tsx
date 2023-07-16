import React, { useEffect, useState } from 'react'
import { getStorageValue, setStorageValue } from '../../utils'
import { Swap, Default, Tabbed } from './Icons'

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
        title="Default Layout"
      >
        <Default />
      </button>
      <button
        className={currentLayout === 'tabbed' ? 'active' : undefined}
        onClick={() => handleClick('tabbed')}
        title="Tabbed Layout"
      >
        <Tabbed />
      </button>
      <button
        className={currentLayout === 'swap' ? 'active' : undefined}
        onClick={() => handleClick('swap')}
        title="Swap Layout"
      >
        <Swap />
      </button>
    </div>
  )
}
