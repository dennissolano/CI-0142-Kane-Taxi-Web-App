class ReportsPage {
  elements = {
    taxiDriversButton: () => cy.xpath("//button[text()=' Taxistas ']"),
    customersButton: () => cy.xpath("//button[text()=' Clientes ']"),
    inactiveTaxiDriversButton: () => cy.xpath("//button[text()=' Taxistas Inactivas ']"),

    exportCustomerReportToExcelButton: () =>
      cy.xpath("//table[@id='tableClients']//following-sibling::button"),
    exportTaxiDriversReportToExcelButton: () =>
      cy.xpath("//table[@id='tableDrivers']//following-sibling::button"),

    enableTaxiDriverByNameButton: (driverName) =>
      cy.xpath(
        `//div[@id='inactiveUsers']//a[contains(text(), ' ${driverName}' )]//ancestor::div[contains(@class,'border')]//child::div[@class='buttonActivate']//button`
      ),

    taxiDriverEnabledMessage: () =>
      cy.xpath("//div[contains(@aria-label, 'Se reactivó la usuaria al sistema')]")
  };

  openTaxiDriversInfo() {
    this.elements.taxiDriversButton().click();
  }

  downloadtTaxiDriversReport() {
    this.openTaxiDriversInfo();
    this.elements.exportTaxiDriversReportToExcelButton().click();
  }

  openCustomersInfo() {
    this.elements.customersButton().click();
  }

  downloadCustomersReport() {
    this.openCustomersInfo();
    this.elements.exportCustomerReportToExcelButton().click();
  }

  openInactiveTaxiDrivers() {
    this.elements.inactiveTaxiDriversButton().click();
  }

  enableInactiveTaxiDriverByName(driverName) {
    this.openInactiveTaxiDrivers();
    this.elements.enableTaxiDriverByNameButton(driverName).click();
    this.elements.customersButton().should('exist').and('be.visible');
    // Cypress automatically closes the confirmation alert window.
  }
}

module.exports = new ReportsPage();
