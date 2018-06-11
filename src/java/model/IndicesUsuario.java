package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author mmara_000
 */
public class IndicesUsuario {

    private int postouQuantos;
    private int quantosLikes;
    private int quantosDeslikes;
    private String postouQualLinguagem;
    private String postouQualMateria;
    private int reputacao;

    public String getPostouQualLinguagem() {
        return postouQualLinguagem;
    }

    public void setPostouQualLinguagem(String postouQualLinguagem) {
        this.postouQualLinguagem = postouQualLinguagem;
    }

    public String getPostouQualMateria() {
        return postouQualMateria;
    }

    public void setPostouQualMateria(String postouQualMateria) {
        this.postouQualMateria = postouQualMateria;
    }

    public int getPostouQuantos() {
        return postouQuantos;
    }

    public void setPostouQuantos(int postouQuantos) {
        this.postouQuantos = postouQuantos;
    }

    public int getQuantosLikes() {
        return quantosLikes;
    }

    public void setQuantosLikes(int quantosLikes) {
        this.quantosLikes = quantosLikes;
    }

    public int getReputacao() {
        return reputacao;
    }

    public void setReputacao(int reputacao) {
        this.reputacao = reputacao;
    }

    public int getQuantosDeslikes() {
        return quantosDeslikes;
    }

    public void setQuantosDeslikes(int quantosDeslikes) {
        this.quantosDeslikes = quantosDeslikes;
    }

}
