import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import Review from './Review'

const ProductInfo = ({ description, reviews }) => {
  const [productDescription, setProductDescription] = useState(true)
  const [productReviews, setProductReviews] = useState(false)
  const [additionalInfo, setadditionalInfo] = useState(false)

  const [links, setLinks] = useState([])
  const container = useRef(null)

 

  const addActiveClass = (link) => {
    link.classList.add('active')
  }

  const removeActiveClass = () => {
    links.map((link) => link.classList.remove('active'))
  }

  const handleDescription = () => {
    removeActiveClass()
    addActiveClass(links[0])
    setProductReviews(false)
    setadditionalInfo(false)
    setProductDescription(true)
  }

  const handleAdditonalInfo = () => {
    removeActiveClass()
    addActiveClass(links[1])
    setProductReviews(false)
    setadditionalInfo(true)
    setProductDescription(false)
  }

  const handleReviews = () => {
    removeActiveClass()
    addActiveClass(links[2])
    setProductReviews(true)
    setadditionalInfo(false)
    setProductDescription(false)
  }

  useEffect(() => {
    const infoLinks = container.current.children
    setLinks(Object.values(infoLinks).map((link) => link))
    const addData = setTimeout(() => {}, [100])
    return () => clearTimeout(addData)
  }, [description, reviews])

  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            {/* links */}
            <div
              id='product-info-links'
              className='d-flex flex-wrap product-info-links'
              ref={container}
            >
              <h3
                className='text-capitalize product-info-link active '
                onClick={handleDescription}
              >
                description
              </h3>
              <h3
                className='text-capitalize product-info-link '
                onClick={handleAdditonalInfo}
              >
                additional info
              </h3>
              <h3
                className='text-capitalize product-info-link'
                onClick={handleReviews}
              >
                reviews
              </h3>
            </div>
            {/* end of links */}

            {/* info */}
            <div className='my-3'>
              <div className='description'>
                {productDescription && description && <p>{description}</p>}
              </div>

              <div className='additional-info'>
                {additionalInfo && (
                  <p>
                    E2 Chipboard*Amino lamination* Thickness : 15 mm* 3mm MDF
                    back panel with 2 side paper lamination with grooving method
                    * Normal edging* Full edging for all panel* PVC Bar handle
                    (8")* 2 Locks (at door)*Left 2 doors with one top shelf
                    (fix), one hanger pipe & one bottom shelf (adjustable)*Right
                    one doors with 3 shelf (top & bottom- adjustable, centre
                    fix)* No screw exposue on outer -use minifix*Double wall
                    carton *4 side normal polyform (15mm thickness) + void
                    filling * L- shape corner block (4mm thickness)
                  </p>
                )}
              </div>

              <div className='rating'>
                {productReviews && reviews.length === 0 && 
                  <h6>No reviews yet</h6>
               }
                {productReviews && (
                  reviews?.map((review) => (
                    <Review key={review._id} {...review} />
                  ))
                ) }
              </div>
            </div>
            {/* end of info */}
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductInfo
