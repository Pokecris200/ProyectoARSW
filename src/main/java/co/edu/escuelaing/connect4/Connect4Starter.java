/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.escuelaing.connect4;

import java.util.Collections;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 *
 * @author cristian.forero-m
 */
@SpringBootApplication
public class Connect4Starter {
    
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Connect4Starter.class);

        app.setDefaultProperties(Collections.singletonMap("server.port", getPort()));
        app.run(args);

    }
    
    static int getPort() {
        
        if (System.getenv("PORT") != null) {
            return Integer.parseInt(System.getenv("PORT"));
        }
        return 8080; 
    }
    
}
