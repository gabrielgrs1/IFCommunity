package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import util.ConnectionFactory;
import model.Aluno;

public class AlunoDAO {

    public AlunoDAO() {

    }

    /*
	 * public boolean incluir(Aluno aluno) { // Comando SQL enviado ao banco String
	 * sql =
	 * "insert into usuarios (nome, usuario, senha, email, periodo, matricula, dt_registro) values (?, ?, ?, ?, ?, ?, ?)"
	 * ; try { // Prepara o comando com o preparestat pstm =
	 * con.prepareStatement(sql);
	 * 
	 * // Passa os parametros da consulta pra cada ? dentro da String sql
	 * pstm.setString(1, aluno.getNome()); pstm.setString(2, aluno.getLogin());
	 * pstm.setString(3, aluno.getSenha()); pstm.setString(4, aluno.getEmail());
	 * pstm.setInt(5, aluno.getPeriodo()); pstm.setString(6, aluno.getMatricula());
	 * pstm.setString(7, formatoData.format(dataAtual));
	 * 
	 * // Executa o comando retornando no result a quantidade de linhas afetadas int
	 * result = pstm.executeUpdate();
	 * 
	 * // Fecha conexao con.close();
	 * 
	 * // Retorna true se afetar algum registro return result > 0; } catch
	 * (Exception e) { System.out.println("Erro ao incluir aluno " +
	 * e.getMessage()); return false; } }
	 * 
	 * public boolean deletar(String matricula) throws SQLException { try { String
	 * sql = "delete from usuarios where matricula = ?"; pstm =
	 * con.prepareStatement(sql); pstm.setString(1, matricula); int result =
	 * pstm.executeUpdate(); return result > 0; } catch (Exception e) {
	 * System.out.println("erro ao deletar " + e.getMessage()); }
	 * 
	 * con.close(); return false; }
	 * 
	 * public boolean alterarSenha(Aluno aluno, String senha) throws SQLException {
	 * String sql = "update usuarios set senha=? where matricula =? "; try { pstm =
	 * con.prepareStatement(sql);
	 * 
	 * pstm.setString(1, senha); pstm.setString(2, aluno.getMatricula());
	 * 
	 * int result = pstm.executeUpdate(); con.close(); return result > 0;
	 * 
	 * } catch (Exception e) {
	 * System.out.println("Erro ao alterar a senha do aluno " + e.getMessage());
	 * con.close(); return false; }
	 * 
	 * }
	 * 
	 * public Aluno getAlunoByMatricula(String matricula) throws SQLException {
	 * Aluno aluno = null; String sql =
	 * "select * from usuarios where matricula = ?";
	 * 
	 * pstm = con.prepareStatement(sql);
	 * 
	 * pstm.setString(1, matricula);
	 * 
	 * rs = pstm.executeQuery(); while (rs.next()) { aluno = new Aluno();
	 * aluno.setMatricula(rs.getString("matricula"));
	 * aluno.setNome(rs.getString("nome")); }
	 * 
	 * Conexao.closeConnection(); return aluno; }
     */
    public static Aluno login(String login, String senha) throws SQLException {
        Aluno aluno = null;
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();

        /* Comando SQL que será enviado ao banco */
        String sql = "select * from usuario where usuario = ? and senha = ?";

        /* Prepara a consulta e passa os parametros */
        pstm = con.prepareStatement(sql);
        pstm.setString(1, login);
        pstm.setString(2, senha);

        /* Executa a query e armazena o resultado na variavel rs */
        rs = pstm.executeQuery();

        /* Instancia um novo aluno para dar de retorno da função */
        while (rs.next()) {
            aluno = new Aluno();
            aluno.setId(rs.getInt("id_usuario"));
            aluno.setNome(rs.getString("nome"));
            aluno.setEmail(rs.getString("email"));
        }

        /* Fecha a conexão */
        con.close();

        return aluno;
    }

    public static void main(String[] args) throws SQLException {
        Aluno a = login("adm", "adm");
        if (a.getLogin() != null) {
            System.out.println("Aluno " + a.getLogin() + " logado com sucesso!");
        } else {
            System.out.println("Erro ao realizar login!");
        }
        /*
		 * try { Aluno a = alunodao.getAlunoByMatricula("01858618657-1");
		 * System.out.println(a.getNome()); } catch (SQLException e) {
		 * 
		 * System.out.println("Erro ao buscar aluno"); }
         */

    }
}
