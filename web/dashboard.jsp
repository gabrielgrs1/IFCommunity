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
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IFCommunity | Dashboard</title>
        <!-- Import Materialize CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        <!-- Import Material Icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- Import Style CSS -->
        <link rel="stylesheet" type="text/css" href="css/style.css">

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
                    <img src="img/img-usuario.png" />
                </div>
                <h2 id="nome-usuario"><%out.print(nome);%></h2>
            </header>
            <div class="scroll-do-menu">
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
            </div>
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
                                    <input id="icon_prefix" type="text" class="validate nome-perfil-dashboard" value="${nome}">
                                    <label for="icon_prefix">Nome completo</label>
                                    <span id="erro-nome-perfil-dashboard" class="erro-span"></span>
                                </div>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">phone</i>
                                    <input id="icon_telephone" type="tel" class="validate telefone-perfil-dashboard" value="${telefone}">
                                    <label for="icon_telephone">Celular</label>
                                    <span id="erro-telefone-perfil-dashboard" class="erro-span"></span>
                                </div>
							</div>
							<div class="row" id="form-perfil">
                                <div class="input-field col s6">
                                    <i class="material-icons prefix">mail</i>
                                    <input id="email" type="email" class="validate email-perfil-dashboard" value="${email}">
                                    <label for="email">Email</label>
                                    <span id="erro-email-perfil-dashboard" class="erro-span"></span>
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
            <section class="postagens minhas-materias row padding-right">
                
            </section>

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
                                <img id="img-code" src="img/img-coding-section.png">
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
			
			<section class="postagens ajuda">
                <div id="section-ajuda" class="box-padrao">
                    <h3>Ajuda</h3>
                    <ul class="collapsible col s12" data-collapsible="accordion">
                        <li>
                            <div class="collapsible-header"><i class="material-icons">chevron_right</i>Perfil</div>
                            <div class="collapsible-body">
                                <ul id="tabs-perfil" class="tabs">
                                    <li class="tab col s3"><a class="active" href="#perfil-1">O que posso editar no meu perfil</a></li>
                                </ul>
                                <div id="perfil-1" class="col s12">&bull; Existem campos editáveis no perfil e outros não. <br><br>&bull; Os campos editáveis podem ser atualizados, os não editáveis só podem ser atualizados com o contato direto com os administradores.</div>
                        </li>
                        <li>
                            <div class="collapsible-header"><i class="material-icons">chevron_right</i>Menu minhas matérias</div>
                            <div class="collapsible-body">
                                <ul id="tabs-cadastrar" class="tabs">
                                    <li class="tab col s3"><a class="active" href="#cadastrar-1">Como cadastrar nos murais</a></li>
                                    <li class="tab col s3"><a href="#cadastrar-2">Como visualizar postagens</a></li>
                                    <li class="tab col s3"><a href="#cadastrar-3">Como contribuir com o mural</a></li>
                                </ul>
                                <div id="cadastrar-1" class="col s12">&bull; Todo novo usuário começa sem matéria cadastrada.<br><br>&bull; Para cadastrar se cadastrar em alguma matéria deve-se clicar no menu "Gerenciar matérias" ou no sub-menu do menu de "Minhas matérias" onde aparece "Você ainda não tem nenhuma matérias cadastrada".</div>
                                <div id="cadastrar-2" class="col s12">&bull; A partir do momento em que o usuário está cadastrado em uma matéria, ele tem acesso ao mural de postagens com as contribuições dos outros usuários.<br><br>&bull; Basta procurar um tema de interesse e clicar sobre a postagem que ela se expandirá. <strong>As postagens não são editáveis</strong>.</div>
                                <div id="cadastrar-3" class="col s12">&bull; Todo usuário que está cadastrado na matéria pode contribuir com o mural da matéria. <br><br>&bull; É necessário que o aluno acesse a matéria em que deseja postar algo e clique no botão localizado no canto inferior direito de cada mural. <br><br>&bull; É importante lembrar que celulares e tablets só tem permissão para acessar o sistema como leitores, assim não podendo postar nada. <strong>Essa decisão foi tomada por questão de usabilidade</strong>.</div>
                            </div>
                        </li>
                        <li>
                            <div class="collapsible-header"><i class="material-icons">chevron_right</i>Menu gerenciar matérias</div>
                            <div class="collapsible-body">
                                <ul id="tabs-gerenciar" class="tabs">
                                    <li class="tab col s3"><a class="active" href="#gerenciar-1">Cadastrando nas matérias</a></li>
                                    <li class="tab col s3"><a href="#gerenciar-2">Limite de matérias cadastradas</a></li>
                                    <li class="tab col s3"><a href="#gerenciar-3">Inclusão e exclusão de matérias</a></li>
                                </ul>
                                <div id="gerenciar-1" class="col s12">&bull; Todo novo usuário começa com nenhuma matéria cadastrada por padrão.<br><br> &bull; Ao acessar o menu "Gerenciar matérias", o usuário encontrará um menu com os períodos disponíveis no curso do mesmo e as respectivas matérias de cada período.<br><br> &bull; O usuário é livre para cadastrar em qualquer matéria disponível no menu, com um limite de sete cadastros simultâneos.</div>
                                <div id="gerenciar-2" class="col s12">&bull; Cada usuário pode estar cadastrado simultaneamente em até sete murais de matérias.</div>
                                <div id="gerenciar-3" class="col s12">&bull; As matérias em que o usuário estiver cadastrado estarão com um checked neste menu, o contrário significa o não cadastro. <br><br> &bull; O mesmo é livre para cadastrar e remover algum mural a qualquer momento, perdendo apendas, enquanto não estiver cadastrado, o privilégio de postar e ter acesso à matéria não cadastrada.</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

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
                        <li><a href="#modal1" id="modal-de-escrever-codigo" class="btn-floating green lighten-2 waves-effect waves-light btn modal-trigger tooltipped" data-position="left" data-delay="50" data-tooltip="Adicionar código"><i class="material-icons">add</i></a></li>
                        <li><a href="#modal-buscar" class="btn-floating grey tooltipped modal-trigger" data-position="left" data-delay="50" data-tooltip="Buscar"><i class="material-icons">search</i></a></li>
                    </ul>
                </div>
            </div>

            <!-- Modal Structure -->
            <div id="modal-buscar" class="modal">
                <div class="modal-content">
                    <h4>Buscar uma postagem</h4>
                    <input type="text" placeholder="Autor, titulo ou data">
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat"><i class="material-icons">search</i>Buscar</a>
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
                            <input id="icon_prefix" name="assunto" type="text" class="validate" required="required">
                            <label for="icon_prefix">Titulo da postagem</label>
                        </div>
                        <div id="qual-linguagem-modal" class="input-field col s6">
                            <i class="material-icons prefix small">code</i>
                            <select name="qual-linguagem" required="required">
                                <option value="" disabled selected>Selecione a linguagem</option>
                                <option value="3">HTML</option>
                                <option value="2">Java</option>
                                <option value="1">Javascript</option>
                                <option value="4">Texto</option>
                            </select>
                            <label>Linguagem</label>
                        </div>

                    </div>

                    <div class="modal-content">   
                        <textarea class="paraTextoNormal"></textarea>

                        <pre id="editor" class="paraCodigo"></pre>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="modal-action modal-close waves-effect waves-green btn-flat modal-close" id="btn-submeter-postagem" name="action">Submeter</button>
                    </div>
                </form>
            </div>

        </main>


        <!-- Import jQuery -->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <!-- Import Materialize JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        <!-- Import Ace  JS -->      
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/ace.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-css.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-html.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-java.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-javascript.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/theme-twilight.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/worker-css.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/worker-html.js" type="text/javascript" charset="utf-8"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/worker-javascript.js" type="text/javascript" charset="utf-8"></script>
        <!-- Import jQuery Mask JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.js"></script>
        <!-- Import Dashboard JS -->
        <script src="js/dashboard.js"></script>
    </body>

</html>
