function trocaTela(botao, formularioOut, formularioIn, formularioIn2, formularioLimpa) {
    function limpaFormulario(formulario) {
        $(formulario).each(function () {
            this.reset();
        });
    }

    $(botao).click(
            function (e) {
                e.preventDefault();
                $(formularioOut).fadeToggle(300);

                setTimeout(function () {
                    $(formularioIn).fadeToggle(300);
                    $(formularioIn2).fadeToggle(300);
                },
                        300
                        );
                limpaFormulario(formularioLimpa);
            }
    );
}

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

trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro", "#form-login");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login", null, "#form-cadastrar");
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2", null);
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro", null, "#form-cadastro-2");

mensagemDeErro("#nome", "#erro-nome", /[^a-z$]/gi, "É permitido apenas letras");
mensagemDeErro("#telefone", "#erro-telefone", /(^[1-9]{2}\-[2-9][0-9]{7,8}$)/, "Insira no formato (XXX)X XXXX-XXXX");




