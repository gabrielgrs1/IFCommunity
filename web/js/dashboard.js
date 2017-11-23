/*-----------------------------------------------------------------------------*/
/* Adiciona a imagem */

$(".avatar .container").append('<img src="http://www.alemdaimaginacao.com/Obituario%20da%20Fama/Ruben_Aguirre/ruben_aguirre1.jpg" />');

/*------------------------------------------------------------------------*/
//Função que mostra o "carregando" na tela.
function carregando() {
    // console.log("preloader-wrapper");
    $(".preloader-wrapper").show();
}
/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
/*     DROP DOWN DAS MATERIAS     */

$('li.icon-materias').click(function () {
    $('.minhas-materias-adicionadas').slideToggle(500);
});

/*-----------------------------------------------------------------------------*/
/*    Na escolha da opção no menu substitui a pagina inicial      */

/*    Na escolha da opção no menu substitui a pagina inicial      */
/*    Esses sinais chevron significam diretamente filhos, para que n pegue o sub-menu como função click tbm */
$("ul.para-scroll > li").click(function () {
    $("main > section.minhas-materias").empty();
    $('ul label li').removeClass('fundo-checked');
    // console.log($("section").find("section-aparece"));
    // console.log("entrou no click do li");
    // console.log($(this).children("span").text());
    //remove a tela que está aparecendo
    $("section").removeClass("section-aparece");

    // console.log($(this).text());
    // 
    //fecha o menu de minhas materias
    var textoDoClique = $(this).children("span").text();
    // console.log(textoDoClique);
    if (textoDoClique !== 'Minhas matérias') {
        //  console.log("entrou aqui");
        $('.minhas-materias-adicionadas').slideUp();
        $('.aviso-minhas-materias').hide();

        // se for gerenciar materias, monta o gerenciar materias.
        if (textoDoClique == "Gerenciar matérias") {
            // console.log("entrou no clique");
            gerenciarMateriasConteudo();
        }
    } else {
        $('.aviso-minhas-materias').show();
    }

    // Aplica a classe para aparecer alguma section
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
    MontaCondicoesBotaoModal($(this).children("span").text());
});

/*-----------------------------------------------------------------------------*/
/*    Adiciona as materias   */

//  Estamos com variável global aqui e ainda não pensei numa solução, visto que queremos q carregue junto com a página.

var materias = [];
pegaMateriasComAjax($("#id-usuario").text());
var lista = $(".lista-materias");
var minhasMaterias = lista.parent();


//  Essa função preenche o vetor matérias de acordo com o retorno do ajax que busca as mastérias cadastradas pelo usuário.
// Caso esse vetor esteja vazio, ele retorna uma mensagem pro cara cadastrar nas materias.
function preencheAListaDeMateriasDoMenu() {
    lista.detach().empty().each(function (i) {

        if (materias.length === 0) {
            materias.push("Você ainda não tem nenhuma matéria cadastrada!");
        }

        for (var x = 0; x < materias.length; x++) {

            // Isso aqui é um remédio caso ocorra, acho que não tem situação em que possa occorer, mas... É mais um cuidado.
            // Enfim, caso o array materias chegue aqui com a mensagem de não tem matérias, ele remove essa mensage antes de gerar a lista de materias cadastradas.
            var a = materias.indexOf("Você ainda não tem nenhuma matéria cadastrada!");
            // console.log(a)
            if (a == 0) {
                materias.splice(i, 0);
            }

            // console.log("entrou");
            // Aqui preenche a lista de materias com as matérias que o cara tem cadastradas.
            $(this).append('<input type="radio" name="materias-radio" id="materia' + x + '" style="display:none!important" /><label for="materia' + x + '"><li><span>' + materias[x] + '</span></li></label>');
            if (x === materias.length - 1) {
                $(this).appendTo(minhasMaterias);
            }
        }
    });
}
;


//Função que pega as matérias do usuário e armazena em um array

