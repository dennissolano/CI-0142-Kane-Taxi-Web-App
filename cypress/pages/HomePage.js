class HomePage {
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
}
module.exports = new HomePage();
