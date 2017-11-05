
//Função para exibir animações nos formulários
function trocaTela(botao, formularioOut, formularioIn, formularioIn2) {
    $(botao).click(
            function (e) {
                e.preventDefault();
                $(formularioOut).fadeOut(300);

                setTimeout(function () {
                    $(formularioIn).fadeIn(300);
                    $(formularioIn2).fadeIn(300);
                },
                        300
                        );
            }
    );
}

//Função que exibe mensagem de erro caso o dado inputado no campo não seja válido para o mesmo
function mensagemDeErro(campo, span, regexp, mensagem) {
    $(campo).on("input", function () {
        if (this.value.match(regexp)) {
            $(this).val(this.value.replace(regexp, ''));
            $(span).text(mensagem);


            setInterval(function () {
                $(span).fadeToggle(200);
            }, 500);
        } else {
            $(span).text("");
        }
    });
}

//Função que ao clicar no botão mostrar senha ele mostra a senha
function mostrarSenha(inputSenha, botaoMostrar) {
    $(botaoMostrar).mousedown(function () {
        $(inputSenha).attr("type", "text");
    });

    $(botaoMostrar).mouseup(function () {
        $(inputSenha).attr("type", "password");
    });
}

//Call functions
trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login", null);
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2");
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro", null);

mensagemDeErro("#nome", "#erro-nome", /[^a-z$]/gi, "É permitido apenas letras");
//mensagemDeErro("#telefone", "#erro-telefone", /[^0\d{2}9?\d{4}-?\d{4}]/, "Insira no formato 099 9 XXXX-XXXX");

mostrarSenha("#senha", "#mostrar-senha-login");