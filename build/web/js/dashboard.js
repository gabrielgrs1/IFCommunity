/*-----------------------------------------------------------------------------*/
/* Adiciona a imagem */

$(".avatar .container").append('<img src="http://www.alemdaimaginacao.com/Obituario%20da%20Fama/Ruben_Aguirre/ruben_aguirre1.jpg" />')


/*-----------------------------------------------------------------------------*/
/*     DROP DOWN DAS MATERIAS     */

$('.minhas-materias-adicionadas').hide();
$('li.icon-materias').click(function () {
    $('.minhas-materias-adicionadas').slideToggle(500);
});

/*-----------------------------------------------------------------------------*/
/*    Adiciona as materias   */
var materias = [];
pegaMaterias($("#id-usuario").text());
var lista = $(".lista-materias");
var minhasMaterias = lista.parent();

setTimeout(function () {
    lista.detach().empty().each(function (i) {
        for (var x = 0; x < materias.length; x++) {
            // console.log("entrou");
            $(this).append('<input type="radio" name="materias-radio" id="materia' + x + '" style="display:none!important" /><label for="materia' + x + '"><li><span>' + materias[x] + '</span></li></label>');
            if (x === materias.length - 1) {
                $(this).appendTo(minhasMaterias);
            }
        }
    });
}, 300);

//Função que pega as matérias do usuário e armazena em um array
function pegaMaterias(idUsuario) {
    $.ajax({
        url: "RecuperaMaterias",
        type: 'get',
        data: {
            idUsuario: idUsuario
        },
        beforeSend: function () {
            // console.log("CARREGANDO MATERIAS");
        }
    })
            .done(function (materia) {
                // console.log(materia);
                for (var i = 0; i < materia.length; i++) {
                    materias.push(materia[i]);
                }
            })
            .fail(function (jqXHR, textStatus, materia) {
                materias.push("Você ainda não tem nenhuma matéria cadastrada!");
            });
}

/*-----------------------------------------------------------------------------*/

/*           Checked img na matéria (submenu) que está selecionada         */
/* ela tem que carregar após as matérias serem carregadas para funcionar   */

setTimeout(function () {
    $("input[name='materias-radio']").click(function () {
        // alert($(this).attr('id'));
        if ($(this).is(':checked')) {
            $('ul label li').removeClass('fundo-checked');
            $(this).next('label').children('li').addClass('fundo-checked');
        }
    });
}, 400);

/*-----------------------------------------------------------------------------*/
/*    Botão para abrir menu do celular   */

$(".nav-side .nav-toggle").on("click", function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("nav-open");
});

/*-----------------------------------------------------------------------------*/
/*    Na escolha da opção no menu substitui a pagina inicial      */

/*    De início, mostra a página perfil apenas      */

$("section").hide();
if ($("section").hasClass("section-aparece")) {
    $(this).show();
}
;

/*    Na escolha da opção no menu substitui a pagina inicial      */
/*    Esses sinais chevron significam diretamente filhos, para que n pegue o sub-menu como função click tbm */
$("ul.para-scroll > li").click(function () {
    // console.log($("section").find("section-aparece"));
    // console.log("entrou");
    // console.log($(this).children("span").text());
    //fecha o menu de minhas materias
    //remove a tela que está aparecendo
    $("section").removeClass("section-aparece");

    // console.log($(this).text());
    if ($(this).children("span").text() !== 'Minhas matérias') {
        //  console.log("entrou aqui");
        $('.minhas-materias-adicionadas').slideUp();
    }
    var classe = '.' + $(this).children("span").attr("id");
    // console.log(classe);
    $("section").hide();
    $(".site-content").find(classe).addClass("section-aparece");
    //Se tiver a section-aparece, ele exibe ela na tela.
    if ($("section").hasClass("section-aparece")) {
        $(this).show();
    }
    ;
    trocaCorFundo();
    apareceMenuMensagens($(this).children("span").text());
    montaPostagens();
});

