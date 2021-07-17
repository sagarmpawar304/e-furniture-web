import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SubMenu = ({ handleSubmenuClose }) => {
  const container = useRef(null)

  const isSubmenuOpen = useSelector((store) => store.isSubmenuOpen)

  const { display: displaySubmenu, category, location } = isSubmenuOpen
  const { name, subtype } = category

  useEffect(() => {
    const submenu = container.current
    const { center, bottom } = location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
  })

  return (
    <div
      className={displaySubmenu ? ` submenu show` : ' container submenu'}
      onMouseLeave={handleSubmenuClose}
      ref={container}
    >
      <div className='submenu-body '>
        <div className='submenu-header'>
          <p className='mb-0 py-0'>{name}</p>
        </div>
        <hr className='mb-0' />
        <div className='submenu-grid'>
          {subtype.map((type, index) => (
            <Link
              to={`/products?category=${name}&subcategory=${type}`}
              key={index}
              className='submenu-item-btn mb-0'
            >
              <p className='mb-0 py-0 text-capitalize'>{type}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubMenu
