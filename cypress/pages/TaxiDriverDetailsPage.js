class TaxiDriverDetailsPage {
  elements = {
    completeDocumentsReviewButton: () => cy.xpath("//button[text()='Completar Revisión']"),
    disableAccountButton: () => cy.xpath("//button[text()='Desactivar Cuenta']"),
    accountDisabledMessage: () =>
      cy.xpath(
        "//div[contains(text(), 'Se bloqueo a la usuaria para que no vuelva ha acceder a la aplicación')]"
      )
  };

  disableAccount() {
    this.elements.disableAccountButton().click();
    this.elements.accountDisabledMessage().should('exist').and('be.visible');
  }

  completeDocumentsReview() {
    this.elements.completeDocumentsReviewButton().click();
  }
}

module.exports = new TaxiDriverDetailsPage();
