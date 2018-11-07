import React from 'react'

const ICONS = {
  start: props => <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0z' /><path d='M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83z' /></svg>
}

export default function Icon (props) {
  const { size, icon, color, shadow } = props
  const IconSvg = ICONS[icon]
  if (!IconSvg) throw new Error('No IconSvg')
  return (
    <IconSvg style={{
      width: `${size}px`,
      height: `${size}px`,
      fill: color || '#fff',
      filter: shadow ? `drop-shadow(rgba(0, 0, 0, 0.8) 2px 2px 1px)` : 'none'
    }} />
  )
}
