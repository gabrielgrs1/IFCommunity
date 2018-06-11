package dao;

import criptografia.Cript;
import criptografia.Desencrip;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import util.ConnectionFactory;
import model.Aluno;
import model.IndicesUsuario;
import regex.Regex;

public class AlunoDAO {

    public AlunoDAO() {
    }

    public static ArrayList<String> recuperaPerfil(int id) throws SQLException {
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();
        ArrayList<String> aluno = new ArrayList<>();

        String sql = "SELECT * FROM TB_USUARIO"
                + " INNER JOIN TB_ALUNO ON (tb_aluno.ID = tb_usuario.ID_ALUNO) WHERE ID_ALUNO = ?";

        pstm = con.prepareStatement(sql);
        pstm.setInt(1, id);
        rs = pstm.executeQuery();

        while (rs.next()) {
            aluno.add(rs.getString("NOME"));
            aluno.add(rs.getString("TELEFONE"));
            aluno.add(rs.getString("EMAIL"));
            aluno.add(rs.getString("MATRICULA"));
        }

        con.close();

        return aluno;
    }

    public static ArrayList<String> atualizaPerfil(String id, String nome, String telefone, String email) throws SQLException {
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();
        ArrayList<String> aluno = new ArrayList<>();

        String sql = "UPDATE TB_ALUNO AS TB_A"
                + " INNER JOIN TB_USUARIO AS TB_U ON (TB_A.ID = TB_U.ID_ALUNO)"
                + " SET TB_A.NOME = ?,"
                + " TB_A.TELEFONE = ?,"
                + " TB_U.EMAIL = ?"
                + " WHERE TB_A.ID = ?";

        pstm = con.prepareStatement(sql);
        pstm.setString(1, nome);
        pstm.setString(2, telefone);
        pstm.setString(3, email);
        pstm.setString(4, id);

        pstm.executeUpdate();

        /* Consulta o novo Aluno */
        sql = "SELECT * FROM TB_USUARIO"
                + " INNER JOIN TB_ALUNO ON (tb_aluno.ID = tb_usuario.ID_ALUNO) WHERE ID_ALUNO = ?";

        pstm = con.prepareStatement(sql);
        pstm.setString(1, id);
        rs = pstm.executeQuery();

        while (rs.next()) {
            aluno.add(rs.getString("NOME"));
            aluno.add(rs.getString("TELEFONE"));
            aluno.add(rs.getString("EMAIL"));
        }

        con.close();

        return aluno;
    }

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

        // Verifica erros de regex na senha.
        Regex regex = new Regex();
        regex.setSenha(senha);
        erros += regex.getErrosSenha();

        // Fecha conexao con.close(); 
        con.close();

