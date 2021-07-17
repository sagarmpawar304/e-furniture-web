import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import FeaturedProduct from '../components/FeaturedProduct'
import { getFeaturedProducts } from '../actions/productActions'

const FeaturedProducts = () => {
  const dispatch = useDispatch()

  const productsFeatured = useSelector((store) => store.productsFeatured)
  const { featuredProducts } = productsFeatured
  // console.log(featuredProducts)
  useEffect(() => {
    dispatch(getFeaturedProducts())
  }, [dispatch])

  return (
    <section className='featured '>
      <div className='container-xl'>
        <Row className='mt-1 mb-0'>
          <Col xs='10' className='mx-auto  text-center'>
            <h1 className='text-uppercase'>Featured products</h1>
          </Col>
        </Row>
        <Row>
          {featuredProducts.map((product) => {
              return <FeaturedProduct key={product._id} {...product} />
          })}
          <FeaturedProduct />
        </Row>
      </div>
    </section>
  )
}

export default FeaturedProducts
