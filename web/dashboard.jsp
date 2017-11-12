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
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
        <!-- Import Material Icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- Import Style CSS -->
        <link rel="stylesheet" type="text/css" href="css/style.css">

    </head>

    <body id="body-principal">

        <div class="content-header valign-wrapper">
            <h1 class="section-title">IF<span class="section-title-dois">community</span></h1>
        </div>
        <nav class="nav-side menu">
            <a href="#" class="nav-toggle"></a>
            <header class="avatar">
                <div class="container">
                </div>
                <h2>
                    <%
                        out.print(nome);
                    %>
                </h2>
                <form name="form-login" class="" action="Deslogar" method="GET">
                    <input type="submit" name="botao-deslogar" value="deslogar-teste">
                </form>
            </header>
            <ul class="para-scroll">
                <li tabindex="0" class="icon-users"><span id="perfil">Perfil</span></li>
                <li tabindex="0" class="icon-materias"><span id="minhas-materias">Minhas matérias</span>
                </li>
                <div class="minhas-materias-adicionadas">
                    <ul class="lista-materias">
                        <%
                            out.print("<li>");

                            out.print("</li>");
                        %>
                    </ul>
                </div>
                <li tabindex="0" class="icon-dashboard"><span id="adicionar-materias">Adicionar matérias</span></li>
                <li tabindex="0" class="icon-settings"><span id="config">Configurações</span></li>
            </ul>
        </nav>

        <main class="site-content">
            <section class="postagens perfil section-aparece">
                <div class="sc-edprofile">
                    <h1>Edit Profile Form</h1>
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" class="validate">
                                    <label for="icon_prefix">Primeiro nome</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" class="validate">
                                    <label for="icon_prefix">Sobrenome</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">Telefone</i>
                                    <input id="icon_telephone" type="tel" class="validate">
                                    <label for="icon_telephone">Celular</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">mail</i>
                                    <input id="email" type="email" class="validate">
                                    <label for="email">Email</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">face</i>
                                    <select>
                                        <option value="" disabled selected>Selecione</option>
                                        <option value="1">1° Período</option>
                                        <option value="2">2° Período</option>
                                        <option value="3">3° Período</option>
                                        <option value="4">4° Período</option>
                                        <option value="5">5° Período</option>
                                    </select>
                                    <label>Período</label>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">school</i>
                                    <input id="icon_prefix" type="number" class="validate">
                                    <label for="icon_prefix">Matrícula</label>
                            </div>
                            </div>
                        </form>
                    </div>
            </section>

            <section class="postagens minhas-materias">
                <%
                    int contPostagens = 10;
                    for (int i = 0; i < contPostagens; i++) {
                        out.print("<div class='content-topic'>");
                        out.print("<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</h1>");
                        out.print("</div>");
                    }
                %>
            </section>
        </div>
        </main>

        <!-- Import jQuery -->
        <script src="js/jquery-3.2.1.min.js"></script>
        <!-- Import Materialize JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        <script type="text/javascript" src="js/materialize.min.js"></script>
        <!-- Import jQuery Mask JS -->
        <script src="js/jquery.mask.min.js"></script>
        <!-- Import Dashboard JS -->
        <script src="js/dashboard.js"></script>
    </body>

</html>
