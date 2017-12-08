/*-----------------------------------------------------------------------------*/
$('.telefone-perfil').mask('(00) 00009-0000');


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
            $(".adicionar-materias div.box-padrao .row > ul.collapsible").empty();
            retornaMaterias();
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
var periodoMateria = [];
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
                    console.log("Erro 500, não foi possível estabelecer conexão com o servidor!");
                } else if (jqXHR["status"] === 502) {
                    console.log("Erro 502, não foi possível estabelecer conexão!");
                } else if (jqXHR["status"] === 404) {
                    console.log("Erro 404, não foi encontrado o diretório solicitado!");
                }
                preencheAListaDeMateriasDoMenu();
            });
}

/*-----------------------------------------------------------------------------*/

/*           Checked img na matéria (submenu) que está selecionada         */
/* ela tem que carregar após as matérias serem carregadas para funcionar   */

setTimeout(function () {
    checkedNasMateriasDoMenu();
}, 400);

function checkedNasMateriasDoMenu() {
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
}






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
/*-----------------------------------------------------------------------------*/

$("#modal-de-escrever-codigo").click(function () {
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
        // $('.modal-content').children().remove();
        console.log("entrou no click do botao pra abrir modal de texto");
        $('.paraTextoNormal').show();
        $('.paraCodigo').hide();

    } else {
        $('.paraTextoNormal').hide();
        $('.paraCodigo').show();
        // $('.modal-content').children().remove();
        console.log("entrou no tipo diferente de texto normal");
        qualLinguagem(text);
    }
}
;
/*-----------------------------------------------------------------------------*/
/*                Highlight dos escritos dos códigos   Ace js                   */

$('.modal').modal();

var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/javascript");

function qualLinguagem(text) {
    var novoModo = text.toLowerCase()
    console.log(novoModo);
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/" + novoModo);
}

function qualLinguagemParaPostagem(text, IDPostagem) {
    // precisa mudar o modo de acordo com o modo que retornar do banco.
    var novoModo = text.toLowerCase()
    console.log(novoModo);
    var editor = ace.edit("editorLeitura" + IDPostagem);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/" + novoModo);
    editor.setReadOnly(true);
}

/*-----------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*                  Postagens colapsadas                   */
function collapsible() {
    $('.collapsible').collapsible();
}

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
    pegaPostagensDaMateriaSelecionada();
}, 400);
function pegaPostagensDaMateriaSelecionada() {
    $("input[name='materias-radio']").click(function () {
        // console.log("Fluxo 1");
        // console.log("entrou no que pega a materia para postagem");
        var materia;
        materia = $(".fundo-checked").children().text();
        pegaPostagens(materia);
    });
}

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

            setTimeout(function () {
                if (postagens.length === 0) {

                    Materialize.toast('Erro ao recuperar postagens, contate um administrador!', 6000, 'red');
                    $(".preloader-wrapper").hide();
                }

            }, 10000);
            // console.log("CARREGANDO POSTAGENS");
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
                if (jqXHR["status"] === 500) {
                    console.log("Erro 500, não foi possível estabelecer conexão com o servidor!");
                } else if (jqXHR["status"] === 502) {
                    console.log("Erro 502, não foi possível estabelecer conexão!");
                } else if (jqXHR["status"] === 404) {
                    console.log("Erro 404, não foi encontrado o diretório solicitado!");
                }
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
        var materiaPostagem = postagens[x]["materia"];
        var IDPostagem = postagens[x]["id"];
        var linguagemPostagem = postagens[x]["linguagem"];

//        console.log(IDPostagem);
        adicionaPostagens(textoPostagem, autorPostagem, tituloPostagem, dataPostagem, materiaPostagem, IDPostagem);
        collapsible();
        qualLinguagemParaPostagem("javascript", IDPostagem);
    }

    if (postagens.length === 0) {
// console.log("entrou se postagens estiver vazio");
        $(".minhas-materias").empty();
        $(".minhas-materias").prepend("<h2 class='align-center'>NÃO HÁ NENHUMA POSTAGEM NESSA MATÉRIA<h2>");
    }
}

