/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import dao.AlunoDAO;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Aluno;

/**
 *
 * @author Gabriel Silva
 */
@WebServlet(name = "Cadastrar", urlPatterns = {"/Cadastrar"})
public class Cadastrar extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // O comando abaixo ajusta os caracteres especiais.
        request.setCharacterEncoding("UTF-8");
        String nome = request.getParameter("nome"),
                telefone = request.getParameter("telefone"),
                matricula = request.getParameter("matricula"),
                periodo = request.getParameter("periodo"),
                login = request.getParameter("login-cadastro").toLowerCase(),
                senha = request.getParameter("senha"),
                email = request.getParameter("email");
        Aluno conta = null;
        String erros = "";
        try {
            erros = AlunoDAO.podeCadastrar(nome, telefone, matricula, periodo, login, senha, email);
            if (erros.equals("")) {
                conta = AlunoDAO.cadastro(nome, telefone, matricula, periodo, login, senha, email);
            }
        } catch (SQLException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        request.setAttribute("erros", erros);
        request.setAttribute("login", login.toLowerCase());

        String dirName = request.getServletContext().getRealPath("/img/");

        if (conta != null) {
            buscaFoto(login, dirName, conta);
            
            request.getSession().setAttribute("id", conta.getId());
            request.getSession().setAttribute("nome", conta.getNome());
            request.getSession().setAttribute("login", conta.getLogin());
            request.getSession().setAttribute("periodo", conta.getPeriodo());
            request.getSession().setAttribute("telefone", conta.getTelefone());
            request.getSession().setAttribute("permissao", conta.getPermissao());
            request.getSession().setAttribute("materias", conta.getMaterias());
            request.getSession().setAttribute("email", conta.getEmail());
            request.getSession().setAttribute("matricula", conta.getMatricula());
            request.getSession().setAttribute("foto", conta.getFoto());
            
            request.getSession().setMaxInactiveInterval(-1);
            response.sendRedirect("dashboard.jsp");
        } else {
            request.setAttribute("erros-cadastro", erros);
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }
    
        private void buscaFoto(String login, String dirName, Aluno conta) {
        String[] extentions = {".jpg", ".jpeg", ".bmp", ".png"};

        for (String extention : extentions) {
            String fotoPerfil = dirName + login + extention;
            File file = new File(fotoPerfil);
            Random random = new Random();
            if (file.exists()) {
                fotoPerfil = "img/" + login + extention + "?" + random.nextInt(1000000);
                conta.setFoto(fotoPerfil);
                break;
            } else {
                fotoPerfil = "img/" + "img-usuario.png";
                conta.setFoto(fotoPerfil);
            }
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
