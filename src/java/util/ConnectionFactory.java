package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

//implementa o design pattern Factory

public class ConnectionFactory {

    public static Connection getConnection() {
    System.out.println("Conectando ao banco");
    try {
            DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            return DriverManager.getConnection("jdbc:mysql://localhost/integrador2", "root", "");
            } catch(SQLException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            
        }
        
    }

    public static void main(String[] args) {
        ConnectionFactory.getConnection();
        System.out.println("CONEXÃO OK!");
    }
}
