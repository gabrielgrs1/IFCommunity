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
function verificaCPF() {
    var validado = 0;
    function mostraErro() {
        $('#erro-matricula').text('Matrícula informada é inválida!');
        validado = 1;
    }

    $('#matricula').on('blur', function () {
        var soma = 0;
        var resto;
        var cpf = $('#matricula').val();
        var strCpf = cpf.split('-');
        cpf = strCpf[0];

        if (cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999") {
            mostraErro();
        }

        for (i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = soma % 11;

        if (resto === 10 || resto === 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }

        if (resto !== parseInt(cpf.substring(9, 10))) {
            mostraErro();
        }

        soma = 0;

        for (i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = soma % 11;

        if (resto === 10 || resto === 11 || resto < 2) {
            resto = 0;
        } else {
            resto = 11 - resto;
        }
        if (resto !== parseInt(cpf.substring(10, 11))) {
            mostraErro();
        }
    });
    if (validado === 1) {
        return false;
    }

    return true;
}

//Call functions
$(function () {
    mascarasDosInputs();
    erroLogin();
    erroCadastro();
    verificaCPF();
    mensagemEmailEnviado();
});


trocaTela("#btn-esqueci-senha", "#form-login", "#form-esqueci-senha");
trocaTela("#btn-voltar-login", "#form-esqueci-senha", "#form-login");
trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login");
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2");
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro");

mensagemDeErro("#nome", "#erro-nome", /[^a-z\s$]/gi, "É permitido apenas letras");
mensagemDeErro("#matricula", "#erro-matricula", /[^\d{12}\-]/g, "É permitido apenas números");
mensagemDeErro("#telefone", "#erro-telefone", /[^\(0\d{2}\)9\s+\d{4}\-\d{4}$]/g, "É permitido apenas números");

mostrarSenha("#senha-login", "#mostrar-senha-login");
mostrarSenha("#senha-cadastro", "#mostrar-senha-cadastro");

