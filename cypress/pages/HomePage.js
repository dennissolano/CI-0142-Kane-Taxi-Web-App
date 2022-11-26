class HomePage {
  elements = {
    searchBar: () => cy.xpath("//input[@name='driverName']"),
    searchButton: () => cy.xpath("//button[text()='Buscar']")
  };

  openTaxiDriverDetailsByName(name) {
    cy.xpath(
      `//li[contains(text(), '${name}')]/ancestor::div[contains(@class, 'card')][2]//div[contains(text(), 'Detalles')]`
    ).click();
  }

  openEditTaxiDriverByName(name) {
    cy.xpath(
      `//li[contains(text(), '${name}')]/ancestor::div[contains(@class, 'card')][2]//div[contains(text(), 'Editar')]`
    ).click();
  }

  searchUserByFirstName(userName) {
    cy.log(`Searching user ${userName}`);
    this.elements.searchBar().clear().type(userName);
    this.elements.searchButton().click();
  }
}
module.exports = new HomePage();
