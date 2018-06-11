package model;
// classe principal
public class Comentario {
    
    private int id;
    private int idPostagem;
    private int idAluno;
    private String comentario;
    private String dataRegistro;

    public Comentario() {
    }

// Getters
    public int getId() {
        return id;
    }

    public int getIdPostagem() {
        return idPostagem;
    }

    public int getIdAluno() {
        return idAluno;
    }

    public String getComentario() {
        return comentario;
    }

    public String getDataRegistro() {
        return dataRegistro;
    }
    
// Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setIdPostagem(int idPostagem) {
        this.idPostagem = idPostagem;
    }

    public void setIdAluno(int idAluno) {
        this.idAluno = idAluno;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public void setDataRegistro(String dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

}
