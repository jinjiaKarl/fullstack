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

  // each test starts from zero as far as the browser is concerned.
  // All changes to the browser's state are reversed after each test.
  // 因为每个测试都是从零开始的，所以需要在每个测试中都登录一次
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

})

