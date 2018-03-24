package controller;

import Criptografia.Desencrip;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.Aluno;
import dao.AlunoDAO;

@WebServlet(name = "Login", urlPatterns = {"/Login"})
public class Login extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String login = request.getParameter("login");
        String senha = request.getParameter("senha");
        String erros = "";
        String Senha = "";
        String concat = "";
        try {
            // Aqui é passado a senha da tela e retornado erro de senha e senha do banco concatenadas.
            concat = AlunoDAO.verificaLoginSenha(login, senha);
            String splitado[] = new String[3];
            splitado = concat.split("®");
            erros = splitado[0];
            senha = splitado[1];
            
        } catch (SQLException ex) {
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
        }

        Aluno conta = null;
        if ("".equals(erros)) {
            try {
                conta = AlunoDAO.login(login, senha);
            } catch (SQLException ex) {
                Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        request.setAttribute("erros", erros);
        request.setAttribute("login", login);

        if (conta != null) {
            request.getSession().setAttribute("id", conta.getId());
            request.getSession().setAttribute("nome", conta.getNome());
            request.getSession().setAttribute("login", conta.getLogin());
            request.getSession().setAttribute("periodo", conta.getPeriodo());
            request.getSession().setAttribute("telefone", conta.getTelefone());
            request.getSession().setAttribute("permissao", conta.getPermissao());
            request.getSession().setAttribute("materias", conta.getMaterias());
            request.getSession().setAttribute("email", conta.getEmail());
            request.getSession().setAttribute("matricula", conta.getMatricula());
            request.getSession().setMaxInactiveInterval(-1);
            response.sendRedirect("dashboard.jsp");
        } else {
            request.getRequestDispatcher("index.jsp").forward(request, response);
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
