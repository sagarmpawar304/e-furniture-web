import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Row,
  Form,
  FormGroup,
  FormControl,
  Spinner,
} from 'react-bootstrap'

import { getListProducts } from '../../actions/productActions'
import Product from '../../components/Product'
import { PRODUCT_DETAILS_RESET } from '../../constants/productConstants'
import { data } from '../../links'
import Navbar from '../../components/Navbar'

// const Product = React.lazy(() => import('../../components/Product'));

const ProductsScreen = () => {
  const productList = useSelector((store) => store.productList)
  const { products, loading, error } = productList

  const [filteredProducts, setFilterdProducts] = useState([])
  const [sidebarSubCategories, setSidebarSubCategories] = useState([])
  const [maxPrice, setMaxPrice] = useState(100000)
  const [maxRange, setMaxRange] = useState(100)
  const [color, setColor] = useState([])

  let category, subCategory
  const search = window.location.search

  if (search.search('subcategory') === -1) {
    category = search.split('=')[1].replace(/-/g, ' ')
    subCategory = ''
  } else {
    let queryString = search.split('&')
    category = queryString[0].split('=')[1]
    subCategory = queryString[1].split('=')[1].replace(/-/g, ' ')
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const handlePopButton = () => {
    if (history.action === 'POP') {
      dispatch({ type: PRODUCT_DETAILS_RESET })
    }
  }

  const filterProducts = (newColors) => {
    const newItems = []

    newColors.map((item) => {
      products.filter(
        (product) => product.color === item && newItems.push(product)
      )
      return true
    })

    setFilterdProducts(newItems)
  }

  const addColor = (newColor) => {
    const newColors = [...color, newColor]
    setColor(newColors)
    filterProducts(newColors)
  }
  const removeColor = (newColor) => {
    const existedColors = color.filter((color) => color !== newColor)
    setColor(existedColors)
    filterProducts(existedColors)
  }
  const handleCheck = (newColor) => {
    let existedColor = color.find((item) => item === newColor)
    if (existedColor) {
      removeColor(newColor)
    } else {
      addColor(newColor)
    }
  }

  const getSidebarSubCatgories = () => {
    if (category) {
      const items = data.find((item) => item.name === category)
      // console.log(items, category)
      setSidebarSubCategories(items.subtype)
    }
  }

  const handlePrice = (e) => {
    setMaxRange(e.target.value)
    setMaxPrice((100000 * maxRange) / 100)
  }

  const calcColorProducts = (color) => {
    let byColor = []
    byColor = products.filter((product) => product.color === color)
    return byColor.length
  }
  const backToTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  useEffect(() => {
    backToTop()
    handlePopButton()
    dispatch(getListProducts({ category, subCategory, maxPrice }))
    getSidebarSubCatgories()
    // console.log(filteredProducts.length)
    // console.log(filteredProducts)
    // eslint-disable-next-line
  }, [
    category,
    subCategory,
    dispatch,
    history,
    maxPrice,
    color,
    filteredProducts,
  ])

  return (
    <>
      <Navbar />
      <section id='productsList' className='productsList'>
        <div className='container-xl'>
          {/* title */}
          <Row className='pt-3 '>
            <Col xs='10' className='mx-auto  text-center'>
              <h1 className='text-uppercase mb-0'>{category}</h1>
            </Col>
          </Row>

          <Row className='d-block d-md-none'>
            <Col xs='12'>
              {/* shop by price */}
              <h6
                className='text-uppercase mt-3'
                style={{ color: 'var(--mainYellow)' }}
              >
                sort by price
              </h6>
              {/* <div className='text-underline my-2'></div> */}
              <Form className='w-75'>
                <FormGroup>
                  <Form.Label htmlFor='price-range'>
                    Range ₹0 to ₹{maxPrice}
                  </Form.Label>
                  <FormControl
                    id='price-range'
                    type='range'
                    name='price-range'
                    className='form-control-range'
                    value={maxRange}
                    onChange={handlePrice}
                  ></FormControl>
                </FormGroup>
              </Form>
              <hr />
              {/* end shop by price */}
            </Col>
          </Row>

          <Row className='product-list '>
            <Col md='3' className='products-sidebar  d-none d-md-block'>
              {/* shop by catgories */}
              <h6 className='text-uppercase mt-3'>shop by categories</h6>
              <div className='text-underline my-2'></div>
              {sidebarSubCategories.map((item, index) => (
                <Link
                  to={`/products?category=${category}&subcategory=${item}`}
                  key={index}
                  className='d-block mb-0 product-sidebar-link'
                  onClick={() => setFilterdProducts([])}
                >
                  {item}
                </Link>
              ))}
              <hr />
              {/* end of shop by catgories */}

              {/* shop by price */}
              <h6 className='text-uppercase mt-3'>sort by price</h6>
              <div className='text-underline my-2'></div>
              <Form className='my-3'>
                <FormGroup>
                  <Form.Label htmlFor='price-range'>
                    Range ₹0 to ₹{maxPrice}
                  </Form.Label>
                  <FormControl
                    id='price-range'
                    type='range'
                    name='price-range'
                    className='form-control-range'
                    value={maxRange}
                    onChange={handlePrice}
                  ></FormControl>
                </FormGroup>
              </Form>
              <hr />
              {/* end shop by price */}

              {/* filter by color */}

              <h6 className='text-uppercase mt-3'>filter by colors</h6>
              <div className='text-underline  my-2 '></div>
              <Form>
                <FormGroup className='d-flex mb-0'>
                  <Form.Check
                    name='red'
                    id='red'
                    onChange={() => handleCheck(`Red`)}
                    className='product-color-select mr-2'
                  />
                  <Form.Label htmlFor='red'>
                    Red ({calcColorProducts('Red')})
                  </Form.Label>
                </FormGroup>

                <FormGroup className='d-flex mb-0'>
                  <Form.Check
                    name='white'
                    id='white'
                    onChange={() => handleCheck('White')}
                    className='product-color-select mr-2'
                  />
                  <Form.Label htmlFor='white'>
                    White ({calcColorProducts('White')})
                  </Form.Label>
                </FormGroup>

                <FormGroup className='d-flex mb-0'>
                  <Form.Check
                    name='brown'
                    id='brown'
                    value='brown'
                    onChange={() => handleCheck('Brown')}
                    className='product-color-select mr-2'
                  />
                  <Form.Label htmlFor='brown'>
                    Brown ({calcColorProducts('Brown')})
                  </Form.Label>
                </FormGroup>

                <FormGroup className='d-flex mb-0'>
                  <Form.Check
                    name='black'
                    id='black'
                    onChange={() => handleCheck('Black')}
                    className='product-color-select mr-2'
                  />
                  <Form.Label htmlFor='black'>
                    Black ({calcColorProducts('Black')})
                  </Form.Label>
                </FormGroup>

                <FormGroup className='d-flex mb-0'>
                  <Form.Check
                    name='wood finish'
                    id='wood finish'
                    onChange={() => handleCheck('Wood Finish')}
                    className='product-color-select mr-2'
                  />
                  <Form.Label htmlFor='wood finish'>
                    Teak Finish ({calcColorProducts('Teak Finish')})
                  </Form.Label>
                </FormGroup>

                <FormGroup className='d-flex mb-0'>
                  <Form.Check
                    name='Yellow'
                    id='Yellow'
                    onChange={() => handleCheck('Yellow')}
                    className='product-color-select mr-2'
                  />
                  <Form.Label htmlFor='Yellow'>
                    Yellow ({calcColorProducts('Yellow')})
                  </Form.Label>
                </FormGroup>
              </Form>
              {/* end of filter by color */}
            </Col>

            <Col xs='10' md='9' className='my-0 '>
              {loading ? (
                <div className='d-flex justify-content-center'>
                  <Spinner variant='primary' animation='border' />
                </div>
              ) : error ? (
                <div className='d-flex justify-content-center'>
                  <Spinner variant='primary' animation='border' />
                </div>
              ) : (
                <>
                  {/* {filteredProducts.length === 1 && (
                  <h1 className='text-center'>No Products To Show</h1>
                )} */}
                  {/* {products.length === 0 && (
                    <h1 className='text-center'>No Products To Show</h1>
                  )} */}
                  <Row className='my-0 mb-4'>
                    {filteredProducts.length > 0
                      ? filteredProducts.map((product) => {
                          return (
                            
                              <Product key={product._id} {...product} />
                            
                          ); 
                        })
                      : products.map((product) => {
                          return <Product key={product._id} {...product} />
                            
                        })}
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default ProductsScreen
