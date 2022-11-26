class NavBar {
  elements = {
    homeLink: () => cy.xpath("//a[contains(text(), 'Inicio')]"),
    notifcationLink: () => cy.xpath("//a[contains(text(), 'Notificaciones')]"),
    reportsLink: () => cy.xpath("//a[contains(text(), 'Reportes')]"),
    configurationLink: () => cy.xpath("//a[contains(text(), 'Configuración')]"),
    logoutButton: () => cy.xpath("//button[contains(text(), 'Cerrar Sesión')]")
  };

  goToHomePage() {
    this.elements.homeLink().click();
  }

  goToNotificationsPage() {
    this.elements.notifcationLink().click();
  }

  goToReportsPage() {
    this.elements.reportsLink().click();
  }

  goToConfigurationPage() {
    this.elements.configurationLink().click();
  }

  logout() {
    this.elements.logoutButton().click({force: true});
  }
}

module.exports = new NavBar();
