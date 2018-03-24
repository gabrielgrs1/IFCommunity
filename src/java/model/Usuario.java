package model;
// classe principal

import Criptografia.Cript;
import Criptografia.Desencrip;

public class Usuario {

    private int id;
    private int idAluno;
    private String usuario;
    private String senha;
    private String email;
    private String dataRegistro;
    private int premissao;

    public Usuario() {
    }

// Getters
    public int getId() {
        return id;
    }

    public int getIdAluno() {
        return idAluno;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getSenha() {
        Desencrip desencrip = new Desencrip(senha);
        senha = desencrip.desencript();
        System.out.println(senha + " volta");
        return senha;
    }

    public String getEmail() {
        return email;
    }

    public String getDataRegistro() {
        return dataRegistro;
    }

    public int getPremissao() {
        return premissao;
    }

// Setters    
    public void setId(int id) {
        this.id = id;
    }

    public void setIdAluno(int idAluno) {
        this.idAluno = idAluno;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public void setSenha(String senha) {
        Cript crip = new Cript(senha);
        this.senha = crip.montaEncrip();
        System.out.println(senha + " ida");
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDataRegistro(String dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public void setPremissao(int premissao) {
        this.premissao = premissao;
    }

}
