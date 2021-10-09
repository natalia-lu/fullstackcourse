describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
	const user = {
      name: 'New User',
      username: 'newuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('newuser')
      cy.get('#password').type('password')
      cy.get('button').click()
	  cy.contains('New User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('newuser')
      cy.get('#password').type('wrong')
      cy.get('button').click()
	  cy.contains('wrong username or password')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'newuser', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
	  cy.get('#author').type('Test')
	  cy.get('#url').type('www.test.org')
      cy.get('#create-button').click()

      cy.contains('a blog created by cypress')
    })
  })
  
  describe('and a blog exists', function () {
    beforeEach(function () {
	  cy.login({ username: 'newuser', password: 'password' })
      cy.createBlog({
        title: 'another blog cypress',
        author: 'Test',
		url: 'www.test.org'
      })
    })
	
	it('A blog can be liked', function() {
	  cy.contains('another blog cypress').contains('view').click()
	  cy.contains('another blog cypress').contains('likes 0')
	  cy.contains('another blog cypress').contains('like').click()
	  cy.contains('another blog cypress').contains('likes 1')
	})
	
	it('A blog can be deleted by the same user who created it', function() {
	  cy.contains('another blog cypress').contains('view').click()
	  cy.contains('another blog cypress').contains('remove').click()
	  cy.contains('another blog cypress').should('not.exist')
	})
  })
  
  describe('and multiple blogs exists', function () {
	beforeEach(function () {
	  cy.login({ username: 'newuser', password: 'password' })
      cy.createBlog({
        title: 'First blog cypress',
        author: 'Test',
		url: 'www.test.org'
      })
	  cy.createBlog({
        title: 'Second blog cypress',
        author: 'Test',
		url: 'www.test.org'
      })
	  cy.createBlog({
        title: 'Third blog cypress',
        author: 'Test',
		url: 'www.test.org'
      })
    })
	
	it('Blogs are ordered by the number of likes', function() {
	  cy.contains('Second blog cypress').as('secondBlog')
	  cy.get('@secondBlog').contains('view').click()
	  cy.get('@secondBlog').contains('likes 0')
	  cy.get('@secondBlog').contains('like').click()
	  cy.get('@secondBlog').contains('likes 1')
	  cy.contains('Third blog cypress').as('thirdBlog')
	  cy.get('@thirdBlog').contains('view').click()
	  cy.get('@thirdBlog').contains('likes 0')
	  cy.get('@thirdBlog').contains('like').click()
	  cy.get('@thirdBlog').contains('likes 1')
	  cy.get('@thirdBlog').contains('like').click()
	  cy.get('@thirdBlog').contains('likes 2')
	  cy.get('.blog').eq(0).should('contain.text', 'Third blog cypress')
	  cy.get('.blog').eq(1).should('contain.text', 'Second blog cypress')
	  cy.get('.blog').eq(2).should('contain.text', 'First blog cypress')
	})	
  })	  
})