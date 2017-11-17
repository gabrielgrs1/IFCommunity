package model;

public class Postagem {

    private int id;
    private String materia;
    private String autor;
    private String titulo;
    private String postagens;
    private int like;
    private int deslikes;
    private String data;

    public Postagem() {
    }

// Getters
    public int getId() {
        return id;
    }

    public String getMateria() {
        return materia;
    }

    public String getAutor() {
        return autor;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public String getPostagens() {
        return postagens;
    }

    public int getLike() {
        return like;
    }

    public int getDeslikes() {
        return deslikes;
    }

    public String getData() {
        return data;
    }

// Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setPostagens(String postagens) {
        this.postagens = postagens;
    }

    public void setLike(int like) {
        this.like = like;
    }

    public void setDeslikes(int delikes) {
        this.deslikes = delikes;
    }

    public void setData(String data) {
        this.data = data;
    }

}
