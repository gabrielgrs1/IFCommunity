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
        <title>Dashboard | IFcommunity</title>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    </head>

    <body id="body-principal">
        <div class="content-header">
            <h1 class="section-title">IF<span class="section-title-dois">community</span></h1>
        </div>
        <nav class="nav-side menu">
            <a href="#" class="nav-toggle"></a>
            <header class="avatar">
                <div class="container">
                </div>
                <%
                    out.print("<h2>");
                    out.print(nome);
                    out.print("</h2>");
                %>
                <form name="form-login" class="" action="Deslogar" method="GET">
                    <input type="submit" name="botao-deslogar" value="deslogar-teste">
                </form>
            </header>
            <ul class="paraScroll">
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
                <center>
                    <h1>COMENTEI A EDIÇÃO DE PERFIL PRA EDITARMOS DEPOIS</h1>
                    <h3>ACHO UMA BOA COLOCAR A PÁGINA INICIAL QUANDO O USUARIO LOGAR PELA PRIMEIRA VEZ A TELA DE CADASTRAR MATÉRIAS</h3>
                </center>
                <!--<div class="sc-edprofile">
                    <h1>Edit Profile Form</h1>
                    <div class="sc-container" align="center">

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Nome de usuário</label>
                        </div>

                        <div class="group col-5">
                            <input type="password" required>
                            <span class="bar"></span>
                            <label>Senha</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Email</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Contato</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Nome</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Sobrenome</label>
                        </div>

                        <div class="group col-10">
                            <textarea class="col-12" required></textarea>
                            <span class="bar"></span>
                            <label>Bio</label>
                        </div>

                        <div class="group col-5">
                            <select class="col-12" required>
                                <option value="" disabled selected></option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                            <label>Sexo</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Curso </label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Link para perfil Facebook</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>link para página no Twitter</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Link para perfil Google+</label>
                        </div>

                        <div class="group col-5">
                            <input type="text" required>
                            <span class="bar"></span>
                            <label>Link para perfil Uri</label>
                        </div>
                        <div style="height: 1em;"></div>
                        <input class="col-5" type="submit" value="Registrar" />
                        <input class="col-5" type="reset" value="Limpar" />
                        <div style="height: 1em;"></div>
                    </div>-->
                </div>
            </section>

            <section class="postagens minhas-materias">
                <%
                    int contPostagens = 3;
                    for (int i = 0; i < contPostagens; i++) {
                        out.print("<div class='content-topic'>");
                        out.print("<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</h1>");
                        out.print("</div>");
                    }
                %>
            </section>
        </main>

        <!-- Import jQuery -->
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <!-- Import Materialize JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        <!-- Import Login JS -->
        <script src="js/dashboard.js"></script>
    </body>

</html>
