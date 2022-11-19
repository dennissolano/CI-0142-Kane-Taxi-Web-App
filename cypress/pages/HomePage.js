class HomePage {
  openTaxiDriverDetailsByName(name) {
    cy.xpath(
      `//li[contains(text(), '${name}')]/ancestor::div[contains(@class, 'card')][2]//div[contains(text(), 'Detalles')]`
    ).click();
  }
}
module.exports = new HomePage();