// Aqui, quando ele faz a requisição das materias cadastradas, ele fica exibindo uma barrinha de loading.
// Quando retorna com sucesso as materias, ele troca o loading pelas materias q o cara tem cadastradas.
// Ou se retornar insucesso, ele mostra mensagem para cadastrar em alguma matéria.
function pegaMateriasComAjax(idUsuario) {
    // console.log("entrou pegaMateriasComAjax")
    var loading = $(".lista-materias");
    var li = document.createElement("li");
    var progress = document.createElement("div");
    progress.setAttribute("class", "progress");
    var indeterminate = document.createElement("div");
    indeterminate.setAttribute("class", "indeterminate");
    progress.append(indeterminate);
    li.append(progress);

    $.ajax({
        url: "RecuperaMaterias",
        type: 'get',
        data: {
            idUsuario: idUsuario
        },
        beforeSend: function () {
            loading.append(li);
        }
    })
            .done(function (materia) {
                loading.empty();

                for (var i = 0; i < materia.length; i++) {
                    materias.push(materia[i]);
                }
                preencheAListaDeMateriasDoMenu();
            })
            .fail(function (jqXHR, textStatus, materia) {
                loading.empty();
                if (jqXHR["status"] === 500) {
                    materias.push("Não foi possível estabelecer conexão com o servidor!");
                } else if (jqXHR["status"] === 502) {
                    materias.push("Não foi possível estabelecer conexão!");
                }
                preencheAListaDeMateriasDoMenu();
            });
}

/*-----------------------------------------------------------------------------*/

/*           Checked img na matéria (submenu) que está selecionada         */
/* ela tem que carregar após as matérias serem carregadas para funcionar   */

setTimeout(function () {
    $("input[name='materias-radio']").click(function () {
        $('.aviso-minhas-materias').hide();
        // console.log("entrou no click do input");
        // alert($(this).attr('id'));
        var qualMateria;
        if ($(this).is(':checked')) {
            $('ul label li').removeClass('fundo-checked');
            $(this).next('label').children('li').addClass('fundo-checked');
            qualMateria = $(this).next('label').children('li').children("span").text();
        }
        // console.log(qualMateria);
        MontaCondicoesBotaoModal(qualMateria);
    });
}, 400);

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*    Botão para abrir menu do celular   */

$(".nav-side .nav-toggle").on("click", function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("nav-open");
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*              Plugin dos selects                          */

$(document).ready(function () {
    $('select').material_select();
});
$('select').material_select('destroy');

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*              Fundo com cor randomica                          */

function trocaCorFundo() {
    // console.log("entrou troca cor fundo");
    var array = ["rgba(207, 216, 220, 0.7)", "rgba(187, 222, 251, 0.7)", "rgba(178, 223, 219, 0.7)", "rgba(238, 238, 238, 0.7)", "rgba(215, 204, 200, 0.7)", "rgba(207, 216, 220, 0.7)"];
    var colorNumber = Math.round((Math.random() * (array.length - 1)));
    $(".cor-fundo").css('background-color', array[colorNumber]);
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                Sidebar para postar os codigos, ou seja, aquele botão com <> que clica e abre o modal.                    */

/*  esconde e mostra a opção de publicação dependendo da página que está  */

// O botão de postagem não some se o click for em "minhas matérias ou em qualquer submenu do mesmo.

function MontaCondicoesBotaoModal(TextoValidacao) {
    // console.log(" entrou em MontaCondicoesBotaoModal");
    // console.log(TextoValidacao);
    // Esta variável TextoValidacao é uma flag, pra saber se deixa ou nao visivel o botao do modal
    //Monta Array com "Minhas matérias e com as matérias em que o usuário está inscrito.
    var StringQueNãoEscondemOBotaoDePublicacao = [];
    // Clona o vetor que tem a lista de matérias cadastradas
    StringQueNãoEscondemOBotaoDePublicacao = materias.slice(0);
    //Agora chama a função do botão passando como argumento o array de nomes.
    apareceBotaoAbrirModal(TextoValidacao, StringQueNãoEscondemOBotaoDePublicacao);
}

function apareceBotaoAbrirModal(TextoValidacao, StringQueNãoEscondemOBotaoDePublicacao) {
    // console.log(TextoValidacao + " 1");
    // console.log(StringQueNãoEscondemOBotaoDePublicacao);
    // console.log(textoDoMenu);

    // Verifica se o array tem a String do botão clicado.
    if (StringQueNãoEscondemOBotaoDePublicacao.includes(TextoValidacao)) {
        // console.log("entrou no show do menu");
        $(".botao-modal").show();
    } else {
        // console.log("entrou aqui");
        $(".botao-modal").hide();
    }
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
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
        // console.log(modal, trigger);
    },
    complete: function () {
        //  alert('Closed');
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
                slug: "2azkLnad"
            }], "*");
    }
    $('.modal-content').append('<pre contenteditable class="line-numbers language-markup" data-linenumber="0"><code>select * from as aa where</code></pre>');
    //prismHighlight ();



    // Quando muda o select do modal, adiciona o textarea de acordo com a linguagem escolhida
    $('#formDoModal select').change(function (e) {
        console.log("entrou no change");
        var val = $(e.target).val();
        var text = $(e.target).find("option:selected").text();
        console.log(text);
        adicionaOsTextAreaModal(text);
    });
});

