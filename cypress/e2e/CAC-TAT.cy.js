/// <reference types="cypress"/>

describe('Central de Atendimento ao Cliente TAT', () => {
  // ----------------------------------------------------------------------- 02.md ------------------------------------------------------------------------
  beforeEach(() => {
    cy.visit('/src/index.html')
  })
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  //Exercicio extra 1
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Nathalia')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis euismod malesuada', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  //Exercicio extra 2
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Nathalia')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis euismod malesuada', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  //Exercicio extra 3
  it('Valida se campo "Telefone" aceita apenas números', () => {
    cy.get('#phone').as('phone').type('abcdefghij')
    cy.get('@phone').should('have.value', '')
  })

  //Exercicio extra 4
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Nathalia')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('email@email.com')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  //Exercicio extra 5
  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Nathalia')
      .should('have.value', 'Nathalia')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@teste.com')
      .should('have.value', 'teste@teste.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1232323232')
      .should('have.value', '1232323232')
      .clear()
      .should('have.value', '')
  })

  //Exercicio extra 6
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  //Exercicio extra 7
  it('Envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  // ----------------------------------------------------------------------- 03.md ------------------------------------------------------------------------

  //Exercicio 
  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  //Exercicio extra 1
  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  //Exercicio extra 2
  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })


  // ----------------------------------------------------------------------- 04.md ------------------------------------------------------------------------

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]')
      .check('feedback')
      .should('have.value', 'feedback')

    // outra forma de fazer
    // cy.get(input[type="radio"][value="feedback"]')
    //  .check()
    //  .should('be.checked')

  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .each(typeOfService => { //argumento que o each recebe é o typeOfService
        cy.wrap(typeOfService) //wrap envolve o typeOfService em um objeto do cypress
          .check()
          .should('be.checked')
      })
  })

  // ----------------------------------------------------------------------- 05.md ------------------------------------------------------------------------

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]').as('check')
      .each(checkService => {
        cy.wrap(checkService)
          .check()
          .should('be.checked')
      })
    cy.get('@check')
      .last()
      .uncheck()
      .should('not.be.checked')

    // maneira mais simples
    // cy.get('[type="checkbox"]')
    //   .check()
    //   .should('be.checked')
    //   .last()
    //   .uncheck()
    //   .should('not.be.checked')
  })

  // Extra
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Nathalia')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('email@email.com')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })


  // ----------------------------------------------------------------------- 06.md ------------------------------------------------------------------------

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('meujson')
    cy.get('#file-upload').selectFile('@meujson')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href*="privacy.html"]')
      .should('have.attr', 'target', '_blank')

    //Outra maneira
    //cy.contains('a', 'política de privacidade')
    //.should('have.attr', 'href', 'privacy.html')
    //.and('have.attr', 'target', '_blank')

  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href*="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()
  })

})





