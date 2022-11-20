import HomePage from '../pages/HomePage';

describe('Kane Taxi Tests Suite', () => {
  it('testLogin', () => {
    cy.login();
  });

  it('testLogout', () => {
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

  it('testEditTaxiDriver', () => {
    cy.login();
    cy.fixture('testTaxiDriverDetails').then((taxiDriverDetails) => {
      HomePage.openEditTaxiDriverByName(taxiDriverDetails.name);
    });

    cy.wait(3000)
    cy.xpath(
      `//*[@id="idCheckbox"]`
    ).click();

    cy.xpath(
        `//html/body/app-root/app-detalles-taxista/form/div/div[1]/div[1]/div[3]/button`
    ).click();

    cy.wait(3000)
    cy.xpath(`//*[@id="toast-container"]`).should(
        'not.be.empty'
    );
  });

  it('testExportTaxiDriverReport', () => {
    cy.login();

    cy.xpath(
      `//html/body/app-root/app-home/app-header/ul/li[4]/a`
    ).click();

    cy.xpath(
      `//html/body/app-root/app-reports/div/div[1]/div[1]/button`
    ).click();
    
    cy.xpath(
      `//html/body/app-root/app-reports/div/div[2]/div/div[1]/button`
    ).click();

  });

});
