describe('Basic User processes on the Sysytem', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  const newUser = {
    name: 'New User',
    email: 'newuser@mail.com',
    password: 'password'
  };

  const existingUser = {
    name: 'Emma Will',
    email: 'emma.w@email.com',
    password: 'ewill2024'
  };

  describe('User Registration Process', () => {
    beforeEach(() => {
      cy.visit('/index.html');
    });

    it('should register a new user', () => {
      cy.get('.popup').should('not.be.visible');
      cy.get('#registerBtn').click();
      cy.get('#registerName').clear().type(newUser.name);
      cy.get('#registerEmail').clear().type(newUser.email);
      cy.get('#registerPassword').clear().type(newUser.password);
      cy.get('#REGISTER').click();
      cy.get('.toast.success').should('be.visible');
    });

    it('should show error message for existing user', () => {
      cy.get('.popup').should('not.be.visible');
      cy.get('#registerBtn').click();
      cy.get('#registerName').type(existingUser.name);
      cy.get('#registerEmail').type(existingUser.email);
      cy.get('#registerPassword').type(existingUser.password);
      cy.get('#REGISTER').click();
      cy.get('.toast.error').should('be.visible');
    });
  });

  describe('User Login Process', () => {
    beforeEach(() => {
      cy.visit('/index.html');
    });

    it('should login a registered user', () => {
      cy.get('.popup').should('not.be.visible');
      cy.get('#loginBtn').click();
      cy.get('#loginEmail').type('emma.w@email.com');
      cy.get('#loginPassword').type('ewill2024');
      cy.get('#LOGIN').click();
      cy.url().should('include', '/products.html');
    });

    it('should show error message for invalid credentials', () => {
      cy.get('.popup').should('not.be.visible');
      cy.get('#loginBtn').click();
      cy.get('#loginEmail').type('user75@gmail.com');
      cy.get('#loginPassword').type('password');
      cy.get('#LOGIN').click();
      cy.get('.toast.error').should('be.visible');
    });
  });
  describe('User viewing products and adding to cart', () => {
    beforeEach(() => {
      cy.visit('/products.html');
    });

    it('should show products page for logged in user', () => {
      cy.url().should('include', '/products.html');
    });

    it('should add products to cart', () => {
      cy.get('.add-to-cart').first().click();
      cy.get('.toast.success').should('be.visible');
    });
  });

  describe('User Logout Process', () => {
    beforeEach(() => {
      cy.visit('/products.html');
    });

    it('should logout a logged in user', () => {
      cy.get('#logoutBtn').click();
      cy.url().should('include', '/index.html');
    });
  });
});

describe('Admin User processes on the Sysytem', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  const admin = {
    name: 'Admin Will',
    email: 'admin@gmail.com',
    password: 'admin'
  };

  describe('Admin Login Process', () => {
    beforeEach(() => {
      cy.visit('/index.html');
    });

    it('should login a registered admin', () => {
      cy.get('.popup').should('not.be.visible');
      cy.get('#adminLoginBtn').click();
      cy.get('#adminEmail').type(admin.email);
      cy.get('#adminPassword').type(admin.password);
      cy.get('#LOGIN').click();
      cy.url().should('include', '/products.html');
    });
    it('should show error message for invalid admin credentials', () => {
      cy.get('.popup').should('not.be.visible');
      cy.get('#adminLoginBtn').click();
      cy.get('#adminEmail').type('adminuser@gmail.com');
      cy.get('#adminPassword').type('password');
      cy.get('#LOGIN').click();
      cy.get('.toast.error').should('be.visible');
    });
  });
  describe('Admin viewing products and performing CRUD operations', () => {
    beforeEach(() => {
      cy.visit('/products.html');
    });

    it('should show products page for logged in admin', () => {
      cy.url().should('include', '/products.html');
    });

    it('should add products to the inventory', () => {
      cy.get('.add-product').click();
      cy.get('#productName').type('New Product');
      cy.get('#productPrice').type('1000');
      cy.get('#productQuantity').type('10');
      cy.get('#ADD').click();
      cy.get('.toast.success').should('be.visible');
    });
  });
});