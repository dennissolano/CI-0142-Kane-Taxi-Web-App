const {xorBy} = require('cypress/types/lodash');

class ReportsPage {
  elements = {
    taxiDriversButton: () => cy.xpath("//button[text()=' Taxistas ']"),
    customersButton: () => cy.xpath("//button[text()=' Clientes ']"),
    inactiveTaxiDriversButton: () => cy.xpath("//button[text()=' Taxistas Inactivas ']"),

    // Export to Excel buttons.
    exportCustomerReportToExcelButton: () =>
      cy.xpath("//table[@id='tableClients']//following-sibling::button"),
    exportTaxiDriversReportToExcelButton: () =>
      cy.xpath("//table[@id='tableDrivers']//following-sibling::button")
  };

  openTaxiDriversInfo() {
    this.elements.taxiDriversButton().click();
  }

  downloadtTaxiDriversReport() {
    this.openTaxiDriversInfo();
    this.exportTaxiDriversReportToExcelButton().click();
  }

  openCustomersInfo() {
    this.elements.customersButton().click();
  }

  downloadCustomersReport() {
    this.openCustomersInfo();
    this.exportCustomerReportToExcelButton().click();
  }

  openInactiveTaxiDrivers() {
    this.elements.inactiveTaxiDriversButton().click();
  }
}

module.exports = new ReportsPage();
