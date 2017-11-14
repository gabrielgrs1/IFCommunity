$(document).ready(function () {
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
                console.log("entrou");
                $(this).append('<input type="radio" name="materiasRadio" id="materias' + x + '" style="display:none!important" /><label for="materias' + x + '"><li><span>' + materias[x] + '</span></li></label>');
                if (x == materias.length - 1) {
                    $(this).appendTo(minhasMaterias);
                }
            }
        });
    }, 100);

    //Função que pega as matérias do usuário e armazena em um array
    function pegaMaterias(idUsuario) {
        $.ajax({
            url: "RecuperaMaterias",
            type: 'get',
            data: {
                idUsuario: idUsuario
            },
            beforeSend: function () {
                console.log("CARREGANDO MATERIAS");
            }
        })
                .done(function (materia) {
                    console.log(materia);
                    for (var i = 0; i < materia.length; i++) {
                        materias.push(materia[i]);
                    }
                })
                .fail(function (jqXHR, textStatus, materia) {
                    materias.push("Você ainda não tem nenhuma matéria cadastrada!");
                });
    }

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
        //console.log($("section").find("section-aparece"));
        //console.log("entrou");
        console.log($(this).children("span").text());
        //fecha o menu de minhas materias
        //remove a tela que está aparecendo
        $("section").removeClass("section-aparece");

        //console.log($(this).text());
        if ($(this).children("span").text() !== 'Minhas matérias') {
            //  console.log("entrou aqui");
            $('.minhas-materias-adicionadas').slideUp();
        }
        var classe = '.' + $(this).children("span").attr("id");
        //console.log(classe);
        $("section").hide();
        $(".site-content").find(classe).addClass("section-aparece");
        //Se tiver a section-aparece, ele exibe ela na tela.
        if ($("section").hasClass("section-aparece")) {
            $(this).show();
        }
        ;
        trocaCorFundo();
        apareceMenuMensagens($(this).children("span").text());
    });

    /*-----------------------------------------------------------------------------*/

    /*           Checked img na matéria (submenu) que está selecionada         */

    $("input[name='materiasRadio']").click(function () {
        // alert($(this).attr('id'));
        if ($(this).is(':checked')) {
            $('ul label li').removeClass('fundo-checked');
            $(this).next('label').children('li').addClass('fundo-checked');
        }
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


    $(".menu-mensagens").hide();
    function apareceMenuMensagens(textoDoMenu) {
        $(".menu-mensagens").show();
        console.log(textoDoMenu);
        if (textoDoMenu !== 'Minhas matérias') {
            //  console.log("entrou no hide do menu");
            //  console.log("entrou aqui");
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
    window.onload = function () {

        var readOnlyCodeMirror = CodeMirror.fromTextArea(document.getElementById('codesnippet_readonly'), {
            mode: "javascript",
            theme: "default",
            lineNumbers: true,
            readOnly: true
        });

        var editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('codesnippet_editable'), {
            mode: "javascript",
            theme: "default",
            lineNumbers: true
        });

    };



    /*-----------------------------------------------------------------------------*/
});
