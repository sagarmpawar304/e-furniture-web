import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Route} from 'react-router-dom'
import { Navbar, Nav, Image, NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { GoThreeBars } from 'react-icons/go'
import SearchBox from './SearchBox'
import Sidebar from './Sidebar'
import Submenu from './SubMenu'
import { data } from '../links'
import { openSubmenu, CloseSubmenu } from '../actions/submenuActions'

const MainNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const dispatch = useDispatch()
  const container = useRef(null)

  const cart = useSelector((store) => store.cart)
  const { cartItems } = cart

  const wishList = useSelector((store) => store.wishList)
  const { wishListItems } = wishList

  const isSubmenuOpen = useSelector((store) => store.isSubmenuOpen)
  const { display: displaySubmenu } = isSubmenuOpen

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // sidebar
  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  // submenu
  const handleSubmenuOpen = (e) => {
    const type = e.target.textContent
    const tempBtn = e.target.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right) / 2
    const bottom = tempBtn.bottom
    const category = data.find((item) => item.name === type)
    dispatch(openSubmenu(category, { center, bottom }))
  }
  const handleSubmenuClose = (e) => {
    if (!e.target.classList.contains('submenu-container')) {
      dispatch(CloseSubmenu())
    }
  }

  return (
    <header className='header' id='header'>
      {/* // Main Nabar */}
      <Navbar
        variant='white'
        bg='white'
        expand='lg'
        className='main-navbar py-0'
        onMouseOver={handleSubmenuClose}
      >
        <Navbar.Brand>
          {/*  sidebar toggle button */}
          <div className='d-inline-block d-md-none mr-3'>
            <h2>
              <i
                aria-hidden='true'
                onClick={handleSidebar}
                className='sidebar-toggle'
              ></i>
              <GoThreeBars />
            </h2>
          </div>
          {/*  end of sidebar toggle button */}

          <LinkContainer to='/'>
            <Image src='../../logo.png' fluid className='xs-logo md-logo' />
          </LinkContainer>
        </Navbar.Brand>

        {/* search bar */}
        <Nav className='d-none d-md-block mx-auto'>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </Nav>
        {/* end of search bar */}

        <Nav className=' d-flex flex-row  ' onMouseOver={handleSubmenuClose}>
          <LinkContainer to='/users' className='mx-1 d-flex align-items-center'>
            <NavLink>
              {userInfo && userInfo.name !== undefined
                ? userInfo.name.split(' ')[0]
                : 'Login'}
            </NavLink>
          </LinkContainer>

          {userInfo && userInfo.isAdmin && (
            <LinkContainer
              to='/admin'
              className='mx-1 d-none d-md-flex align-items-center'
            >
              <NavLink>{userInfo && userInfo.isAdmin && 'Admin'}</NavLink>
            </LinkContainer>
          )}

          <Nav.Item className='cart-container flex-column align-item-center mx-1'>
            <LinkContainer to='/wishlist'>
              <Nav.Link className='pb-0 flex-column '>
                <h4
                  className='pt-1 xs-heart md-heart'
                  style={{ color: 'var(--mainYellow)' }}
                >
                  {wishListItems.length > 0 ? <BsHeartFill /> : <BsHeart />}
                </h4>
                {wishListItems.length > 0 && (
                  <h5 className='wishListItems'>{wishListItems.length}</h5>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>

          <Nav.Item className='cart-container mx-1'>
            <LinkContainer to='/cart' className='d-flex '>
              <Nav.Link className='flex-column'>
                <h4 className='xs-cart ms-cart'>
                  {' '}
                  <RiShoppingCart2Line />
                </h4>
                <h5 className='cartItems'>{cartItems.length}</h5>
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* // end of Main Nabar */}

      {/* // secondary navbar  */}
      <Navbar
        bg='white'
        className='secondary-navbar d-none d-md-flex '
        onMouseOver={handleSubmenuClose}
        ref={container}
      >
        <Nav className='links mx-auto p-0 my-0'>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className='d-flex flex-column justify-content-center'
              >
                {/* <div className='justify-self-center mx-auto'>{item.icon}</div> */}
                <p
                  className={
                    'mx-3 py-1 submenu-container link-btn text-capitalize'
                  }
                  onMouseOver={handleSubmenuOpen}
                >
                  {item.name}
                </p>
              </div>
            )
          })}
        </Nav>
      </Navbar>
      {/* // end of secondary navbar */}

      {/* secondary search bar */}
      <Navbar bg='white' className=' d-flex d-md-none'>
        <Nav>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </Nav>
      </Navbar>
      {/* end secondary search bar */}

      {/* sidebar */}
      {isSidebarOpen && <Sidebar closeSidebar={handleSidebar} />}
      {/* end of sidebar */}

      {/* submenu */}
      {displaySubmenu && (
        <Submenu
          isSubmenuOpen={displaySubmenu}
          handleSubmenuClose={handleSubmenuClose}
        />
      )}
      {/* end of submenu */}
    </header>
  )
}

export default MainNavbar
