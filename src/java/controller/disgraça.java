package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.AlunoDAO;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.Aluno;

@WebServlet(name = "Disgraca", urlPatterns = { "/Disgraca" })
public class disgraça extends HttpServlet {
	private static final long serialVersionUID = 1L;


	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		
	}

	public static void main(String[] args) {

		Aluno conta = null;
            try {
                conta = AlunoDAO.login("adm", "adm");
            } catch (SQLException ex) {
                Logger.getLogger(disgraça.class.getName()).log(Level.SEVERE, null, ex);
            }

		if (conta != null) {

			System.out.println("sucesso "+ conta.getLogin() );
		} else {
			System.out.println("erro");
		}
	}
	

}
