import HomePage from '../pages/HomePage';

describe('Kane Taxi Tests Suite', () => {
  it.skip('testLogin', () => {
    cy.login();
  });

  it.skip('testLogout', () => {
    cy.login();
    cy.logout();
  });

  it('testTaxiDriverDetails', () => {
    cy.login();
    cy.fixture('testTaxiDriverDetails').then((taxiDriverDetails) => {
      HomePage.openTaxiDriverDetailsByName(taxiDriverDetails.name);

      // ToDo: refactor.
      cy.xpath("//strong[contains(text(), 'Nombre')]/parent::*").should(
        'contain.text',
        taxiDriverDetails.name
      );

      cy.xpath("//strong[contains(text(), 'Cédula')]/parent::*").should(
        'contain.text',
        taxiDriverDetails.id
      );

      cy.xpath("//strong[contains(text(), 'Placa')]/parent::*").should(
        'contain.text',
        taxiDriverDetails.carId
      );

      cy.xpath("//strong[contains(text(), 'Teléfono')]/parent::*").should(
        'contain.text',
        taxiDriverDetails.phoneNumber
      );

      cy.xpath("//strong[contains(text(), 'Correo Electrónico')]/parent::*").should(
        'contain.text',
        taxiDriverDetails.email
      );

      cy.xpath("//strong[contains(text(), 'Estado')]/parent::*").should(
        'contain.text',
        taxiDriverDetails.status
      );
    });

    cy.logout();
  });
});
