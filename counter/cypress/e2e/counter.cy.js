describe("Counter App", () => {
  const DELAY = 1000;

  beforeEach(() => {
    cy.visit("/");
    cy.wait(DELAY);
  });


  describe("Initial State", () => {
    it("should display the counter component", () => {
      cy.get('[data-testid="counter-component"]').should("be.visible");
      cy.get('[data-testid="counter-value"]').should(
        "contain",
        "Value of Counter: 0"
      );
    });

    it("should have input fields initialized to 0", () => {
      cy.get('[data-testid="value_inc"]').should("have.value", "0");
      cy.get('[data-testid="value_dec"]').should("have.value", "0");
    });

    it("should not show logs section initially", () => {
      cy.get('[data-testid="logs-section"]').should("not.exist");
      cy.get('[data-testid="toggle-logs"]').should("not.exist");
    });
  });

  describe("Logs Functionality", () => {
    const createLog = (val = 5) => {
      cy.get('[data-testid="value_inc"]').clear().type(String(val));
      cy.get('[data-testid="button_inc"]').click();
      cy.wait(DELAY);
    };

    it("should show logs toggle after counter operation", () => {
      cy.get('[data-testid="logs-section"]').should("not.exist");
      cy.get('[data-testid="toggle-logs"]').should("not.exist");

      createLog(5);

    
      cy.get('[data-testid="toggle-logs"]').should("be.visible");
      
      cy.get('[data-testid="logs-section"]').should("not.exist");
    });

    it("should toggle logs visibility", () => {
      createLog(5);

      cy.get('[data-testid="toggle-logs"]').should("contain", "Show Logs");
      cy.get('[data-testid="toggle-logs"]').click();

      cy.get('[data-testid="logs-section"]').should("be.visible");
      cy.get('[data-testid="log_info"]').should("have.length.at.least", 1);
      cy.get('[data-testid="toggle-logs"]').should("contain", "Hide Logs");

      cy.get('[data-testid="toggle-logs"]').click();
      cy.get('[data-testid="logs-section"]').should("not.exist");
    });

    it("should display correct log information", () => {
      createLog(15);
      cy.get('[data-testid="toggle-logs"]').click();

      cy.get('[data-testid="log_info"]')
        .first()
        .should("contain", "Previous Value = 0")
        .and("contain", "Value Added = 15")
        .and("contain", "New Value = 15");
    });

    it("should show warning message on log hover", () => {
      createLog(5);
      cy.get('[data-testid="toggle-logs"]').click();

      cy.get('[data-testid="warning-message"]').should("not.exist");

      cy.get('[data-testid="log_info"]').first().trigger("mouseenter");
      cy.get('[data-testid="warning-message"]')
        .should("be.visible")
        .and("contain", "Click To Delete");

      cy.get('[data-testid="log_info"]').first().trigger("mouseleave");
      cy.get('[data-testid="warning-message"]').should("not.exist");
    });

    it("should delete log entry on click", () => {
      createLog(10);
      createLog(5);

      cy.get('[data-testid="toggle-logs"]').click();
      cy.get('[data-testid="log_info"]').should("have.length", 2);

      cy.get('[data-testid="log_info"]').first().click();
      cy.get('[data-testid="log_info"]').should("have.length", 1);
    });

    it("should hide logs section when all logs are deleted", () => {
      createLog(5);

      cy.get('[data-testid="toggle-logs"]').click();
      cy.get('[data-testid="log_info"]').should("have.length", 1);

      cy.get('[data-testid="log_info"]').first().click();

      cy.get('[data-testid="logs-section"]').should("not.exist");
      cy.get('[data-testid="toggle-logs"]').should("not.exist");
    });
  });
});