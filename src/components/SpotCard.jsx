/** Kartu dengan cahaya yang mengikuti posisi kursor. */
const SpotCard = ({ as: Tag = 'div', className = '', children, ...rest }) => {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <Tag onMouseMove={onMove} className={`spot ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export default SpotCard
