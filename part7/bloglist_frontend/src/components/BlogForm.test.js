import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm', () => {
  let mockAddBlog
  let component
  beforeEach(() => {
    mockAddBlog = jest.fn(
      (e) => e.preventDefault() // must prevent default for form
    )
    let mockSetAuthor = jest.fn()
    let mockSetTitle = jest.fn()
    let mockSetUrl = jest.fn()

    component = render(
      <BlogForm
        addBlog={mockAddBlog}
        setAuthor={mockSetAuthor}
        setTitle={mockSetTitle}
        setUrl={mockSetUrl}
      />
    )
  })

  test('blog is created ', async () => {
    const user = userEvent.setup()
    const button = component.container.querySelector('.submitButton')
    await user.click(button)
    expect(button).toHaveTextContent('create')
    expect(mockAddBlog.mock.calls).toHaveLength(1)
  })
})
