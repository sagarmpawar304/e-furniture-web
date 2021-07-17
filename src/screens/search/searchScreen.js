import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Container,Row} from 'react-bootstrap'
import Navbar from '../../components/Navbar'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Product from '../../components/Product'


const SearchScreen = ({match,history}) => {
  const [products, setProducts] = useState([])
  const [loading ,setLoading] = useState(false)
  const [message,setMessage] = useState('')
  
  const keyword = match.params.keyword

  const getProducts = async() => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://e-furniture-api.herokuapp.com/api/products/search/${keyword}`
      )
      setLoading(false)
      if(data.length === 0) {
        setProducts([])
        return setMessage('No Match found')
      }
      setProducts(data)
    } catch (error) {
       setLoading(false)
      setMessage('Something Went Wrong.Try Again later')
    }
  }

  useEffect(() => {
    getProducts()
    setMessage('')
    // eslint-disable-next-line
  },[keyword])
  return (
    <>
      <Navbar />
      <Container style={{ minHeight: '85vh' }}>
        <Row className='my-5'>
          {loading && (
            <Row className='mx-auto'>
              <Loader />
            </Row>
          )}
          {message && (
            <Row className='mx-auto'>
              <Message className='info' message={message} />
            </Row>
          )}

          <Row>
            {products.length > 0 &&
              products.map((product) => (
                <Product key={product._id} {...product} />
              ))}
          </Row>
        </Row>
      </Container>
    </>
  )
}

export default SearchScreen
