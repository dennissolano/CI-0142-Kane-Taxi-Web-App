import HomePage from '../pages/HomePage';
import NavBar from '../pages/commons/NavBar';
import ReportsPage from '../pages/ReportsPage';
import TaxiDriverDetailsPage from '../pages/TaxiDriverDetailsPage';
import ConfigurationPage from '../pages/ConfigurationPage';

describe('Kane Taxi Tests Suite', () => {
  it.skip('testLogin', () => {
    cy.log('Test ID: 1');
    cy.login();
  });

  it.skip('testLogout', () => {
    cy.login();
    cy.logout();
  });

  it.skip('testTaxiDriverDetails', () => {
    cy.log('Test ID: 2');
    cy.login();
    cy.fixture('testTaxiDriverDetails').then((taxiDriverDetails) => {
      HomePage.openTaxiDriverDetailsByName(taxiDriverDetails.name);

      let driver = {
        Nombre: taxiDriverDetails.name,
        Cédula: taxiDriverDetails.id,
        Placa: taxiDriverDetails.carId,
        Teléfono: taxiDriverDetails.phoneNumber,
        'Correo Electrónico': taxiDriverDetails.email,
        Estado: taxiDriverDetails.status
      };

      Object.entries(driver).forEach(([key, value]) => {
        cy.xpath("//strong[contains(text(), '" + key + "')]/parent::*").should(
          'contain.text',
          value
        );
      });
    });

    cy.logout();
  });

  it.skip('testEditTaxiDriver', () => {
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

  it.skip('testExportTaxiDriverReport', () => {
    cy.log('Test ID: 4');
    cy.login();
    NavBar.goToReportsPage();
    ReportsPage.downloadtTaxiDriversReport();
    cy.verifyDownload('KaneTaxi_reporte_taxistas.xlsx');
  });

  it.skip('testExportCustomersReport', () => {
    cy.log('Test ID: 5');
    cy.login();
    NavBar.goToReportsPage();
    ReportsPage.downloadCustomersReport();
    cy.verifyDownload('KaneTaxi_reporte_clientas.xlsx');
  });

  it.skip('testInvalidConfiguration', () => {
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

  it.skip('testValidConfiguration', () => {
    cy.log('Test ID: 8');
    cy.login();
    NavBar.goToConfigurationPage();
    cy.wait(1000);

    let editButton = cy.xpath('//*[@id="firstKMCost-edit-button"]');
    let entrada = cy.xpath('//*[@id="firstKMCost-input"]');
    let confirmButton = cy.xpath(
      '//html/body/app-root/app-configuration/div/div[1]/div[2]/div[2]/button[2]'
    );

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

  it.skip('testSearch', () => {
    cy.log('Test ID: 10');
    cy.login();

    let input = cy.xpath('//html/body/app-root/app-home/body/div[1]/form/div/input');
    input.type('Automation');
    let searchButton = cy.xpath('//html/body/app-root/app-home/body/div[1]/form/div/span/button');
    searchButton.click();
    let results = cy.xpath('//html/body/app-root/app-home/body/div[2]/div[1]/div');
    results.should('exist');
  });

  it.skip('testSearchNonExistentDriver', () => {
    cy.log('Test ID: 11');
    cy.login();

    let input = cy.xpath('//html/body/app-root/app-home/body/div[1]/form/div/input');
    input.type('Eduardo');
    let searchButton = cy.xpath('//html/body/app-root/app-home/body/div[1]/form/div/span/button');
    searchButton.click();
    let results = cy.xpath('//html/body/app-root/app-home/body/div[2]/div[1]/div');
    results.should('not.exist');
  });

  it.skip('testReenableTaxiDriverAccount', () => {
    cy.log('TEST ID: 6');
    cy.login();

    cy.fixture('reenableTaxiDriverAccount').then((data) => {
      HomePage.searchUserByFirstName(data.driverName);
      HomePage.openEditTaxiDriverByName(data.driverName);
      TaxiDriverDetailsPage.disableAccount();
      NavBar.goToReportsPage();
      ReportsPage.enableInactiveTaxiDriverByName(data.driverName);
    });
    cy.logout();
  });

  it('testValidPasswordChange', () => {
    cy.log('TEST ID: 9');

    cy.login();
    cy.fixture('testValidPasswordChange').then((data) => {
      NavBar.goToConfigurationPage();

      cy.log(`Updating password from ${data.currentPassword} to ${data.newPassword}`);
      ConfigurationPage.updatePassword(
        data.currentPassword,
        data.newPassword,
        data.newPasswordConfirmation
      );
      //ToDo: verify password change message

      cy.logout();

      cy.log(`Login with new credentials as ${data.email}/${data.newPassword} `);
      cy.login(data.email, data.newPassword);

      NavBar.goToConfigurationPage();
      cy.log('Restoring old password');

      ConfigurationPage.updatePassword(
        data.newPassword,
        data.currentPassword,
        data.currentPassword
      );
      //ToDo: verify password change message.
      cy.logout();
    });
    cy.logout();
  });
});
