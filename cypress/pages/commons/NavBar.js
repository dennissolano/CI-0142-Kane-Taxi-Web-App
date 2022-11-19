class NavBar {
  elements = {
    homeLink: () => cy.xpath("//a[contains(text(), 'Inicio')]"),
    notifcationLink: () => cy.xpath("//a[contains(text(), 'Notificaciones')]"),
    reportsLink: () => cy.xpath("//a[contains(text(), 'Reportes')]"),
    configurationLink: () => cy.xpath("//a[contains(text(), 'Configuración')]"),
    logoutButton: () => cy.xpath("//button[contains(text(), 'Cerrar Sesión')]")
  };

  openHome() {
    this.elements.homeLink().click();
  }

  openNotifications() {
    this.elements.notifcationLink().click();
  }

  openReports() {
    this.elements.reportsLink().click();
  }

  openConfiguration() {
    this.elements.configurationLink().click();
  }

  logout() {
    this.elements.logoutButton().click();
  }
}

module.exports = new NavBar();