//Função que desloga o usuário
function deslogar() {
    $.ajax({
        url: "Deslogar",
        type: 'get'
    })
            .done(function () {
                window.location.href = "index.jsp";
            })
            .fail(function (jqXHR, status, data) {
                console.log("ERRO: " + status);
            });
}

//Chama a função de deslogar quando clica dentro do item
$("#li-deslogar").on('click', function (e) {
    e.preventDefault();
    deslogar();
});

/*-----------------------------------------------------------------------------*/

/*              Plugin dos selects                          */

$(document).ready(function () {
    $('select').material_select();
});
$('select').material_select('destroy');

/*-----------------------------------------------------------------------------*/

/*              Fundo randomico                          */

function trocaCorFundo() {
    var array = ["#c5cae9", "#bbdefb", "#b2dfdb", "#eeeeee", "#d7ccc8", "#cfd8dc"];
    var colorNumber = Math.round((Math.random() * (array.length - 1)));
    $("#body-principal").css('background-color', array[colorNumber]);
}
;

/*-----------------------------------------------------------------------------*/
/*                Sidebar de materias                     */

/*  esconde e mostra a opção de publicação dependendo da página que está  */

$(".menu-mensagens").hide();
function apareceMenuMensagens(textoDoMenu) {
    $(".menu-mensagens").show();
    // console.log(textoDoMenu);
    if (textoDoMenu !== 'Minhas matérias') {
        //console.log("entrou no hide do menu");
        // console.log("entrou aqui");
        $(".menu-mensagens").hide();
    }
}
/*-----------------------------------------------------------------------------*/
/*                Modal de publicação                     */

// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
$('.modal').modal();

$('.modal1').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        alert("Ready");
        console.log(modal, trigger);
    },
    complete: function () {
        alert('Closed');
    } // Callback for Modal close
}
);

$('#textarea1').val('New Text');
$('#textarea1').trigger('autoresize');
/*-----------------------------------------------------------------------------*/

/*                Highlight dos escritos dos códigos                     */


$("#modal-de-escrever-codigo").click(function () {

// Ajusta o tamanho do modal com o hightlight
    if (window.parent && window.parent.parent) {
        window.parent.parent.postMessage(["resultsFrame", {
                height: document.body.getBoundingClientRect().height,
                slug: "TcqAf"
            }], "*")
    }
    $('.modal-content').children().remove();


    // Quando muda o select do modal, adiciona o textarea de acordo com a linguagem escolhida
    $('#formDoModal').on('change', 'select', function (e) {
        var val = $(e.target).val();
        var text = $(e.target).find("option:selected").text();
        adicionaOsTextAreaModal(text);
    });
});

function adicionaOsTextAreaModal(text) {

    if (text == "Texto normal") {
        $('.modal-content').children().remove();
        // console.log("entrou no click do botao pra abrir modal de texto");
        var textarea = document.createElement("textarea");
        $('.modal-content').append(textarea);

    } else {
        $('.modal-content').children().remove();
        // console.log("entrou no tipo diferente de texto normal");
        var textarea = document.createElement("textarea");
        textarea.setAttribute("name", "codesnippet_editable");
        textarea.setAttribute("id", "codesnippet_editable");
        textarea.setAttribute("rows", "4");
        textarea.setAttribute("cols", "50");
        $('.modal-content').append(textarea);
        qualLinguagem(text);
        // Habilita o codemirror na textarea
        function qualLinguagem(text) {
            // console.log("hahaha" + text);
            if (text == "Java") {
                var editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('codesnippet_editable'), {
                    mode: "java",
                    theme: "default",
                    lineNumbers: true
                });
            } else if (text == "Javascript") {
                var editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('codesnippet_editable'), {
                    mode: "javascript",
                    theme: "default",
                    lineNumbers: true
                });
            } else if (text == "html") {
                var editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('codesnippet_editable'), {
                    mode: "html",
                    theme: "default",
                    lineNumbers: true
                });
            }
        }
    }
}
;
/*-----------------------------------------------------------------------------*/
/*                  Postagens colapsadas                   */
function collapsible() {
    $('.collapsible').collapsible();
}

