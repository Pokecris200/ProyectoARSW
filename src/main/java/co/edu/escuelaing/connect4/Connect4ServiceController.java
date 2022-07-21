/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.escuelaing.connect4;

import co.edu.escuelaing.connect4.db.User;
import co.edu.escuelaing.connect4.db.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author cristian.forero-m
 */
@RestController
public class Connect4ServiceController {
    
    @Autowired
    private UserRepository repository;
    
    @GetMapping("/status")
    public String status() {
        return "{\"status\":\"Greetings from Spring Boot. " +
            java.time.LocalDate.now() + ", " +
            java.time.LocalTime.now() +
            ". " + "The server is Runnig!\"}";
    }
    
    @GetMapping("/register")
    public String register(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password){
        repository.save(new User(username,password));
        return "Gracias por registrarte vuelve a ingresar";
    }
    
}
