import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { GoSearch } from 'react-icons/go'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
      setKeyword('')
    } else {
      history.push('/')
      setKeyword('')
    }
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group className='d-flex align-items-center mb-0 my-1'>
          <Form.Control
            type='text'
            placeholder='search...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button type='submit'>
            {' '}
            <div>
              <GoSearch />
            </div>
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SearchBox