function adicionaOsTextAreaModal(text) {

    if (text == "Texto normal") {
        $('.modal-content').children().remove();
        console.log("entrou no click do botao pra abrir modal de texto");
        var textarea = document.createElement("textarea");
        $('.modal-content').append(textarea);

    } else {
        $('.modal-content').children().remove();
        console.log("entrou no tipo diferente de texto normal");
        var textarea = document.createElement("textarea");
        textarea.setAttribute("name", "codesnippet_editable");
        textarea.setAttribute("id", "codesnippet_editable");
        textarea.setAttribute("rows", "4");
        textarea.setAttribute("cols", "50");
        $('.modal-content').append(textarea);
        qualLinguagem(text);
    }
}

;
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                  Postagens colapsadas                   */
function collapsible() {
    $('.collapsible').collapsible();
}

// Muda a sentinha conforme o clique

// NAO ESTA FUNCIONANDO AINDA

$("ul.collapsible").click(function () {
    console.log("entrou na rotação da setinha");
    $(this).html("\2191");
});




/*---------------------------------------------------------*/
//Função que pega as postagems e armazena em um array
/*---------------------------------------------------------*/


// Seguinte:
// Mudei o fluxo pra acabar com aquelas requisições que só aconteciam da segunda vez.
// Agora essa primeira função aqui com o SetTimeout, que tem esse setTimeout por causa da primeira requisição 
// que trás a lista de matérias, que chama a requisição ajax.
// 
// Depois, a função que monta as postagens é chamada pela função ajax apenas quando a requisição acaba (.done).
//
// Essa função que enche o array de postagens e começa a distribuir as postagens na tela.
//
// Qualquer dúvida é só descomentar os console.log de fluxo que tem abaixo..


var postagens = [];
setTimeout(function () {
    $("input[name='materias-radio']").click(function () {
        // console.log("Fluxo 1");
        // console.log("entrou no que pega a materia para postagem");
        var materia;
        materia = $(".fundo-checked").children().text();
        pegaPostagens(materia);
    });
}, 400);

