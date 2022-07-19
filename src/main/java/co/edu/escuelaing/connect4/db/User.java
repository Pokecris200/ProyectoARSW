/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.escuelaing.connect4.db;

import org.springframework.data.annotation.Id;

/**
 *
 * @author cristian.forero-m
 */
public class User {
    
    @Id
    public String username;
    
    public String password;
    
    public User(){}
    
    public User(String user,String pwd){
        this.username = user;
        this.password = pwd;
    }
    
    @Override
    public String toString() {
        return String.format(
                "User[username=%s, password='%s']",
                username, password);
    }
}
