package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import util.ConnectionFactory;
import model.Aluno;

public class AlunoDAO {

    public static String podeCadastrar(String nome, String telefone, String matricula, String periodo, String login, String senha, String email) throws SQLException {
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();
        String erros = "";

        // Verifica se o login já não está cadastrado.
        String sql = "SELECT * FROM TB_USUARIO WHERE USUARIO = ?";
        pstm = con.prepareStatement(sql);
        pstm.setString(1, login);
        rs = pstm.executeQuery();
        if (rs.next()) {
            erros = "Login já cadastrado! ";
        }

        // Verifica se o email já não está cadastrado.
        sql = "SELECT * FROM TB_USUARIO WHERE EMAIL = ?";
        pstm = con.prepareStatement(sql);
        pstm.setString(1, email);
        rs = pstm.executeQuery();
        if (rs.next()) {
            erros += "Email já cadastrado! ";
        }

        // Verifica se o email já não está cadastrado.
        sql = "SELECT * FROM TB_ALUNO WHERE MATRICULA = ?";
        pstm = con.prepareStatement(sql);
        pstm.setString(1, matricula);
        rs = pstm.executeQuery();
        if (rs.next()) {
            erros += "Matricula já cadastrada!";
        }

        // Fecha conexao con.close(); 
        con.close();

        return erros;
    }

    public AlunoDAO() {
    }

    public static Aluno cadastro(String nome, String telefone, String matricula, String periodo, String login, String senha, String email) throws SQLException {
        Aluno conta = null;
        PreparedStatement pstm;
        ResultSet rs;
        int result = 0;
        Connection con = ConnectionFactory.getConnection();

        //Insere na tabela aluno
        String sql = "INSERT INTO TB_ALUNO (NOME, PERIODO, MATRICULA, TELEFONE) VALUES (?, ?, ?, ?)";

        // Prepara o comando com o preparestat pstm =
        pstm = con.prepareStatement(sql);

        // Passa os parametros da consulta pra cada ? dentro da String sql
        pstm.setString(1, nome);
        pstm.setString(2, periodo);
        pstm.setString(3, matricula);
        pstm.setString(4, telefone);

        // Executa o comando retornando no result a quantidade de linhas afetadas int
        result = pstm.executeUpdate();

        sql = "SELECT * FROM TB_ALUNO WHERE NOME = ?";
        pstm = con.prepareStatement(sql);
        pstm.setString(1, nome);
        ResultSet idTabelaAluno = pstm.executeQuery();

        int idTabela = 0;
        if (idTabelaAluno.next()) {
            idTabela = idTabelaAluno.getInt("ID");
        }

        //Insere na tabela usuário
        sql = "INSERT INTO TB_USUARIO (ID_ALUNO, USUARIO, SENHA, EMAIL, PERMISSAO) VALUES (?,?, ?, ?, ?)";

        // Prepara o comando com o preparestat pstm =
        pstm = con.prepareStatement(sql);

        // Passa os parametros da consulta pra cada ? dentro da String sql
        pstm.setInt(1, idTabela);
        pstm.setString(2, login);
        pstm.setString(3, senha);
        pstm.setString(4, email);
        pstm.setInt(5, 0);

        // Executa o comando retornando no result a quantidade de linhas afetadas int
        result = pstm.executeUpdate();

        if (result == 1) {
            conta = new Aluno();
            conta.setNome(nome);
            conta.setId(idTabela);
            conta.setLogin(login);
            conta.setEmail(email);
        }

        // Fecha conexao con.close(); 
        con.close();

        return conta;
    }

    public static Aluno login(String login, String senha) throws SQLException {
        Aluno aluno = null;
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();

        /* Comando SQL que será enviado ao banco */
        String sql = "SELECT * FROM TB_USUARIO INNER JOIN TB_ALUNO ON (tb_aluno.ID = tb_usuario.ID_ALUNO) WHERE USUARIO = ? AND SENHA = ?";

        /* Prepara a consulta e passa os parametros */
        pstm = con.prepareStatement(sql);
        pstm.setString(1, login);
        pstm.setString(2, senha);

        /* Executa a query e armazena o resultado na variavel rs */
        rs = pstm.executeQuery();

        /* Instancia um novo aluno para dar de retorno da função */
        while (rs.next()) {
            aluno = new Aluno();
            aluno.setId(rs.getInt("ID_ALUNO"));
            aluno.setLogin(rs.getString("USUARIO"));
            aluno.setEmail(rs.getString("EMAIL"));
            aluno.setNome(rs.getString("NOME"));
            aluno.setTelefone(rs.getString("TELEFONE"));
            aluno.setPermissao(rs.getInt("PERMISSAO"));
            aluno.setPeriodo(rs.getInt("PERIODO"));
            aluno.setMaterias(rs.getString("MATERIAS_CADASTRADAS"));
        }

        /* Fecha a conexão */
        con.close();

        return aluno;
    }

    public static String verificaLoginSenha(String login, String senha) throws SQLException {
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();
        String erros = "";

        /* Comando SQL que será enviado ao banco */
        String sql = "SELECT * FROM TB_USUARIO WHERE USUARIO = ?";

        /* Prepara a consulta e passa os parametros */
        pstm = con.prepareStatement(sql);
        pstm.setString(1, login);

        /* Executa a query e armazena o resultado na variavel rs */
        rs = pstm.executeQuery();

        if (!rs.next()) {
            erros = "Usuário incorreto!";
        }

        if (erros.isEmpty()) {
            /* Comando SQL que será enviado ao banco */
            sql = "SELECT * FROM TB_USUARIO WHERE USUARIO = ? AND SENHA = ?";

            /* Prepara a consulta e passa os parametros */
            pstm = con.prepareStatement(sql);
            pstm.setString(1, login);
            pstm.setString(2, senha);

            /* Executa a query e armazena o resultado na variavel rs */
            rs = pstm.executeQuery();

            /* Instancia um novo aluno para dar de retorno da função */
            if (!rs.next()) {
                erros = "Senha incorreta!";
            }
        }

        /* Fecha a conexão */
        con.close();

        return erros;
    }

    public static void main(String[] args) throws SQLException {
        /*int rs = cadastro("Administrador", "(034) 99894-8551", "01858618657-1", "2", "admin", "admin", "gabriel_guilherme2006@hotmail.com");
        System.out.println("Foram alterados: " + rs + " registros");*/

        Aluno a = login("gabrielgrs", "Gabriel@10");
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