function pegaPostagens(materia, dataUltimaPostagem) {
    // console.log("Fluxo 2");
    // console.log(materia);
    $.ajax({
        url: "RecuperaPostagens",
        type: 'get',
        data: {
            materia: materia,
            dataUltimaPostagem: dataUltimaPostagem
        },
        beforeSend: function () {
            carregando();
            console.log("CARREGANDO POSTAGENS");
        }
    })
            .done(function (postagem) {
                postagens = [];

                for (var i = 0; i < postagem.length; i++) {
                    postagens.push(postagem[i]);
                }

                $(".preloader-wrapper").hide();
                montaPostagens(materia);
            })
            .fail(function (jqXHR, textStatus, postagem) {
                console.log("Erro, cheque sua conexão");
            });
}


/*------------------------------------------------------------------------*/
//Função que prepara o texto da postagem e chama a fução que cria e adiciona na tela
function montaPostagens(materia) {
    // console.log("Fluxo 3");
    $(".minhas-materias").empty();

    // console.log(postagens);
    for (var x = 0; x < postagens.length; x++) {
        var textoPostagem = postagens[x]["postagens"];
        var autorPostagem = postagens[x]["autor"];
        var tituloPostagem = postagens[x]["titulo"];
        var dataPostagem = postagens[x]["data"];
        var materiaPostagem = postagens[x][materia];
        adicionaPostagens(textoPostagem, autorPostagem, tituloPostagem, dataPostagem, materiaPostagem);
        collapsible();
    }

    if (postagens.length === 0) {
        // console.log("entrou se postagens estiver vazio");
        $(".minhas-materias").empty();
        $(".minhas-materias").prepend("<h2 class='align-center'>NÃO HÁ NENHUMA POSTAGEM NESSA MATÉRIA<h2>");
    }
}

