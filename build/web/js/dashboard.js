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

    var materias = ["PPI", "Algoritimo", "Redes", "Redes"];
    var lista = $(".lista-materias");
    var minhasMaterias = lista.parent();


    lista.detach().empty().each(function (i) {
        for (var x = 0; x < materias.length; x++) {
            console.log("entrou");
            $(this).append('<input type="radio" name="materiasRadio" id="materias' + x + '" style="display:none!important" /><label for="materias' + x + '"><li><span>' + materias[x] + '</span></li></label>');
            if (x == materias.length - 1) {
                $(this).appendTo(minhasMaterias);
            }
        }
    });

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
    };

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
            console.log("entrou aqui");
            $('.minhas-materias-adicionadas').slideUp();
        }
        var classe = '.' + $(this).children("span").attr("id");
        console.log(classe);
        $("section").hide();
        $(".site-content").find(classe).addClass("section-aparece");
        //Se tiver a section-aparece, ele exibe ela na tela.
        if ($("section").hasClass("section-aparece")) {
            $(this).show();
        };
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
});
