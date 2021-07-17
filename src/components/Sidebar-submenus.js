import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SidebarSubmenus = ({ name, icon, subtype, closeSidebar }) => {
  const [showSubmenu, setShowSubmenu] = useState(false)
  return (
    <div className='sidebar-submenu'>
      <div
        className='d-flex sidebar-link'
        onClick={() => setShowSubmenu(!showSubmenu)}
      >
        <h5 className='mr-3'>{icon}</h5>
        <h5>{name}</h5>
      </div>

      <div className='sidebar-submenu-links'>
        {showSubmenu &&
          subtype.map((item, index) => (
            <Link
              to={`/products?category=${name}&subcategory=${item}`}
              key={index}
              onClick={closeSidebar}
            >
              <h6>{item}</h6>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default SidebarSubmenus
