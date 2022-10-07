describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })


  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('test')
      cy.get('input:last').type('123456')
      // cy.get('.loginSubmitButton').click()
      // cy.get('button').click()
      cy.contains('login').click()
      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('test')
      cy.get('input:last').type('111')
      cy.contains('login').click()
      cy.get('.notificationDiv')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css',  'border-style', 'solid')
      cy.get('html').should('not.contain', 'test logged in')
    })
  })
  // each test starts from zero as far as the browser is concerned.
  // All changes to the browser's state are reversed after each test.
  // 因为每个测试都是从零开始的，所以需要在每个测试中都登录一次
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: '123456' })
      cy.createBlog({ title: 'test blog', author: 'test author', url: 'test url' })
    })

    it('A blog can be created and deleted', function() {
      cy.contains('new blog').click()
      cy.get('input[name="Title"]').type('test blog1')
      cy.get('input[name="Author"]').type('test author1')
      cy.get('input[name="Url"]').type('test url1')
      cy.get('.submitButton').click()
      cy.contains('test blog1 test author1').contains('view').click()
      // eq(1)表示数组第二个元素
      cy.get('.blogFullDiv').eq(1).contains('remove').click()
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1 likes')
    })

    it('blogs are ordered by likes', function() {
      cy.createBlog({ title: 'test blog1', author: 'test author1', url: 'test url1', likes: 1 })
      cy.createBlog({ title: 'test blog2', author: 'test author2', url: 'test url2', likes: 2 })
      cy.createBlog({ title: 'test blog3', author: 'test author3', url: 'test url3', likes: 3 })
      cy.createBlog({ title: 'test blog4', author: 'test author4', url: 'test url4', likes: 4 })
      cy.createBlog({ title: 'test blog5', author: 'test author5', url: 'test url5', likes: 5 })
      cy.get('.blogDiv').eq(0).should('contain', 'test blog5')
    })
  })

})