//Função que adiciona a estrutura de postagem
function adicionaPostagens(textoPostagem, autorPostagem, tituloPostagem, dataPostagem, materiaPostagem) {
    //FALTA COLOCAR DATA DA POSTAGEM E MATERIA
    // console.log("Fluxo 4");
    $("main > section.minhas-materias").empty();
    var secaoDePostagens = $("main > section.minhas-materias");
    var criaUl = document.createElement("ul");
    var criaLi = document.createElement("li");
    var criaDivHead = document.createElement("div");
    var criaUlHead = document.createElement("ul");
    var criaLiHead1 = document.createElement("li");
    var criaLiHead2 = document.createElement("li");
    var criaH4Titulo = document.createElement("h4");
    var criaPNome = document.createElement("p");
    var criaPSeta = document.createElement("p");
    var criaDivBody = document.createElement("div");
    var criaSpanBody = document.createElement("span");

    criaDivHead.setAttribute("class", "collapsible-header");
    criaH4Titulo.setAttribute("class", "center");
    criaH4Titulo.innerHTML = tituloPostagem;
    criaPNome.innerHTML = autorPostagem;
    criaPNome.setAttribute("class", "right-align");
    criaPSeta.setAttribute("class", "setinha-indicadora center");
    criaUlHead.setAttribute("class", "container");
    criaDivBody.setAttribute("class", "collapsible-body");
    criaSpanBody.innerHTML = textoPostagem;
    criaUl.setAttribute("class", "collapsible content-topic z-depth-2 container row");
    criaUl.setAttribute('data-collapsible', "accordion");

    criaLiHead1.append(criaH4Titulo);
    criaLiHead2.append(criaPNome);
    criaLiHead2.append(criaPSeta);
    criaUlHead.append(criaLiHead1);
    criaUlHead.append(criaLiHead2);
    criaDivHead.append(criaUlHead);
    criaDivBody.append(criaSpanBody);
    criaLi.append(criaDivHead);
    criaLi.append(criaDivBody);
    criaUl.append(criaLi);

    secaoDePostagens.prepend(criaUl);
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
//          GERENCIAR MATERIAS    

// Primeiro, do vetor com as matérias que ele já tem e os períodos delas.
// O vetor das materias, ja temos, agora falta o dos períodos.


// Por enquando está estático esse vetor, precisa do Ajax.
var PeriodoDaMateria = ["1° Período"];

function gerenciarMateriasConteudo() {


    // POR CAUSA DISSO AQUI O SELECT ESTÁTICO N APARECE, TIRA PRA TESTAR O AJAX, DEPOIS EU COLOCO APPEND NELE.
    $(".adicionar-materias div.box-padrao .row > form").empty();
    // console.log("entrou na gera materias");
    // console.log(materias.length);
    for (var x = 0; x < materias.length; x++) {
        var periodo = PeriodoDaMateria[0];
        var materia = materias[x];
        // console.log(periodo);
        // console.log(materia);
        adicionaMateriasCadastradas(periodo, materia);
    }
}
;

function adicionaMateriasCadastradas(periodo, materia) {
    var criaTextoDaDivi1 = document.createElement("p");
    var criaDiv1 = document.createElement("div");
    var criaInput1 = document.createElement("input");
    var criaLabel1 = document.createElement("label");
    criaLabel1.setAttribute("for", "disabled");
    criaLabel1.appendChild(document.createTextNode("Período"));
    criaInput1.setAttribute("disabled", "disabled");
    criaInput1.setAttribute("id", "disabled");
    criaInput1.setAttribute("type", "text");
    criaInput1.setAttribute("class", "validate");
    criaDiv1.setAttribute("class", "input-field col s6");
    criaDiv1.append(criaInput1);
    criaDiv1.append(criaLabel1);

    var criaDiv2 = document.createElement("div");
    var criaInput2 = document.createElement("input");
    var criaLabel2 = document.createElement("label");
    criaLabel2.setAttribute("for", "disabled");
    criaLabel2.appendChild(document.createTextNode("Matéria"));
    criaInput2.setAttribute("disabled", "disabled");
    criaInput2.setAttribute("type", "text");
    criaInput2.setAttribute("id", "disabled");
    criaInput2.setAttribute("class", "validate");
    criaDiv2.setAttribute("class", "input-field col s6");
    criaDiv2.append(criaInput2);
    criaDiv2.append(criaLabel2);

    for (var x = 0; x < 2; x++) {

        if (x == 1) {
            criaInput1.setAttribute("value", periodo);
            $(".adicionar-materias div.box-padrao .row > form").prepend(criaDiv1);
        } else {
            criaInput2.setAttribute("value", materia);
            $(".adicionar-materias div.box-padrao .row > form").prepend(criaDiv2);
        }
    }

}
;

// Preencher matérias a partir do select de período na pag de gerenciar matérias
// O select por enquanto tá estático, mas tem que passar ele pra append pra inserir dinamicamente conforme o ajax funfa.
//
//
// SE VIRA COM ESSE AJAX AQUI GABRIEL VIADO
$('select[data-class=slCadPeriodo]').change(function () {

    var qualPeriodo = $("#periodo-select option:selected").val();
    console.log(qualPeriodo);

    var $select = jQuery('select[data-class=slCadMateria]').empty();
    var loading1 = $("select[data-class=slCadPeriodo]");
    var option = document.createElement("option");
    var progress = document.createElement("div");
    progress.setAttribute("class", "progress");
    var indeterminate = document.createElement("div");
    indeterminate.setAttribute("class", "indeterminate");
    progress.append(indeterminate);
    option.append(progress);
    loading1.append(option);

    $.ajax({
        url: "RecuperaMaterias",
        type: 'get',
        data: {
            RecuperaMateriasPeriodo: qualPeriodo
        },
        beforeSend: function () {
            carregando();
            // console.log("CARREGANDO MATERIAS");
        }
    })
            .done(function () {
                loading1.empty();
                // console.log(materia);
                jQuery.each(json.list, function (i, value) {
                    var optionHTML = new Option(value.descricao, value.id);
                    $select.append(optionHTML);
                });
            })
            .fail(function (jqXHR, textStatus, materia) {

            });
});


/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
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








/*--------------------------------------------------------------------------------------------------------------------------------------------------*/


//            Prism js


