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

    cy.wait(3000);
    cy.xpath(`//*[@id="idCheckbox"]`).click();

    cy.xpath(
      `//html/body/app-root/app-detalles-taxista/form/div/div[1]/div[1]/div[3]/button`
    ).click();

    cy.wait(3000);
    cy.xpath(`//*[@id="toast-container"]`).should('not.be.empty');
  });

  it('testExportTaxiDriverReport', () => {
    cy.log('Test ID: 4');
    cy.login();
    NavBar.goToReportsPage();
    ReportsPage.downloadtTaxiDriversReport();
    cy.verifyDownload('KaneTaxi_reporte_taxistas.xlsx');
  });
});
