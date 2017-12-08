<%-- 
    Document   : dashboard
    Created on : 01/11/2017, 21:27:58
    Author     : Gabriel Silva
--%>

<%@page import="model.Aluno"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String nome = (String) request.getSession().getAttribute("nome");

    if (nome == null) {
        request.getSession().setAttribute("nome", null);
        response.sendRedirect("index.jsp");
    } else {
        String[] nomeSplitado = nome.split(" ");
        if (nomeSplitado.length > 2) {
            nome = nomeSplitado[0] + " " + nomeSplitado[1];
        }
    }
%>
<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IFCommunity | Dashboard</title>
        <!-- Import Materialize CSS -->
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
        <!-- Import Material Icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- Import Style CSS -->
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <!-- Import prism -->
        <link href="css/prism.css" rel="stylesheet" />

        <link rel="stylesheet" type="text/css" href="css/result-light.css">

    </head>

    <body id="body-principal">

        <div class="content-header valign-wrapper">
            <h1 class="section-title">IF<span class="section-title-dois">community</span></h1>
        </div>
        <span id="id-usuario">${id}</span>
        <nav class="nav-side menu">
            <a href="#" class="nav-toggle"></a>
            <header class="avatar">
                <div class="container">
                </div>
                <h2 id="nome-usuario"><%out.print(nome);%></h2>
            </header>
            <ul class="para-scroll">
                <li tabindex="0" class="icon-users"><span id="perfil">Perfil</span></li>
                <li tabindex="0" class="icon-materias"><span id="minhas-materias">Minhas matérias</span></li>
                <div class="minhas-materias-adicionadas">
                    <ul class="lista-materias"></ul>
                </div>
                <li tabindex="0" class="icon-dashboard"><span id="adicionar-materias">Gerenciar matérias</span></li>
                <li tabindex="0" class="icon-help"><span id="ajuda">Ajuda</span></li>
                <li tabindex="0" id="li-deslogar" class="icon-sair"><span id="btn-deslogar">Sair</span></li>
            </ul>
        </nav>

        <main class="site-content">


            <!-- Sessão do perfil !--> 
            <section class="postagens perfil section-aparece">
                <div id="section-perfil" class="box-padrao">
                    <h3>Perfil</h3>
                    <div class="row">
                        <form class="col s12" id="form-perfil-div">
                            <div class="row" id="form-perfil">
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" class="validate nome-perfil" value="${nome}">
                                    <label for="icon_prefix">Nome completo</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">phone</i>
                                    <input id="icon_telephone" type="tel" class="validate telefone-perfil" value="${telefone}">
                                    <label for="icon_telephone">Celular</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">mail</i>
                                    <input id="email" type="email" class="validate email-perfil" value="${email}">
                                    <label for="email">Email</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">school</i>
                                    <input disabled id="icon_prefix" type="text" class="validate" value="${matricula}">
                                    <label for="icon_prefix">Matrícula</label>
                                </div>
                            </div>

                            <div id="div-loading">
                                <div class="progress">
                                    <div class="indeterminate"></div>
                                </div>
                            </div>
                            <div class="row center-align">
                                <button class="btn btn-large waves-effect waves-light green" id="btn-atualizar-perfil" type="button" name="action">Enviar<i class="material-icons right">send</i></button>
                                <button class="btn btn-large waves-effect waves-light red" type="button" id="btn-limpar-perfil" name="action">Limpar Campos<i class="material-icons right">cancel</i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <!-- Sessão de postagens !--> 
            <section class="postagens minhas-materias row padding-right"></section>

            <section class="postagens adicionar-materias">
                <div id="section-materias" class="box-padrao">
                    <h3>Gerenciar matérias</h3>
                    <div id="div-loading">
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </div>

                    <div class="row">
                        <ul class="collapsible" data-collapsible="accordion">

                        </ul>
                    </div>
                </div>
            </section>


            <!-- Aviso no click de minhas matérias !--> 
            <div class="aviso-minhas-materias container box-padrao">
                <h3>Coding section</h3>
                <div class="page-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col l6 s12 center-align">
                                <h5 class="black-text">Bem vindo ao dashboard de postagens!</h5>
                                <img id="img-code" src="https://www.happycodeclub.com/wp-content/uploads/2017/07/cropped-HappyCodeRedLogo_SmileOnlyCuout-300x300.png">
                            </div>
                            <div class="col l4 offset-l2 s12">
                                <h5 class="black-text">Tips</h5>
                                <ul>
                                    <li>Clique em uma das matérias em que você está cadastrado no menu ao lado.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copyright row">
                        <div class="col s12 grey-text darken-1 center-align"><strong> <> Keep coding </strong></div>
                    </div>
                </div>
            </div>

            <!-- aqui é o loader que exibe enquanto carrega algo !--> 
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>

            <!-- bar para o modal e modal logo abaixo !-->  
            <div class="botao-modal">
                <div class="fixed-action-btn vertical">
                    <a class="btn-floating btn-large indigo darken-3">
                        <i class="large material-icons">code</i>
                    </a>
                    <ul>
                        <li ><a href="#modal1" id="modal-de-escrever-codigo" class="btn-floating green lighten-2 waves-effect waves-light btn modal-trigger tooltipped" data-position="left" data-delay="50" data-tooltip="Adicionar código"><i class="material-icons">add</i></a></li>
                        <li><a class="btn-floating grey tooltipped" data-position="left" data-delay="50" data-tooltip="Buscar"><i class="material-icons">search</i></a></li>
                    </ul>
                </div>
            </div>



            <div id="modal1" class="modal modal-fixed-footer">
                <form id="formDoModal">
                    <div class="modal-head center">
                        <p>Escreva aqui a sua contribuição!</p>
                    </div>
                    <hr>

                    <div class="row col s12">
                        <div class="input-field col s6">
                            <i class= "material-icons prefix small">subject</i>
                            <input id="icon_prefix" type="text" class="validate" required="required">
                            <label for="icon_prefix">Assunto</label>
                        </div>
                        <div id="qual-linguagem-modal" class="input-field col s6">
                            <i class="material-icons prefix small">code</i>
                            <select name="qual-linguagem" required="required">
                                <option value="" disabled selected>Selecione</option>
                                <option value="1">Javascript</option>
                                <option value="2">Java</option>
                                <option value="3">HTML</option>
                                <option value="4">Texto</option>
                            </select>
                            <label>Linguagem</label>
                        </div>

                    </div>

                    <div class="modal-content">   
                        <textarea class="paraTextoNormal"></textarea>

                        <pre id="editor" class="paraCodigo">function foo(items) {
                        var i;
                        for (i = 0; i &lt; items.length; i++) {
                            alert("Ace Rocks " + items[i]);
                        }
                    }</pre>
                    </div>

                    <div class="modal-footer">
                        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Submeter</a>
                    </div>
                </form>
            </div>

        </main>


        <!-- Import jQuery -->
        <script src="js/jquery-3.2.1.min.js"></script>
        <!-- Import Materialize JS -->
        <script type="text/javascript" src="js/materialize.min.js"></script>
        <!-- Import Ace  JS -->      
        <script src="src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
        <!-- Import jQuery Mask JS -->
        <script src="js/jquery.mask.min.js"></script>
        <!-- Import Dashboard JS -->
        <script src="js/dashboard.js"></script>

    </body>

</html>
