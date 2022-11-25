import HomePage from '../pages/HomePage';
import NavBar from '../pages/commons/NavBar';
import ReportsPage from '../pages/ReportsPage';

describe('Kane Taxi Tests Suite', () => {
  it('testLogin', () => {
    cy.log('Test ID: 1');
    cy.login();
  });

  it('testLogout', () => {
    cy.login();
    cy.logout();
  });

  it('testTaxiDriverDetails', () => {
    cy.log('Test ID: 2');
    cy.login();
    cy.fixture('testTaxiDriverDetails').then((taxiDriverDetails) => {
      HomePage.openTaxiDriverDetailsByName(taxiDriverDetails.name);

      let driver = {
        'Nombre': taxiDriverDetails.name,
        'Cédula': taxiDriverDetails.id,
        'Placa': taxiDriverDetails.carId,
        'Teléfono': taxiDriverDetails.phoneNumber,
        'Correo Electrónico': taxiDriverDetails.email,
        'Estado': taxiDriverDetails.status
      }

      Object.entries(driver).forEach(([key, value]) => {
        cy.xpath("//strong[contains(text(), '" + key + "')]/parent::*").should(
          'contain.text',
          value
        );
      });
      
    });

    
    cy.logout();
  });

  it('testEditTaxiDriver', () => {
    cy.log('Test ID: 3');
    cy.login();

    cy.fixture('testTaxiDriverDetails').then((taxiDriverDetails) => {
      HomePage.openEditTaxiDriverByName(taxiDriverDetails.name);
    });

    cy.wait(1000);
    cy.xpath(`//*[@id="idCheckbox"]`).click();

    cy.xpath(
      `//html/body/app-root/app-detalles-taxista/form/div/div[1]/div[1]/div[3]/button`
    ).click();

    cy.wait(1000);
    cy.xpath(`//*[@id="toast-container"]`).should('not.be.empty');


  });

  it('testExportTaxiDriverReport', () => {
    cy.log('Test ID: 4');
    cy.login();
    NavBar.goToReportsPage();
    ReportsPage.downloadtTaxiDriversReport();
    cy.verifyDownload('KaneTaxi_reporte_taxistas.xlsx');
  });

  it('testExportCustomersReport', () => {
    cy.log('Test ID: 5');
    cy.login();
    NavBar.goToReportsPage();
    ReportsPage.downloadCustomersReport();
    cy.verifyDownload('KaneTaxi_reporte_clientas.xlsx');
  });

  it('testInvalidConfiguration', () => {
    cy.log('Test ID: 7');
    cy.login();
    NavBar.goToConfigurationPage();

    cy.xpath('//*[@id="firstKMCost-edit-button"]').click();
    
    cy.wait(1000);
    cy.xpath('//*[@id="firstKMCost-input"]').type('a');

    cy.xpath('//html/body/app-root/app-configuration/div/div[1]/div[2]/div[2]/button[2]').click();

    cy.wait(1000);
    cy.xpath(`//*[@id="toast-container"]`).should('not.be.empty');
  });

  it('testValidConfiguration', () => {
    cy.log('Test ID: 8');
    cy.login();
    NavBar.goToConfigurationPage();
    cy.wait(1000);

    let editButton = cy.xpath('//*[@id="firstKMCost-edit-button"]');
    let entrada = cy.xpath('//*[@id="firstKMCost-input"]');
    let confirmButton = cy.xpath('//html/body/app-root/app-configuration/div/div[1]/div[2]/div[2]/button[2]');

    // lo probamos 2 veces para que vuelva a quedar en 800
    let values = ['200', '800'];

    values.forEach((value) => {
      editButton.click();
      entrada.clear();
      entrada.type(value);
      confirmButton.click();
  
      cy.wait(500);
      entrada.should('have.value', value);
    });

  });

});
