import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OurProducts = () => {
  const backToTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }
  return (
    <section id='our-products' className='py-2 bg-light'>
      <div className='container-xl'>
        <Row className='my-3'>
          <Col xs='10' className='mx-auto text-center'>
            <h1 className='text-uppercase our-furniture-title'>
              Our Furniture
            </h1>
          </Col>
        </Row>

        <Row className='mb-2'>
          <Col xs='6' className=' mx-auto' onClick={backToTop}>
            <div className='our-furniture-product'>
              <Link to={`/products?category=sofas&subcategory=3-seater-sofa`}>
                <div className='img-container'>
                  <Image
                    src='/images/sofas/3_seater_sofas/Rico-3-Seater-Sofa-in-Blue-Colour-3.jpg'
                    fluid
                    className='product-img'
                  />
                  <div className='our-furniture-info'>
                    <h5 className='mb-0'>Sofa sets</h5>
                    <h5 className='mb-0'>50+ products</h5>
                  </div>
                </div>
              </Link>
            </div>
          </Col>

          <Col xs='6' className='  mx-auto' onClick={backToTop}>
            <div className='our-furniture-product '>
              <Link to={`/products?category=beds`}>
                <div className='img-container'>
                  <Image
                    src='/images/Comfortable-Modern-Bedroom-Furniture-Wooden-King-Size-Bed-Design.jpg'
                    fluid
                    className='product-img'
                  />
                  <div className='our-furniture-info'>
                    <h5 className='mb-0'>Beds</h5>
                    <h5 className='mb-0'>50+ products</h5>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs='4' className='my-2  mx-auto' onClick={backToTop}>
            <div className='our-furniture-product '>
              <Link to='/products?category=storage'>
                <div className='img-container'>
                  <Image
                    src='/images/storage/wardrobes/Amaze-3-Door-Wardrobe-in-Rich-Ebony-Finish-1.jpg'
                    fluid
                    className='product-img'
                  />
                  <div className='our-furniture-info'>
                    <h5 className='mb-0'>Storage</h5>
                    <h5 className='mb-0'>50+ products</h5>
                  </div>
                </div>
              </Link>
            </div>
          </Col>

          <Col xs='4' className='my-2  mx-auto' onClick={backToTop}>
            <div className='our-furniture-product'>
              <Link to='/products?category=chairs'>
                <div className='img-container'>
                  <Image
                    src='/images/chairs/iconic_chairs/MultiColour-Patch-Iconic-Chair-1.jpg'
                    fluid
                    className='product-img'
                  />
                  <div className='our-furniture-info'>
                    <h5 className='mb-0'>Chairs</h5>
                    <h5 className='mb-0'>50+ products</h5>
                  </div>
                </div>
              </Link>
            </div>
          </Col>

          <Col xs='4' className='my-2  mx-auto' onClick={backToTop}>
            <div className='our-furniture-product text-center'>
              <Link to='/products?category=dining'>
                <div className='img-container'>
                  <Image
                    src='/images/dining/dining_sets/Magdalena-6-seater-Dining-Set-in-Brown-Colour-1.jpg'
                    fluid
                    className='product-img'
                  />
                  <div className='our-furniture-info'>
                    <h5 className='mb-0'>Dining Sets</h5>
                    <h5 className='mb-0'>50+ products</h5>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default OurProducts
