//Função que coloca mascaras nos inputs
function mascarasDosInputs() {
    $('.telefone-mask').mask('(000) 0 0000-0000');
    $('.matricula-mask').mask('00000000000-0');
}
;


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
    console.log($('#erros-cadastro-hidden').text());
    $('#erro-cadsatro-span').text($('#erros-cadastro-hidden').text() + " Tente logar com seu usuário ou efetuar novo cadastro!");
    $('#erro-cadastro-span').show();
}
//Call functions
mascarasDosInputs();
erroLogin();
erroCadastro();

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
;

//Mostar a senha dos inputs de senha
mostrarSenha("#senha-login", "#mostrar-senha-login");
mostrarSenha("#senha-cadastro", "#mostrar-senha-cadastro");

//Mostrar mensagem de email enviado
mostrarMensagemOnClick("#btn-esqueci-senha-submit", "#texto-enviado-email");
