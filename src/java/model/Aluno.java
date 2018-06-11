package model;

public class Aluno {

    private int id;
    private String nome;
    private String login;
    private String email;
    private int periodo;
    private int permissao;
    private String telefone;
    private String materias;
    private String matricula;
    private String foto;

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    // Construtor
    public Aluno() {
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getLogin() {
        return login;
    }

    public String getEmail() {
        return email;
    }

    public int getPeriodo() {
        return periodo;
    }

    public int getPermissao() {
        return permissao;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getMaterias() {
        return materias;
    }

    public String getMatricula() {
        return matricula;
    }
    
    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPeriodo(int periodo) {
        this.periodo = periodo;
    }

    public void setMaterias(String materias) {
        this.materias = materias;
    }

    public void setPermissao(int permissao) {
        this.permissao = permissao;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
}
