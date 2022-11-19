class LoginPage {
  elements = {
    emailInput: () => cy.xpath("//input[contains(@name,'email')]"),
    passwordInput: () => cy.xpath("//input[contains(@name,'password')]"),
    loginButton: () => cy.xpath("//button[contains(text(), 'Ingresar')]")
  };

  visit() {
    cy.visit(Cypress.config().baseUrl);
  }

  login(email, password) {
    this.elements.emailInput().clear().type(email);
    this.elements.passwordInput().clear().type(password);
    this.elements.loginButton().click();
  }
}
module.exports = new LoginPage();
