/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.edu.escuelaing.connect4.db;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author cristian.forero-m
 */
public interface UserRepository extends MongoRepository<User, String>{
    public User findByUsername(String username);
}
