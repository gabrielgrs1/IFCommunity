/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package regex;

import java.util.regex.Pattern;

/**
 *
 * @author mmara_000
 */
public class Regex {

    private String errosSenha = "";
    private String senha;

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getErrosSenha() {
        System.out.println(senha + " regex");
        char[] Senha = senha.toCharArray();

        // Verifica se a senha tem no máximo 25 caracteres.
        if (Senha.length > 25) {
            errosSenha += "Tentativa de cadastro de senha que excede o tamanho máximo!";
        }

        // Verifica se a senha tem no máximo 25 caracteres.
        Pattern pattAlphaNum = Pattern.compile("^[a-zA-Z0-9$@$!%*?&+-]+$");
        if (!pattAlphaNum.matcher(senha).matches()) {
            errosSenha += "Tentativa de cadastro de senha inválida!";
        }

        return errosSenha;
    }

}