//Função que adiciona a estrutura de postagem
function adicionaPostagens(textoPostagem, autorPostagem, tituloPostagem, dataPostagem, materiaPostagem, IDPostagem) {
    // console.log("Fluxo 4");
    // console.log(IDPostagem);

    //Manipulação da data da postagem
    var temporarioData = dataPostagem.split(" ");
    var temporarioHora = temporarioData[1].split(".");

    //Manipulação da hora da postagem
    var horaPostagem = temporarioHora[0];
    horaPostagem = horaPostagem.split(":");
    horaPostagem = horaPostagem[0] + ":" + horaPostagem[1];

    //Manipulação do dia da postagem
    var dataPostagemTemp = temporarioData[0];
    dataPostagemTemp = dataPostagemTemp.split("-");
    dataPostagemTemp = dataPostagemTemp[2] + "/" + dataPostagemTemp[1] + "/" + dataPostagemTemp[0];

    //Concatenação da data e hora manipulada
    dataPostagem = "às " + horaPostagem + " " + dataPostagemTemp;

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
    var criaPreBody = document.createElement("pre");
    var criaDivBotões = document.createElement("div");
    var criaALike = document.createElement("a");
    var criaILike = document.createElement("i");
    var criaADislike = document.createElement("a");
    var criaIDislike = document.createElement("i");
    var criaPDataPostagem = document.createElement("p");


    criaDivHead.setAttribute("class", "collapsible-header");
    criaH4Titulo.setAttribute("class", "center");
    criaH4Titulo.innerHTML = tituloPostagem;
    criaPNome.innerHTML = autorPostagem + "<br><span class='data-postagem' id='data-hora-postagem-'" + IDPostagem + ">" + dataPostagem;
    criaPNome.setAttribute("class", "right-align autor-postagem");
    criaPSeta.setAttribute("class", "setinha-indicadora center");
    criaUlHead.setAttribute("class", "container");
    criaDivBody.setAttribute("class", "collapsible-body");
    criaPreBody.setAttribute("id", "editorLeitura" + IDPostagem);
    criaPreBody.setAttribute("class", "paraCodigoPostagens");
    criaPreBody.innerHTML = textoPostagem;
    criaDivBotões.setAttribute("class", "botoes-das-postagens right-align");
    criaALike.setAttribute("class", "waves-effect waves-light btn right-align botao-curtida");
    criaILike.setAttribute("class", "material-icons left");
    criaILike.innerHTML = "thumb_up";
    criaDivBotões.setAttribute("class", "botoes-das-postagens right-align");
    criaADislike.setAttribute("class", "waves-effect waves-light btn right-align botao-curtida");
    criaIDislike.setAttribute("class", "material-icons left");
    criaIDislike.innerHTML = "thumb_down";
    criaDivBotões.setAttribute("id", IDPostagem);
    criaUl.setAttribute("class", "collapsible content-topic z-depth-2 container row");
    criaUl.setAttribute('data-collapsible', "accordion");
    criaLiHead1.append(criaH4Titulo);
    criaLiHead2.append(criaPNome);
    criaLiHead2.append(criaPSeta);
    criaUlHead.append(criaLiHead1);
    criaUlHead.append(criaLiHead2);
    criaDivHead.append(criaUlHead);
    criaDivBody.append(criaPreBody);
    criaALike.append(criaILike);
    criaADislike.append(criaIDislike);
    criaDivBotões.append(criaALike);
    criaDivBotões.append(criaADislike);
    criaDivBody.append(criaDivBotões);
    criaLi.setAttribute("id", IDPostagem);
    criaLi.append(criaDivHead);
    criaLi.append(criaDivBody);
    criaUl.append(criaLi);
    criaUl.setAttribute("id", IDPostagem);
    // quando criar a regra de retorno do banco decide o prepend ou append.
    secaoDePostagens.prepend(criaUl);
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
//          GERENCIAR MATERIAS    

// Primeiro, do vetor com as matérias que ele já tem e os períodos delas.
// O vetor das materias, ja temos, agora falta o dos períodos.


function retornaMaterias() {
    $.ajax({
        url: "RecuperaMateriasTelaAdicionar",
        type: 'post',
        beforeSend: function () {
            $("#section-materias #div-loading").slideDown(500);
            console.log("Recuperando as matérias");
        }
    })
            .done(function (materiasJSON) {
                $("#section-materias #div-loading").hide();
                console.log(materiasJSON);
                periodoMateria = [];
                for (var i = 0; i < materiasJSON.length; i++) {
                    periodoMateria.push(materiasJSON[i]);
                }

                gerenciarMateriasConteudo();

            })
            .fail(function (jqXHR, textStatus, postagem) {
                $("#div-loading").hide();
                if (jqXHR["status"] === 500) {
                    console.log("Erro 500, não foi possível estabelecer conexão com o servidor!");
                } else if (jqXHR["status"] === 502) {
                    console.log("Erro 502, não foi possível estabelecer conexão!");
                } else if (jqXHR["status"] === 404) {
                    console.log("Erro 404, não foi encontrado o diretório solicitado!");
                }
            });
}

function gerenciarMateriasConteudo() {
    var todosOsPeriodosRecebidos = [];

    for (var x = 0; x < periodoMateria.length; x++) {
        var periodoMateriaSplit = periodoMateria[x].split(";");
        todosOsPeriodosRecebidos.push(periodoMateriaSplit[1]);
    }
    // console.log(todosOsPeriodosRecebidos);

    // tirar os duplicados pra ver os períodos que tem
    var periodosQueTem = todosOsPeriodosRecebidos.filter(function (este, i) {
        return todosOsPeriodosRecebidos.indexOf(este) == i;
    })
    // console.log(periodosQueTem);

    adicionaPeriodos(periodosQueTem);
    function adicionaPeriodos(periodosQueTem) {
        var periodosQueTemOrdenados = periodosQueTem.sort();

        for (var x = 0; x < periodosQueTem.length; x++) {
            // console.log(periodosQueTem);
            var criaTextoDoBody = document.createElement("p");
            var criaDivBody = document.createElement("div");
            var criaDivHeader = document.createElement("div");
            var nomeDoCriaLi = ("criaLi" + periodosQueTemOrdenados[x]);
            // console.log(nomeDoCriaLi);
            nomeDoCriaLi = document.createElement("li");
            criaDivBody.setAttribute("class", "collapsible-body row");
            criaDivBody.setAttribute("id", periodosQueTemOrdenados[x]);
            criaDivHeader.setAttribute("class", "collapsible-header");
            criaDivHeader.appendChild(document.createTextNode(periodosQueTemOrdenados[x] + "° Período"));
            nomeDoCriaLi.append(criaDivHeader);
            nomeDoCriaLi.append(criaDivBody);
            $(".adicionar-materias div.box-padrao .row > ul.collapsible").append(nomeDoCriaLi);
        }
    }


    criaLinhasDeMaterias(periodosQueTem, periodoMateria);
    function criaLinhasDeMaterias(periodosQueTem, periodoMateria) {
        periodoMateria.sort();
        // console.log(periodoMateria);
        for (var x = 0; x < periodoMateria.length; x++) {
            // Pegar nome da matéria
            var periodoMateriaSplit = periodoMateria[x].split(";");
            var materia = periodoMateriaSplit[0];
            var periodo = periodoMateriaSplit[1];
            // console.log(materia);

            var criaNomeMateria = document.createElement("span");
            var criaLi = document.createElement("li");
            var nomeDoCriaLabel = ("criaLabel" + [x]);
            // console.log(nomeDoCriaLabel);
            nomeDoCriaLabel = document.createElement("label");
            var nomeDoCriaInput = ("criaInput" + [x]);
            // console.log(nomeDoCriaInput);
            nomeDoCriaInput = document.createElement("input");
            criaNomeMateria.appendChild(document.createTextNode(materia));
            criaLi.append(criaNomeMateria);
            nomeDoCriaLabel.setAttribute("for", "test" + x);
            nomeDoCriaLabel.setAttribute("class", "col s12");
            nomeDoCriaLabel.append(criaLi);
            nomeDoCriaInput.setAttribute("type", "checkbox");
            nomeDoCriaInput.setAttribute("id", "test" + x);
            nomeDoCriaInput.setAttribute("name", materia);
            $(".adicionar-materias div.box-padrao .row > ul.collapsible  li").find("div.collapsible-body").each(function () {
                if (this.id == periodo) {
                    // console.log(this.id);
                    this.append(nomeDoCriaInput);
                    this.append(nomeDoCriaLabel);
                }

            });
        }
    }

    var todosOsCheckBox = $("input[type='checkbox']");
    todosOsCheckBox.each(function () {
        // console.log($(this).attr('name'));
        var temNoArrayDeMateriasOuNao = materias.indexOf($(this).attr('name'));
        // console.log(temNoArrayDeMateriasOuNao);
        if (temNoArrayDeMateriasOuNao == -1) {
            // console.log("se entrou aqui é pq n tem a materia cadastrada");
        } else {
            // console.log("se entrou aqui é pq tem a materia cadastrada");
            // console.log($(this).attr('name'));
            if ($(this).prop("checked", false)) {
                $(this).prop("checked", true);
            }
        }
    });
}
;

// PEGAR TODOS OS CHECKED BOX CHECADOS PRA VER AS MATÉRIAS QUE O CARA TÁ CADASTRANDO EM TEMPO REAL
$(document).on("change", "input[type='checkbox']", atualizaMaterias);

function atualizaMaterias() {
    novoVetorDeMaterias = materias.slice(0);
    // console.log(novoVetorDeMaterias);
    if (this.checked) {
        // console.log($(this).attr('name'));
        // verifica se já tem a matéria no array de matérias, se não tiver, adiciona ela com ajax.
        var temNoArrayDeMateriasOuNao = materias.indexOf($(this).attr('name'));
        // console.log(temNoArrayDeMateriasOuNao);
        if (temNoArrayDeMateriasOuNao == -1) {
            // console.log("não tem");

            // Limite de matérias
            if (novoVetorDeMaterias.length >= 7) {
                Materialize.toast('Você já atingiu o máximo de matérias, remova alguma antes!', 2500, 'red');
                $(this).prop("checked", false);
                return;
            }

            novoVetorDeMaterias.push($(this).attr('name'));
            // console.log(novoVetorDeMaterias);
            materias = novoVetorDeMaterias.slice(0);
            materias.sort();
            preencheAListaDeMateriasDoMenu();
            checkedNasMateriasDoMenu();
            pegaPostagensDaMateriaSelecionada();
        }
    } else {
        //  console.log($(this).attr('name'));
        var index = novoVetorDeMaterias.indexOf($(this).attr('name'));
        //  console.log(index);
        novoVetorDeMaterias.splice(index, 1);
        //  console.log(novoVetorDeMaterias);
        materias = novoVetorDeMaterias.slice(0);
        materias.sort();
        preencheAListaDeMateriasDoMenu();
        checkedNasMateriasDoMenu();
        pegaPostagensDaMateriaSelecionada();
    }

    atualizaMateriasTelaAdicionar(materias, $("#id-usuario").text());

    function atualizaMateriasTelaAdicionar(materias, id) {
        $.ajax({
            url: "AtualizaMateriaTelaAdicionar",
            type: 'get',
            data: {
                materia1: materias[0],
                materia2: materias[1],
                materia3: materias[2],
                materia4: materias[3],
                materia5: materias[4],
                materia6: materias[5],
                materia7: materias[6],
                idUsuario: id
            },
            beforeSend: function () {
                Materialize.toast('Matéria atualizada com sucesso!', 2500, 'green');
                console.log("Atualizando as matérias");
            }
        })
                .done(function () {
                    console.log("Materias atualizadas com sucesso!");
                })
                .fail(function (jqXHR, textStatus, resultado) {
                    if (jqXHR["status"] === 500) {
                        console.log("Erro 500, não foi possível estabelecer conexão com o servidor!");
                    } else if (jqXHR["status"] === 502) {
                        console.log("Erro 502, não foi possível estabelecer conexão!");
                    } else if (jqXHR["status"] === 404) {
                        console.log("Erro 404, não foi encontrado o diretório solicitado!");
                    }
                });
    }
}
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
                if (jqXHR["status"] === 500) {
                    console.log("Erro 500, não foi possível estabelecer conexão com o servidor!");
                } else if (jqXHR["status"] === 502) {
                    console.log("Erro 502, não foi possível estabelecer conexão!");
                } else if (jqXHR["status"] === 404) {
                    console.log("Erro 404, não foi encontrado o diretório solicitado!");
                }
            });
}

