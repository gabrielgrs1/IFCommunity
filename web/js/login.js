//Função que coloca mascaras nos inputs
function mascarasDosInputs() {
    $('.telefone-mask').mask('(009) 00009-0000');
    $('.matricula-mask').mask('00000000000-0');
};

//Função para exibir animações nos formulários
function trocaTela(botao, formularioOut, formularioIn, formularioIn2) {

    var telaAnteriorValidada = false;
    $("#btn-cadastrar").click(function () {
        if ($('#nome').val() === '' || $('#telefone').val() === '' || $('#matricula').val() === '') {
            $('#erro-cadastro-proximo').show();
            telaAnteriorValidada = false;
        }
    });

    $("#btn-cadastrar-proximo").click(function () {
        if ($('#nome').val() !== '' && $('#telefone').val() !== '' && $('#matricula').val() !== '') {
            $('#erro-cadastro-proximo').hide();
            telaAnteriorValidada = true;
        }
    });

    $("#btn-cadastrar").click(function () {
        if (($('#login-cadastro').val() === '' && $('#senha-cadastro').val() === '' && $('#email').val() === '') && telaAnteriorValidada) {
            $('#erro-cadastro-final').show();
        }
    });

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

//Função que mostra mensagem de sucesso quando email é enviado
function mostrarMensagemOnClick(botao, div) {
    $(botao).click(function () {
        $(div).text("Email enviado com sucesso, consulte sua caixa de email");
        setTimeout(function () {
            $(div).fadeOut(2000);
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
        $('#erro-cadsatro-span').remove();
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
    
    function mostraErro2() {
        $('#erro-matricula').text('A matrícula deve ter 12 caracteres!');
        validado = 1;
    }

    $('#matricula').on('blur', function () {
        var soma = 0;
        var resto;
        var cpf = $('#matricula').val();
        var strCpf = cpf.split('-');
        cpf = strCpf[0];

        if (cpf.length !== 11 ||
                cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999" && 
                $('#matricula').val()) {
            mostraErro2();
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

//Função que valida se tem algum erro no formulário.
function validaFormulario(formulario, botao, campo1, campo2, campo3) {
    $(formulario).focus(function () {
        function validaCampo(campo) {
            $(campo).blur(function () {
                console.log($(campo).val());
                if ($(campo).val() === "") {
                    return false;
                }

                return true;
            });
        }

        validaCampo(campo1);
        validaCampo(campo2);
        validaCampo(campo3);

        if (validaCampo(campo1) && validaCampo(campo2) && validaCampo(campo3)) {
            $(botao).removeClass('disabled');
        }
    });
}

//Call functions
$(function () {
    mascarasDosInputs();
    erroLogin();
    erroCadastro();
    verificaCPF();
    validaFormulario("#form-cadastro" ,"#btn-cadastrar-proximo", "#nome", "#telefone", "#matricula");
});


//Chama função que troca de tela esqueci minha senha
trocaTela("#btn-esqueci-senha", "#form-login", "#form-esqueci-senha");
trocaTela("#btn-voltar-login", "#form-esqueci-senha", "#form-login");

//Chama função que troca de telas de cadastro
trocaTela("#btn-criar-conta", "#form-login", "#form-cadastrar", "#form-cadastro");
trocaTela("#btn-voltar", "#form-cadastrar", "#form-login");
trocaTela("#btn-cadastrar-proximo", "#form-cadastro", null, "#form-cadastro-2");
trocaTela("#btn-voltar-tela-2", "#form-cadastro-2", "#form-cadastro");

//Chama função que exibe mensagem de erro embaixo dos campos
mensagemDeErro("#nome", "#erro-nome", /[^a-z\s$]/gi, "É permitido apenas letras");
mensagemDeErro("#matricula", "#erro-matricula", /[^\d{12}\-]/g, "É permitido apenas números");
mensagemDeErro("#telefone", "#erro-telefone", /[^\(0\d{2}\)9\s+\d{4}\-\d{4}$]/g, "É permitido apenas números");

//Mostar a senha dos inputs de senha
mostrarSenha("#senha-login", "#mostrar-senha-login");
mostrarSenha("#senha-cadastro", "#mostrar-senha-cadastro");

//Mostrar mensagem de email enviado
mostrarMensagemOnClick("#btn-esqueci-senha-submit", "#texto-enviado-email");
