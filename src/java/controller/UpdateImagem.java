/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

/**
 *
 * @author mmara_000
 */
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.log4j.Logger;

@WebServlet(name = "UpdateImagem", urlPatterns = {"/UpdateImagem"})
@MultipartConfig
public class UpdateImagem extends HttpServlet {

    private static Logger logger = Logger.getLogger(UpdateImagem.class);

    public UpdateImagem() {
        super();
        // System.out.println("Entrou");
    }

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        // System.out.println("Entrou doGet");
        for (Part part : request.getParts()) {
            // System.out.println(part.getName());
            InputStream is = request.getPart(part.getName()).getInputStream();
            int i = is.available();
            byte[] b = new byte[i];
            is.read(b);
            // System.out.println("Length : " + b.length);
            String fileName = getFileName(part).toLowerCase();
//            System.out.println("File name : " + fileName);
            String dirName = request.getServletContext().getRealPath("/img/");
//            System.out.println(dirName);
           
            // Decide se o formato é válido no back-end e envia para o banco, caso contrário não.
            if (typeImgAccepted(fileName)) {
                // Deleta qualquer imagem do usuário que já exista no banco.
                delIfExists(dirName, fileName);

                FileOutputStream os = new FileOutputStream(dirName + fileName);
                os.write(b);
                is.close();
            }

        }

    }

    private boolean typeImgAccepted(String fileName) {
        String fileNameType[] = fileName.split("\\.(?=[^\\.]+$)");
        String arrayTypes[] = {"jpg", "jpeg", "bmp", "png"};
       
        for (String arrayType : arrayTypes) {
            if (arrayType.equalsIgnoreCase(fileNameType[1])) {
                return true;
            }
        }
        return false;
    }

    private void delIfExists(String dirName, String fileName) {
        String fileNameToDel[] = fileName.split("\\.(?=[^\\.]+$)");

        File folder = new File(dirName);
        File[] listOfFiles = folder.listFiles();

        for (File listOfFile : listOfFiles) {
            if (listOfFile.isFile()) {
                String[] filename1 = listOfFile.getName().split("\\.(?=[^\\.]+$)");
                if (filename1[0].equalsIgnoreCase(fileNameToDel[0])) {
                    if (listOfFile.exists()) {
                        //System.out.println("Existe " + listOfFile);
                        listOfFile.delete();
                    } else {
                        //System.err.println("I cannot find '" + listOfFile + "' ('" + listOfFile.getAbsolutePath() + "')");
                    }
                }
            }
        }
    }

    private String getFileName(Part part) {
        // System.out.println("Entrou getFileName");
        String partHeader = part.getHeader("content-disposition");
        // System.out.println("Part Header = " + partHeader);
        for (String cd : part.getHeader("content-disposition").split(";")) {
            if (cd.trim().startsWith("filename")) {
                return cd.substring(cd.indexOf('=') + 1).trim()
                        .replace("\"", "");
            }
        }
        return null;
    }

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

}
