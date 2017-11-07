package model;

public class Postagem {

    private int id;
    private int idMateria;
    private int idAluno;
    private String postagens;
    private int like;
    private int delikes;
    private String data;
// construtor
    public Postagem() {
    }
/* ou assim -_-'
    public Postagem(int id, int idMateria, int idAluno, String postagens, int like, int delikes, String data) {
        this.id = id;
        this.idMateria = idMateria;
        this.idAluno = idAluno;
        this.postagens = postagens;
        this.like = like;
        this.delikes = delikes;
        this.data = data;
    } */
// getters
    public int getId() {
        return id;
    }

    public int getIdMateria() {
        return idMateria;
    }

    public int getIdAluno() {
        return idAluno;
    }

    public String getPostagens() {
        return postagens;
    }

    public int getLike() {
        return like;
    }

    public int getDelikes() {
        return delikes;
    }

    public String getData() {
        return data;
    }
// setters
    public void setId(int id) {
        this.id = id;
    }

    public void setIdMateria(int idMateria) {
        this.idMateria = idMateria;
    }

    public void setIdAluno(int idAluno) {
        this.idAluno = idAluno;
    }

    public void setPostagens(String postagens) {
        this.postagens = postagens;
    }

    public void setLike(int like) {
        this.like = like;
    }

    public void setDelikes(int delikes) {
        this.delikes = delikes;
    }

    public void setData(String data) {
        this.data = data;
    }

}
