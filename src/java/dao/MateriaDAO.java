package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import util.ConnectionFactory;
import model.Postagem;

public class MateriaDAO {

    public MateriaDAO() {
    }

    public static ArrayList<Postagem> recuperaPostagens(String materia, String data) throws SQLException {
        ArrayList<Postagem> postagens = new ArrayList<>();
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();
        String sql;

        //Se ID for igual a nulo significa que não tem nenhuma matéria selecionada
        if (materia.equals("TODAS")) {
            if (data.equals("TODAS")) {
                /* Comando SQL que será enviado ao banco */
                sql = "SELECT * FROM TB_POSTAGEM"
                        + " INNER JOIN TB_ALUNO ON (TB_ALUNO.ID = TB_POSTAGEM.ID_ALUNO)"
                        + " INNER JOIN TB_MATERIA ON (TB_POSTAGEM.ID_MATERIA = TB_MATERIA.ID) LIMIT 10";

                /* Prepara a consulta e passa os parametros */
                pstm = con.prepareStatement(sql);
            } else {

                /* Comando SQL que será enviado ao banco */
                sql = "SELECT * FROM TB_POSTAGEM"
                        + " INNER JOIN TB_ALUNO ON (TB_ALUNO.ID = TB_POSTAGEM.ID_ALUNO)"
                        + " INNER JOIN TB_MATERIA ON (TB_POSTAGEM.ID_MATERIA = TB_MATERIA.ID)"
                        + " WHERE TB_POSTAGEM.DT_REGISTRO > ? LIMIT 10";

                /* Prepara a consulta e passa os parametros */
                pstm = con.prepareStatement(sql);
                pstm.setString(1, data);
            }
        } else {
            if (data.equals("TODAS")) {
                /* Comando SQL que será enviado ao banco */
                sql = "SELECT * FROM TB_POSTAGEM"
                        + " INNER JOIN TB_ALUNO ON (TB_ALUNO.ID = TB_POSTAGEM.ID_ALUNO)"
                        + " INNER JOIN TB_MATERIA ON (TB_POSTAGEM.ID_MATERIA = TB_MATERIA.ID)"
                        + " WHERE NOME_MATERIA = ? LIMIT 10";

                /* Prepara a consulta e passa os parametros */
                pstm = con.prepareStatement(sql);
                pstm.setString(1, materia);
            } else {
                /* Comando SQL que será enviado ao banco */
                sql = "SELECT * FROM TB_POSTAGEM"
                        + " INNER JOIN TB_ALUNO ON (TB_ALUNO.ID = TB_POSTAGEM.ID_ALUNO)"
                        + " INNER JOIN TB_MATERIA ON (TB_POSTAGEM.ID_MATERIA = TB_MATERIA.ID)"
                        + " WHERE NOME_MATERIA = ? AND TB_POSTAGEM.DT_REGISTRO > ? LIMIT 10";

                /* Prepara a consulta e passa os parametros */
                pstm = con.prepareStatement(sql);
                pstm.setString(1, materia);
                pstm.setString(2, data);
            }

        }

        /* Executa a query e armazena o resultado na variavel rs */
        rs = pstm.executeQuery();

        /* Instancia um novo aluno para dar de retorno da função */
        while (rs.next()) {
            Postagem post = new Postagem();
            post.setAutor(rs.getString("NOME"));
            post.setMateria(rs.getString("NOME_MATERIA"));
            post.setTitulo(rs.getString("TITULO"));
            post.setPostagens(rs.getString("POSTAGENS"));
            post.setData(rs.getString("TB_POSTAGEM.DT_REGISTRO"));
            postagens.add(post);
        }

        /* Fecha a conexão */
        con.close();

        return postagens;
    }

    public static ArrayList<String> recuperaMateria(int id) throws SQLException {
        String materiasId[] = new String[6];
        ArrayList<String> materias = new ArrayList<>();
        String materiasString = "";
        PreparedStatement pstm;
        ResultSet rs;
        Connection con = ConnectionFactory.getConnection();

        /* Comando SQL que será enviado ao banco */
        String sql = "SELECT * FROM TB_USUARIO INNER JOIN TB_ALUNO ON (tb_aluno.ID = tb_usuario.ID_ALUNO) WHERE ID_ALUNO = ?";

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

    public static void main(String[] args) throws SQLException {
        System.out.println(recuperaPostagens("TODAS", "2017-11-16 21:33:50").get(1).getAutor());
    }
}
