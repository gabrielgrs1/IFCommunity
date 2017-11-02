package model;

public class Aluno {

    private int id;
    private String nome;
    private String login;
    private String senha;
    private String email;
    private int periodo;
    private String matricula;
    private String dataRegistro;
    private int quantidadeDeContribuicao;

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

    public String getSenha() {
        return senha;
    }

    public String getEmail() {
        return email;
    }

    public int getPeriodo() {
        return periodo;
    }

    public String getMatricula() {
        return matricula;
    }

    public String getDataRegistro() {
        return dataRegistro;
    }

    public int getQuantidadeDeContribuicao() {
        return quantidadeDeContribuicao;
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

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPeriodo(int periodo) {
        this.periodo = periodo;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public void setDataRegistro(String dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public void setQuantidadeDeContribuicao(int quantidadeDeContribuicao) {
        this.quantidadeDeContribuicao = quantidadeDeContribuicao;
    }

}
