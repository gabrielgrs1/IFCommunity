package model;
// classe principal
public class Materia {
    
    private int id;
    private String nomeMateria;
// construtor
    public Materia() {
    }    
/* ou assim -_-'
    public Materia(int id, String nomeMateria) {
        this.id = id;
        this.nomeMateria = nomeMateria;
    } */
// getters
    public int getId() {
        return id;
    }

    public String getNomeMateria() {
        return nomeMateria;
    }
// setters
    public void setId(int id) {
        this.id = id;
    }

    public void setNomeMateria(String nomeMateria) {
        this.nomeMateria = nomeMateria;
    }
    
}
