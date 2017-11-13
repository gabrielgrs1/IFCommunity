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
        <script type="text/javascript" src="/js/lib/dummy.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/result-light.css">
        <style type="text/css"></style>
        <link rel="stylesheet" href="http://codemirror.net/lib/codemirror.css">
        <script src="http://codemirror.net/lib/codemirror.js"></script>
        <script src="http://codemirror.net/addon/edit/matchbrackets.js"></script>
        <script src="http://codemirror.net/addon/edit/continuecomment.js"></script>
        <script src="http://codemirror.net/mode/javascript/javascript.js"></script>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IFCommunity | Dashboard</title>
        <!-- Import Materialize CSS -->
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
        <!-- Import Material Icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- Import Style CSS -->
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <!-- Import Codemirror -->
        <link rel="stylesheet" href="http://codemirror.net/lib/codemirror.css">
        <!-- Import Codemirror -->
        <script type="text/javascript" src="/js/lib/dummy.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/result-light.css">
        <style type="text/css"></style>
        <script>
            // tell the embed parent frame the height of the content
            if (window.parent && window.parent.parent) {
                window.parent.parent.postMessage(["resultsFrame", {
                        height: document.body.getBoundingClientRect().height,
                        slug: "TcqAf"
                    }], "*");
            }
            ;
        </script>


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
        </main>

        <!-- bar para o modal e modal logo abaixo !-->    

        <div class="menu-mensagens">
            <div class="fixed-action-btn vertical">
                <a class="btn-floating btn-large red">
                    <i class="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <li><a href="#modal1" class="btn-floating yellow darken-1 waves-effect waves-light btn modal-trigger"><i class="material-icons">format_quote</i></a></li>
                    <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                </ul>
            </div>
        </div>

        <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-head">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div class="modal-content">

                <div>

                    <h2>Editable</h2>

                    <textarea rows="4" cols="50" name="codesnippet_editable" id="codesnippet_editable">
// Demo code (the actual new parser character stream implementation)

function StringStream(string) {
  this.pos = 0;
  this.string = string;
}

StringStream.prototype = {
  done: function() {return this.pos >= this.string.length;},
  peek: function() {return this.string.charAt(this.pos);},
  next: function() {
    if (this.pos &lt; this.string.length)
      return this.string.charAt(this.pos++);
  },
  eat: function(match) {
    var ch = this.string.charAt(this.pos);
    if (typeof match == "string") var ok = ch == match;
    else var ok = ch &amp;&amp; match.test ? match.test(ch) : match(ch);
    if (ok) {this.pos++; return ch;}
  },
  eatWhile: function(match) {
    var start = this.pos;
    while (this.eat(match));
    if (this.pos > start) return this.string.slice(start, this.pos);
  },
  backUp: function(n) {this.pos -= n;},
  column: function() {return this.pos;},
  eatSpace: function() {
    var start = this.pos;
    while (/\s/.test(this.string.charAt(this.pos))) this.pos++;
    return this.pos - start;
  },
  match: function(pattern, consume, caseInsensitive) {
    if (typeof pattern == "string") {
      function cased(str) {return caseInsensitive ? str.toLowerCase() : str;}
      if (cased(this.string).indexOf(cased(pattern), this.pos) == this.pos) {
        if (consume !== false) this.pos += str.length;
        return true;
      }
    }
    else {
      var match = this.string.slice(this.pos).match(pattern);
      if (match &amp;&amp; consume !== false) this.pos += match[0].length;
      return match;
    }
  }
};
                    </textarea>

                </div>

                <div class="modal-footer">
                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
                </div>
            </div>


            <!-- Import jQuery -->
            <script src="js/jquery-3.2.1.min.js"></script>
            <!-- Import Materialize JS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
            <script type="text/javascript" src="js/materialize.min.js"></script>
            <!-- Import jQuery Mask JS -->
            <script src="js/jquery.mask.min.js"></script>
            <!-- Import Dashboard JS -->
            <script src="js/dashboard.js"></script>
            <script>
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
            </script>
    </body>

</html>