//Função que pega as postagems e armazena em um array
var postagens = [];
var materia;
$(".lista-materias").parent().click(function () {
    materia = $(".fundo-checked").children().text();
    montaPostagens(materia);
});

function pegaPostagens(materia, dataUltimaPostagem) {
    $.ajax({
        url: "RecuperaPostagens",
        type: 'get',
        data: {
            materia: materia,
            dataUltimaPostagem: dataUltimaPostagem
        },
        beforeSend: function () {
//            console.log("CARREGANDO POSTAGENS");
        }
    })
            .done(function (postagem) {
                postagens = [];
                for (var i = 0; i < postagem.length; i++) {
                    postagens.push(postagem[i]);
                }
            })
            .fail(function (jqXHR, textStatus, postagem) {
                console.log("ERRO AO RECUPERAR AS POSTAGENS");
            });
}


//Função que prepara o texto da postagem e chama a fução que cria e adiciona na tela
function montaPostagens(materia) {
    //POR ENQUANTO NÃO ESTÁ SENDO PASSADO NENHUM PARAMETRO PORQUE NÃO ESTÁ SENDO RECUPERADO ESSES VALORES AINDA
    pegaPostagens(materia);

    for (var x = 0; x < postagens.length; x++) {
        var textoPostagem = postagens[x]["postagens"];
        var autorPostagem = postagens[x]["autor"];
        var tituloPostagem = postagens[x]["titulo"];
        var dataPostagem = postagens[x]["data"];
        var materiaPostagem = postagens[x]["materia"];
        adicionaPostagens(textoPostagem, autorPostagem, tituloPostagem, dataPostagem, materiaPostagem);
    }

    if (postagens.length === 0) {
        $(".postagens").empty();       
        $(".postagens").prepend("<h2 class='align-center'>NÃO HÁ NENHUMA POSTAGEM NESSA MATÉRIA<h2>");
    }
    
    collapsible();
}

//Função que adiciona a estrutura de postagem
function adicionaPostagens(textoPostagem, autorPostagem, tituloPostagem, dataPostagem, materiaPostagem) {
    //FALTA COLOCAR DATA DA POSTAGEM E MATERIA

    $(".postagens").empty();
    var secaoDePostagens = $("main > section.minhas-materias");
    var criaUl = document.createElement("ul");
    var criaLi = document.createElement("li");
    var criaDivHead = document.createElement("div");
    var criaUlHead = document.createElement("ul");
    var criaLiHead1 = document.createElement("li");
    var criaLiHead2 = document.createElement("li");
    var criaH4Titulo = document.createElement("h4");
    var criaPNome = document.createElement("p");
    var criaDivBody = document.createElement("div");
    var criaSpanBody = document.createElement("span");

    criaDivHead.className = "collapsible-header";
    criaH4Titulo.className = "center";
    criaH4Titulo.innerHTML = tituloPostagem;
    criaPNome.innerHTML = autorPostagem;
    criaPNome.className = "right-align";
    criaUlHead.setAttribute("class", "container");
    criaDivBody.className = "collapsible-body";
    criaSpanBody.innerHTML = textoPostagem;
    criaUl.className = "collapsible content-topic z-depth-2 container row";
    criaUl.setAttribute('data-collapsible', "accordion");

    criaLiHead1.append(criaH4Titulo);
    criaLiHead2.append(criaPNome);
    criaUlHead.append(criaLiHead1);
    criaUlHead.append(criaLiHead2);
    criaDivHead.append(criaUlHead);
    criaDivBody.append(criaSpanBody);
    criaLi.append(criaDivHead);
    criaLi.append(criaDivBody);
    criaUl.append(criaLi);

    secaoDePostagens.prepend(criaUl);
}

