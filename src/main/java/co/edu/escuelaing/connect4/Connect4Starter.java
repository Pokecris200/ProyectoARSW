/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.escuelaing.connect4;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import co.edu.escuelaing.connect4.db.*;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;


/**
 *
 * @author cristian.forero-m
 */
@SpringBootApplication
public class Connect4Starter {
    
    @Autowired
    private UserRepository repository;
    
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Connect4Starter.class);
        Map<String,Object> properties = new HashMap<>();
        properties.put("spring.data.mongodb.uri", "mongodb+srv://pokecris200:Sept2022.@cluster0.1bffmnu.mongodb.net/Usernames?retryWrites=true&w=majority");
        properties.put("server.port", getPort());
        app.setDefaultProperties(properties);
        app.run(args);
    }
    
    static int getPort() {
        
        if (System.getenv("PORT") != null) {
            return Integer.parseInt(System.getenv("PORT"));
        }
        return 8080; 
    }
    
    @GetMapping("/register")
    public String register(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password){
        repository.save(new User(username,password));
        return "Gracias por registrarte vuelve a ingresar";
    }
    
    
    
    
}
