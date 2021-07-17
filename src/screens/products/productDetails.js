import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, Button, Form, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiTruck } from 'react-icons/fi'
import { BiCheckShield } from 'react-icons/bi'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import axios from 'axios'
import { GlassMagnifier } from 'react-image-magnifiers'
import { ToastContainer } from 'react-toastify'

import Rating from '../../components/Rating'
import FeaturedProduct from '../../components/FeaturedProduct'
import ProductInfo from '../../components/ProductInfo'
import { getProductDetails } from '../../actions/productActions'
import { PRODUCT_DETAILS_RESET } from '../../constants/productConstants'
import { addItemToCart } from '../../actions/cartActions'
import { addItemToWishList } from '../../actions/wishListActions'
import Navbar from '../../components/Navbar'
import { onSuccess } from '../../components/toast'

const ProductDetails = ({ match }) => {
  const [imageNum, setImageNum] = useState(0)
  const [leftProduct, setLeftProduct] = useState(0)
  const [centerProduct, setCenterProduct] = useState(1)
  const [rightProduct, setRightProduct] = useState(2)
  const [quantity, setQuantity] = useState(1)
  const [similarProducts, setSimilarProducts] = useState([])
  const [similarProductsList, setSimilarProductsList] = useState([])
  const [showLoader, setShowLoader] = useState(true)

  const product = useSelector((store) => store.product)
  const { productDetails, loading } = product
  const {
    name,
    images,
    brand,
    rating,
    numReviews,
    countInStock,
    color,
    totalPrice,
    category,
    subCategory,
  } = productDetails

  const getSimilarProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://e-furniture-api.herokuapp.com/api/products?category=${category}&subCategory=${subCategory}`
      )
      setSimilarProducts(data)
      setSimilarProductsList(data.slice(0, 3))
    } catch (error) {
      console.log(error)
    }
  }, [category, subCategory])

  const dispatch = useDispatch()
  // back btn
  const history = useHistory()

  const oldPrice = (totalPrice * 1.1).toFixed(0)

  const thousand_separator = (num) => {
    if (num !== undefined) {
      let price = num.toString()
      price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return price
    }
  }

  const handlePushButton = () => {
    if (history.action === 'PUSH') {
      dispatch({ type: PRODUCT_DETAILS_RESET })
    }
  }

  const handleImage = (num) => {
    setImageNum(num)
  }

  const nextImage = () => {
    if (imageNum === 2) {
      setImageNum(0)
    } else {
      setImageNum(imageNum + 1)
    }
  }

  const prevImage = () => {
    if (imageNum === 0) {
      setImageNum(2)
    } else {
      setImageNum(imageNum - 1)
    }
  }

  const addToCart = () => {
    onSuccess('Added to cart')
    dispatch(addItemToCart(match.params.id, quantity))
  }
  const addToWishList = () => {
    onSuccess('Added to wishlist')
    dispatch(addItemToWishList(match.params.id, quantity))
  }

  const handleBuyNow = () => {
    addToCart()
    history.push('/cart')
  }

  const similarProductHandler = () => {
    if (rightProduct === similarProducts.length - 1) {
      // console.log('step-1')
      setLeftProduct(leftProduct + 1)
      setCenterProduct(centerProduct + 1)
      setRightProduct(0)
      setSimilarProductsList([
        similarProducts[leftProduct + 1],
        similarProducts[centerProduct + 1],
        similarProducts[0],
      ])
    } else if (centerProduct === similarProducts.length - 1) {
      // console.log('step-2')
      setLeftProduct(leftProduct + 1)
      setCenterProduct(0)
      setRightProduct(1)
      setSimilarProductsList([
        similarProducts[leftProduct + 1],
        similarProducts[0],
        similarProducts[1],
      ])
    } else if (leftProduct === similarProducts.length - 1) {
      // console.log('step-3')
      setLeftProduct(0)
      setCenterProduct(1)
      setRightProduct(2)
      setSimilarProductsList([
        similarProducts[0],
        similarProducts[1],
        similarProducts[2],
      ])
    } else if (rightProduct < similarProducts.length - 1) {
      // console.log('step-4')
      setLeftProduct(leftProduct + 1)
      setCenterProduct(centerProduct + 1)
      setRightProduct(rightProduct + 1)
      setSimilarProductsList([
        similarProducts[leftProduct + 1],
        similarProducts[centerProduct + 1],
        similarProducts[rightProduct + 1],
      ])
    }
  }

  useEffect(() => {
    handlePushButton()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
    getSimilarProducts()

    // eslint-disable-next-line
  }, [dispatch, match, category])

  useEffect(() => {
    const loader = setTimeout(() => {
      setShowLoader(false)
    }, 500)
    return () => clearTimeout(loader)
  }, [showLoader])

  return (
    <>
      <Navbar />
      <section id='productDetails' className='product-details'>
        <div className='container-xl'>
          <ToastContainer />
          <Row>
            <Col className='mt-4'>
              <Link to='/'>
                <Button type='button' className='add-to-cart-btn'>
                  GO BACK
                </Button>
              </Link>
            </Col>
          </Row>
          {loading ? (
            <div className='d-flex justify-content-center my-5'>
              <h1>
                <Spinner variant='info' />
              </h1>
            </div>
          ) : (
            <Row>
              {/* images */}
              <Col md='6' className='my-4'>
                <div className='d-flex justify-content-center align-items-center'>
                  <h1 className='prev-btn'>
                    <FiArrowLeft onClick={prevImage} />
                  </h1>

                  <div>
                    {showLoader ? (
                      <div className='d-flex justify-content-center'>
                        <Spinner variant='info' animation='border' />
                      </div>
                    ) : (
                      images &&
                      images[imageNum] && (
                        <GlassMagnifier
                          imageSrc={images && images[imageNum]}
                          imageAlt='Example'
                          largeImageSrc={images && images[imageNum]} // Optional
                        />
                      )
                    )}
                  </div>

                  <h1 className='next-btn'>
                    <FiArrowRight onClick={nextImage} />
                  </h1>
                </div>
                {/* single images */}
                <Row className='single-image-photos mt-3'>
                  {/* single image */}
                  <Col
                    xs='2'
                    className='single-image-photo '
                    onMouseOver={() => handleImage(0)}
                  >
                    <Image src={images && images[0]} fluid />
                  </Col>
                  {/* end of single image */}
                  {/* single image */}
                  <Col
                    xs='2'
                    className='single-image-photo '
                    onMouseOver={() => handleImage(1)}
                  >
                    <Image src={images && images[1]} fluid />
                  </Col>
                  {/* end of single image */}
                  {/* single image */}
                  <Col
                    xs='2'
                    className='single-image-photo '
                    onMouseOver={() => handleImage(2)}
                  >
                    <Image src={images && images[2]} fluid />
                  </Col>{' '}
                  {/* end of single image */}
                </Row>
                {/* end of single images */}
              </Col>
              {/* end of  images */}

              {/* info */}
              <Col md='6' className='my-3'>
                <h3>{name}</h3>

                <h6 className='brand'>By {brand}</h6>

                {/* price */}
                <div className='featured-product-price mb-0'>
                  <h6 className='offer-price mb-0 mr-2 '>
                    <strong>₹{thousand_separator(totalPrice)}</strong>
                  </h6>
                  <p className='real-price mb-0 mr-3 '>
                    ₹{thousand_separator(oldPrice)}
                  </p>
                  <p className='mb-0'>including all taxes</p>
                </div>
                {/* end of price */}

                {/* rating */}
                <div className='ratings d-flex align-items-center my-1 '>
                  {' '}
                  <h5 className='mr-3'>
                    <Rating rating={rating} />
                  </h5>{' '}
                  <p className='mb-0'>{numReviews} Reviews</p>
                </div>
                {/* end of rating */}

                <hr />
                <Row className='product-details-info  mx-auto my-1'>
                  {/* product details single info item */}
                  <Col
                    xs='4'
                    className='product-details-info-item text-center '
                  >
                    <Row className='justify-content-around text-center px-0'>
                      <Col xs='12' md='3'>
                        <h3 className='product-details-info-item-icon px-0'>
                          <BiCheckShield />
                        </h3>
                      </Col>

                      <Col xs='12' md='9'>
                        <h6 className='mb-0 pl-0 mx-auto'>
                          36 Months Warranty<sup>*</sup>
                        </h6>
                      </Col>
                    </Row>
                  </Col>
                  {/* end product details single info item */}

                  {/* product details single info item */}
                  <Col
                    xs='4'
                    className='product-details-info-item text-center px-1'
                  >
                    <Row className='text-center pr-1'>
                      <Col xs='12' md='3'>
                        <h3 className='product-details-info-item-icon '>
                          <HiOutlineCurrencyRupee />
                        </h3>
                      </Col>

                      <Col xs='12' md='3' className='mb-0'>
                        <h6>Easy Returns</h6>
                      </Col>
                    </Row>
                  </Col>
                  {/* end product details single info item */}

                  {/* product details single info item */}
                  <Col
                    xs='4'
                    className='product-details-info-item  text-center'
                  >
                    <Row>
                      <Col xs='12' md='3'>
                        <h3 className='product-details-info-item-icon '>
                          <FiTruck />
                        </h3>
                      </Col>

                      <Col
                        xs='12'
                        md='9'
                        className='d-flex pl-1   align-items-center'
                      >
                        <h6 className='mb-0  pl-0'>
                          Free Delivery<sup>*</sup>
                        </h6>
                      </Col>
                    </Row>
                  </Col>
                  {/* end product details single info item */}
                </Row>

                <hr />

                {/* count in stock */}
                <div className='count-in-stock d-flex align-items-center'>
                  <h6>
                    {' '}
                    <strong>Count In Stock : </strong>{' '}
                  </h6>
                  <h6 className='ml-1'>
                    {' '}
                    <strong style={{ fontSize: '1.1rem' }}>
                      {countInStock}
                    </strong>{' '}
                    items left in stock
                  </h6>
                </div>
                {/* end of count in stock */}

                {/* product color info */}
                <div className='product-color d-flex align-items-center'>
                  <h6>
                    <strong>Color: </strong>{' '}
                  </h6>
                  <h6 className='ml-1'>
                    {' '}
                    <strong style={{ fontSize: '1.1rem' }}>{color}</strong>{' '}
                  </h6>
                </div>
                {/* end of product color info */}

                {/* quantity */}
                <Form inline='true'>
                  <Form.Group>
                    <Form.Label className='mr-2'>
                      <strong>Quantity</strong> :{' '}
                    </Form.Label>
                    <Form.Control
                      as='select'
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      custom
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                {/* end of quantity */}

                <div className='d-flex my-3'>
                  <Button
                    type='button'
                    className='add-to-cart-btn d-block w-100 mx-1 '
                    onClick={addToCart}
                  >
                    Add To Cart
                  </Button>

                  <Button
                    type='button'
                    className='add-to-cart-btn d-block w-100 mx-1 '
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>

                  <Button
                    type='button'
                    className='add-to-cart-btn d-block w-100 mx-1 '
                    onClick={addToWishList}
                  >
                    Add To WishList
                  </Button>
                </div>
              </Col>
              {/* end of info */}
            </Row>
          )}
          <Row>
            <Col>
              {/* product info */}
              <div
                id='o=product-info-jumbo'
                className='product-info-jumbo my-4'
              >
                <ProductInfo {...productDetails} />
              </div>
              {/* end of product info */}
            </Col>
          </Row>

          {/* similar products */}
          <Row>
            <div className='d-none d-sm-flex justify-content-center align-items-center my-5'>
              <h1 className='prev-btn'>
                {similarProducts.length > 3 && (
                  <FiArrowLeft onClick={similarProductHandler} />
                )}
              </h1>
              <div className='d-flex '>
                {similarProductsList.length > 0 && (
                  <>
                    {similarProductsList[0] && (
                      <FeaturedProduct
                        key={similarProductsList[0]._id}
                        {...similarProductsList[0]}
                      />
                    )}

                    {similarProductsList[1] && (
                      <FeaturedProduct
                        key={similarProductsList[1]._id}
                        {...similarProductsList[1]}
                      />
                    )}

                    {similarProductsList[2] && (
                      <FeaturedProduct
                        key={similarProductsList[2]._id}
                        {...similarProductsList[2]}
                      />
                    )}
                  </>
                )}
              </div>

              <h1 className='next-btn'>
                {similarProducts.length > 3 && (
                  <FiArrowRight onClick={similarProductHandler} />
                )}
              </h1>
            </div>
          </Row>
          {/* end of similar products */}
        </div>
      </section>
    </>
  )
}

export default ProductDetails