        return erros;
    }

    public static Aluno cadastro(String nome, String telefone, String matricula, String periodo, String login, String senha, String email) throws SQLException {
        Aluno conta = null;
        PreparedStatement pstm;
        ResultSet rs = null;
        int result = 0;
        Connection con = ConnectionFactory.getConnection();

        //Insere na tabela aluno
        String sql = "INSERT INTO TB_ALUNO (NOME, PERIODO, MATRICULA, TELEFONE, MATERIAS_CADASTRADAS) VALUES (?, ?, ?, ?, ?)";

        // Prepara o comando com o preparestat pstm =
        pstm = con.prepareStatement(sql);

        // Passa os parametros da consulta pra cada ? dentro da String sql
        pstm.setString(1, nome);
        pstm.setString(2, periodo);
        pstm.setString(3, matricula);
        pstm.setString(4, telefone);
        pstm.setString(5, "0");

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
        // Tratamento da senha para criptografia
        Cript cript = new Cript(senha);
        senha = cript.montaEncrip();
        pstm.setString(3, senha);
        pstm.setString(4, email);
        pstm.setInt(5, 0);

        // Executa o comando retornando no result a quantidade de linhas afetadas int
        result = pstm.executeUpdate();

        if (result == 1) {
            /* Comando SQL que será enviado ao banco */
            sql = "SELECT * FROM TB_USUARIO"
                    + " INNER JOIN TB_ALUNO ON (tb_aluno.ID = tb_usuario.ID_ALUNO) WHERE USUARIO = ? AND SENHA = ?";

            /* Prepara a consulta e passa os parametros */
            pstm = con.prepareStatement(sql);
            pstm.setString(1, login);
            pstm.setString(2, senha);

            /* Executa a query e armazena o resultado na variavel rs */
            rs = pstm.executeQuery();

            /* Instancia um novo aluno para dar de retorno da função */
            while (rs.next()) {
                conta = new Aluno();
                conta.setId(rs.getInt("ID_ALUNO"));
                conta.setLogin(rs.getString("USUARIO"));
                conta.setEmail(rs.getString("EMAIL"));
                conta.setNome(rs.getString("NOME"));
                conta.setTelefone(rs.getString("TELEFONE"));
                conta.setPermissao(rs.getInt("PERMISSAO"));
                conta.setPeriodo(rs.getInt("PERIODO"));
                conta.setMaterias(rs.getString("MATERIAS_CADASTRADAS"));
                conta.setMatricula(rs.getString("MATRICULA"));
            }
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
        String sql = "SELECT * FROM TB_USUARIO"
                + " INNER JOIN TB_ALUNO ON (tb_aluno.ID = tb_usuario.ID_ALUNO) WHERE USUARIO = ? AND SENHA = ?";

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
            aluno.setMatricula(rs.getString("MATRICULA"));
        }

        /* Fecha a conexão */
        con.close();

        return aluno;
    }

    public static ArrayList<String> recuperaMateria(int id) throws SQLException {
        String materiasId[] = new String[6];
        ArrayList<String> materias = new ArrayList<>();
        String materiasString = "";
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();

        /* Comando SQL que será enviado ao banco */
        String sql = "SELECT * FROM TB_USUARIO"
                + " INNER JOIN TB_ALUNO ON (tb_aluno.ID = tb_usuario.ID_ALUNO) WHERE ID_ALUNO = ?";

        /* Prepara a consulta e passa os parametros */
        pstm = con.prepareStatement(sql);
        pstm.setInt(1, id);

        /* Executa a query e armazena o resultado na variavel rs */
        rs = pstm.executeQuery();

        /* Instancia um novo aluno para dar de retorno da função */
        while (rs.next()) {
            materiasString = rs.getString("MATERIAS_CADASTRADAS");
        }

        materiasId = materiasString.split(",");

        for (int i = 0; i < materiasId.length; i++) {
            /* Comando SQL que será enviado ao banco */
            sql = "SELECT * FROM TB_MATERIA WHERE ID = ?";

            /* Prepara a consulta e passa os parametros */
            pstm = con.prepareStatement(sql);
            pstm.setInt(1, Integer.parseInt(materiasId[i]));

            /* Executa a query e armazena o resultado na variavel rs */
            rs = pstm.executeQuery();

            /* Instancia um novo aluno para dar de retorno da função */
            while (rs.next()) {
                materias.add(rs.getString("NOME_MATERIA"));
            }
        }

        /* Fecha a conexão */
        con.close();

        return materias;
    }

    public static String verificaLoginSenha(String login, String senha) throws SQLException {
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();
        String erros = "";
        String Senha = "";

        /* Comando SQL que será enviado ao banco */
        String sql = "SELECT * FROM TB_USUARIO WHERE USUARIO = ?";

        /* Prepara a consulta e passa os parametros */
        pstm = con.prepareStatement(sql);
        pstm.setString(1, login);

        /* Executa a query e armazena o resultado na variavel rs */
        rs = pstm.executeQuery();
        if (!rs.next()) {
            erros = "Usuário incorreto!";
            String concat = erros + "®" + " ";
            con.close();
            return concat;
        }

        if (erros.isEmpty()) {
            // Descriptografa a senha do banco e compara com a passada na tela.
            String columnValue = rs.getString("SENHA");
            Desencrip desencrip = new Desencrip(columnValue);
            String SenhaDoBanco = desencrip.desencript();

            if (!senha.equals(SenhaDoBanco)) {
                erros = "Senha incorreta!";
            }
        }

        Senha = rs.getString("SENHA");
        String concat = erros + "®" + Senha;
        /* Fecha a conexão */
        con.close();

        return concat;
    }

    public static ArrayList<IndicesUsuario> recuperaIndices(int id) throws SQLException {
        ArrayList<IndicesUsuario> indices = new ArrayList<>();
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();

        String sql = "SELECT tb_postagem.linguagem_postagem, tb_materia.NOME_MATERIA as nomeMateria, "
                + "COUNT(linguagem_postagem) as count FROM TB_POSTAGEM"
                + " INNER JOIN TB_MATERIA ON (tb_postagem.ID_MATERIA = tb_materia.ID)"
                + " WHERE ID_ALUNO = ? "
                + "GROUP BY tb_postagem.LINGUAGEM_POSTAGEM, tb_materia.NOME_MATERIA"; 

        pstm = con.prepareStatement(sql);
        pstm.setInt(1, id);
        rs = pstm.executeQuery();

// IMPRIMIR TUDO QUE A QUERY TROUXE
//        ResultSetMetaData rsmd = rs.getMetaData();
//        int columnsNumber = rsmd.getColumnCount();
//        while (rs.next()) {
//            for (int i = 1; i <= columnsNumber; i++) {
//                if (i > 1) {
//                    System.out.print(",  ");
//                }
//                String columnValue = rs.getString(i);
//                System.out.print(columnValue + " " + rsmd.getColumnName(i));
//            }
//            System.out.println("");
//        }

        while (rs.next()) {
            IndicesUsuario indicesUsuario = new IndicesUsuario();
            String concatLingCount =rs.getString("linguagem_postagem") + "," + rs.getString("count");
            indicesUsuario.setPostouQualLinguagem(concatLingCount);
            indicesUsuario.setPostouQualMateria(rs.getString("nomeMateria"));
            indices.add(indicesUsuario);
        }

        if (!rs.next() && indices.isEmpty()) {
            IndicesUsuario indicesUsuario = new IndicesUsuario();
            indicesUsuario.setPostouQualLinguagem("none");
            indices.add(indicesUsuario);
        }

        con.close();

        return indices;
    }

    public static void main(String[] args) throws SQLException {
        /*
        ArrayList<String> aluno = atualizaPerfil(1, "Gabriel Guilher Rodrigues Silva", "034998948551", "gabriel_guilherme2006@hotmail.com");
        System.out.println(aluno.get(0));
         */
 /*
            ArrayList<String> aluno = recuperaDadosAlunoPerfil(1);
            System.out.println(aluno.get(3));
         */
 /*
            int rs = cadastro("Administrador", "(034) 99894-8551", "01858618657-1", "2", "admin", "admin", "gabriel_guilherme2006@hotmail.com");
            System.out.println("Foram alterados: " + rs + " registros");
         */
 /*
            Aluno a = login("gabrielgrs", "Gabriel@10");
            if (a.getLogin() != null) {
                System.out.println("Aluno " + a.getLogin() + " logado com sucesso!");
            } else {
                System.out.println("Erro ao realizar login!");
            }
         */
 /*
            try { 
                Aluno a = alunodao.getAlunoByMatricula("01858618657-1");
                System.out.println(a.getNome()); 
            } catch (SQLException e) {
                System.out.println("Erro ao buscar aluno"); 
            }
        
         */
    }
}