//Chama a função de deslogar quando clica dentro do item
$("#li-deslogar").on('click', function (e) {
    e.preventDefault();
    deslogar();
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
//ATUALIZAÇÃO DE PERFIL
$("#btn-atualizar-perfil").click(function () {
    var aluno = [];
    atualizaPerfilAJAX($("#id-usuario").text(), $(".nome-perfil").val(), $(".telefone-perfil").val(), $(".email-perfil").val());
});

//Limpa os campos do perfil
$("#btn-limpar-perfil").click(function () {
    $(".nome-perfil").val("");
    $(".telefone-perfil").val("");
    $(".email-perfil").val("");
});

//Função que muda nome do perfil após atualizar perfil
function atualizaNomePerfil() {
    var nomePerfil = aluno[0];
    nomePerfil = nomePerfil.split(" ");
    if (nomePerfil.length > 1) {
        nomePerfil = nomePerfil[0] + " " + nomePerfil[1];
    } else {
        nomePerfil = nomePerfil[0];
    }

    $("#nome-usuario").text(nomePerfil);
}

//Função que atualiza os dados do usuario e retorna os novos dados inseridos no banco
function atualizaPerfilAJAX(id, nome, telefone, email) {
    $.ajax({
        url: "AtualizaPerfil",
        type: 'post',
        data: {
            id: id,
            nome: nome,
            telefone: telefone,
            email: email
        },
        beforeSend: function () {
            $("#section-perfil #div-loading").slideDown(500);
            console.log("Atualizando dados do perfil");
        }
    })
            .done(function (alunoJSON) {
                $("#section-perfil #div-loading").slideUp(500);
                console.log(alunoJSON);

                aluno = [];
                for (var i = 0; i < alunoJSON.length; i++) {
                    aluno.push(alunoJSON[i]);
                }

                atualizaNomePerfil();
                Materialize.toast('Perfil atualizado com sucesso!', 2500, 'green');

            })
            .fail(function (jqXHR, textStatus, postagem) {
                $("#section-perfil #div-loading").slideUp(500);
                if (jqXHR["status"] === 500) {
                    console.log("Erro 500, não foi possível estabelecer conexão com o servidor!");
                } else if (jqXHR["status"] === 502) {
                    console.log("Erro 502, não foi possível estabelecer conexão!");
                } else if (jqXHR["status"] === 404) {
                    console.log("Erro 404, não foi encontrado o diretório solicitado!");
                }

                Materialize.toast('Erro ao atualizar o perfil, contate um administrador!', 2500, 'red');
            });
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/





