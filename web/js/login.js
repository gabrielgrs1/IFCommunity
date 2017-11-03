function limpaFormulario(formulario) {
    $(formulario).each(function () {
        this.reset();
    });
}

function trocaTela(botao, formularioOut, formularioIn, formularioIn2, formularioLimpa) {
    $(botao).click(
            function (e) {
                e.preventDefault();
                $(formularioOut).fadeToggle(500);

                setTimeout(function () {
                    $(formularioIn).fadeToggle(500);
                    $(formularioIn2).fadeToggle(500);
                },
                        500
                        );
                limpaFormulario(formularioLimpa);
            }
    );
}
;

trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro", "#form-login");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login", null, "#form-cadastrar");
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2", null);
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro", null, "#form-cadastro-2");

$("#nome").on("input", function () {
    var regexp = /[^a-zA-Z$]/g;
    if (this.value.match(regexp)) {
        $(this).val(this.value.replace(regexp, ''));
        $("#erro-nome").text("É permitido apenas letras");
    } else {
        $("#erro-nome").text("");
    }
});
