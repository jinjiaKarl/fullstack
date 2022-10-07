import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('Blog', () => {
  let mockSetUpdate
  let component
  beforeEach(() => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'Test url',
      likes: 0,
      id: 1
    }
    const user = {
      username: 'Test user'
    }
    mockSetUpdate = jest.fn()
    component = render(
      <Blog blog={blog} user={user} setUpdate={mockSetUpdate} />
    )
  })
  test('renders title and author', () => {
    const div = component.container.querySelector('.blogDiv')
    expect(div).toHaveTextContent('Test blog')
    expect(div).toHaveTextContent('Test author')
    expect(div).not.toHaveTextContent('Test url')
    expect(div).not.toHaveTextContent('likes')
  })

  test('renders url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = component.container.querySelector('.blogFullDiv')
    expect(div).toHaveTextContent('Test url')
  })

  test('clicking the like button twice calls event handler twice', async () => {
    var mock = new MockAdapter(axios)
    const data = {}
    mock.onPut('/api/blogs/1').reply(200, data)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockSetUpdate.mock.calls).toHaveLength(2)
    mock.reset()
  })
})
