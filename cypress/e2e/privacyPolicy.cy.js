it.only('Testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')

    cy.get('#white-background p').should(($p) => {
        expect($p).to.have.length(4)

        expect($p.eq(0)).to.contain.text('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
        expect($p.eq(1)).to.contain.text('Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.')
        expect($p.eq(2)).to.contain.text('No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.')
        expect($p.eq(3)).to.contain.text('Talking About Testing')
    })

    //Outra maneira
    //cy.contains('h1', 'cy.contains('h1','CAC TAT - Política de Privacidade')
    //cy.contains('p','Talking About Testing')

})