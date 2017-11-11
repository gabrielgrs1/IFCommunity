//Função que coloca mascaras nos inputs
function mascarasDosInputs() {
    $('.telefone-mask').mask('(009) 00009-0000');
    $('.matricula-mask').mask('00000000000-0');
}

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
            $(span).hide();
            $(span).fadeIn(1000);
            setTimeout(function () {
                $(span).fadeOut(1000);
            }, 7000);
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

//Função que mostra mensagem de sucesso quando email é enviado
function mensagemEmailEnviado() {
    $("#btn-esqueci-senha-submit").click(function () {
        $("#texto-enviado-email").text("Email enviado com sucesso, consulte sua caixa de email");
        setTimeout(function () {
            $("#texto-enviado-email").fadeOut(2000);
        }, 4000);
    });
}

//Função que mostra mensagem de erro no login
function erroLogin() {
    $('#login').val($('#login-hidden').text());
    if ($('#erro-hiden').text() === 'Usuário incorreto!') {
        $('#login').focus();
        $('#erro-login').text($('#erro-hiden').text());
        $('#erro-login').show();
        $('#login').on('input', function () {
            setInterval(function () {
                $('#erro-login').fadeOut(2000);
            }, 2000);
        });
    } else if ($('#erro-hiden').text() === 'Senha incorreta!') {
        $('#senha-login').focus();
        $('#erro-senha-login').text($('#erro-hiden').text());
        $('#erro-senha-login').show();
        $('#senha-login').on('input', function () {
            setInterval(function () {
                $('#erro-senha-login').fadeOut(2000);
            }, 2000);
        });
    }
}

//Função que mostra mensagem de erro no cadastro
function erroCadastro() {
    if ($('#erros-cadastro-hidden').text() !== "null") {
        $('#erro-cadsatro-span').text($('#erros-cadastro-hidden').text() + " Tente logar com seu usuário ou efetuar novo cadastro!");
        $('#erro-cadastro-span').show();
    } else {
        $('#div-erro-cadastro-span').remove();
    }
}

//Função que valida a parte da matricula que é CPF
function verificaCPF(span) {
    if ($('#matricula').val() === "") {
        return;
    }

    var cpf = $("#matricula").val();
    var strCpf = cpf.split('-');
    cpf = strCpf[0];
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0, soma2 = 0;
    var vlr = 11;

    for (i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
    }

    soma1 = (((soma1 * 10) % 11) === 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

    if (cpf === "11111111111" || cpf === "22222222222" || cpf ===
            "33333333333" || cpf === "44444444444" || cpf === "55555555555" || cpf ===
            "66666666666" || cpf === "77777777777" || cpf === "88888888888" || cpf ===
            "99999999999" || cpf === "00000000000") {
        var digitoGerado = null;
    } else {
        var digitoGerado = (soma1 * 10) + soma2;
    }

    if (digitoGerado !== digitoDigitado) {
        $(span).text("Informe uma matrícula válida. Campo obrigatório.");
        $(span).show();
        return false;
    } else {
        $(span).fadeOut(2000);
    }

    return true;
}

function validacaoFormulario(campo, span, regex, mensagem) {
    $(campo).on("blur", function () {
        if (regex.test(this.value) && !verificaCPF(span) && campo !== "#matricula") {
            $(span).fadeOut(2000);
            $(campo).addClass("sucesso-label-input");
            $(campo).removeClass("erro-label-input");
        } else {
            $(span).text(mensagem);
            $(span).hide();
            $(span).fadeIn(500);
            $(campo).addClass("erro-label-input");
            $(campo).removeClass("sucesso-label-input");
        }

        if (verificaCPF(span) && campo === "#matricula") {
            $(span).fadeOut(2000);
            $(campo).addClass("sucesso-label-input");
            $(campo).removeClass("erro-label-input");
        }

        if (/^[a-záàâãéèêíïóôõöúçñ]{3,}[a-záàâãéèêíïóôõöúçñ\s]*$/i.test($("#nome").val())
                && /^\(0?[1-9]{2}\)\s9?[1-9]{4}\-[1-9]{4}$/.test($("#telefone").val())
                && /^[0-9]{11}-[1-9]{1,}$/.test($("#matricula").val())
                && verificaCPF()) {
            $("#btn-cadastrar-proximo").removeClass("disabled");
        } else {
            $("#btn-cadastrar-proximo").addClass("disabled");
        }
    });
}

//Call functions
$(function () {
    mascarasDosInputs();
    erroLogin();
    erroCadastro();
    mensagemEmailEnviado();
});

trocaTela("#btn-esqueci-senha", "#form-login", "#form-esqueci-senha");
trocaTela("#btn-voltar-login", "#form-esqueci-senha", "#form-login");
trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login");
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2");
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro");

validacaoFormulario("#nome", "#erro-nome", /^[a-záàâãéèêíïóôõöúçñ]{3,}[a-záàâãéèêíïóôõöúçñ\s]*$/i, "Informe apenas letras. Campo obrigatório.");
validacaoFormulario("#telefone", "#erro-telefone", /^\(0?[1-9]{2}\)\s9?[1-9]{4}\-[1-9]{4}$/, "Informe apenas números. Campo obrigatório.");
validacaoFormulario("#matricula", "#erro-matricula", /^[0-9]{11}-[1-9]{1,}$ /, "Informe uma matrícula válida. Campo obrigatório.");
validacaoFormulario("#login-cadastro", "#erro-usuario", /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,}[a-zA-Z0-9]$/, "Informe um usuário váido. Campo obrigatório.");
validacaoFormulario("#senha-cadastro", "#erro-senha", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/, "Informe uma senha válida exemplo: Teste@10.");
validacaoFormulario("#email", "#erro-email", /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "Informe um email válido. Campo obrigatório.");

mostrarSenha("#senha-login", "#mostrar-senha-login");
mostrarSenha("#senha-cadastro", "#mostrar-senha-cadastro");

