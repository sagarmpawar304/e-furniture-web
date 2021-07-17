import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, Table, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Navbar from '../../components/Navbar'
import { thousand_separator } from '../../utils/utils'

import { orderMyOrderMyList } from '../../actions/orderAction'

const ProfilScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderMyList = useSelector((state) => state.orderMyList)
  const {
    loading: orderLoading,
    orders,
    error: orderError,
    page,
    pages,
  } = orderMyList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(orderMyOrderMyList(pageNumber))
    }
  }, [userInfo, history, dispatch, pageNumber])

  return (
    <div>
      <Navbar />
      <div className='container-lg myorders'>
        <Row>
          <Col xs='11'>
            <h6 className='mt-3'>
              <span className='mr-2'>
                <Link to='/users'>Your Account</Link>
              </span>

              <span className='mr-2'>{'>'}</span>
              <span>
                <Link to='/users/orders'>Your Orders</Link>
              </span>
            </h6>
          </Col>
        </Row>

        <Row>
          <Col xs='11' className='mx-auto'>
            <h3 className='my-3'>Your Orders</h3>
            {orderLoading ? (
              <Loader />
            ) : !orders ? (
              <Message message={`No Orders placed`} />
            ) : orderLoading ? (
              <Message variant='danger' message={orderError} />
            ) : (
              <>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className='table-sm text-center'
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>INFO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>₹{thousand_separator(order.totalPrice)}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <span style={{ color: 'red' }}>Not Paid</span>
                          )}
                        </td>

                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <span style={{ color: 'red' }}>Not Delivered</span>
                          )}
                        </td>

                        <td>
                          <LinkContainer to={`/orders/${order._id}`}>
                            <Button className='btn-sm'>Info</Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {pages > 1 && (
                  <Pagination>
                    {[...Array(pages).keys()].map((x) => (
                      <LinkContainer key={x + 1} to={`/profile/page/${x + 1}`}>
                        <Pagination.Item active={x + 1 === page}>
                          {x + 1}
                        </Pagination.Item>
                      </LinkContainer>
                    ))}
                  </Pagination>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProfilScreen
