class ConfigurationPage {
  elements = {
    currentPassworInput: () => cy.xpath("//input[contains(@name, 'actualPassword')]"),
    newPassworInput: () => cy.xpath("//input[contains(@name, 'newPassword')]"),
    confirmationPassworInput: () => cy.xpath("//input[contains(@name, 'confirmedPassword')]"),
    changePasswordButton: () => cy.xpath("//button[text()='Guardar']")
  };

  updatePassword(currentPassword, newPassword, newPasswordConfirmation) {
    this.elements.currentPassworInput().type(currentPassword);
    this.elements.newPassworInput().type(newPassword);
    this.elements.confirmationPassworInput().type(newPasswordConfirmation);
    this.elements.changePasswordButton().click();
  }
}

module.exports = new ConfigurationPage();
