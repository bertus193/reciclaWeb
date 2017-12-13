package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.User;
import reciclaServer.models.UserDAO;
import reciclaServer.services.UserService;

import java.util.List;

@RestController
public class HomeController {


    private UserService userService;

    @Autowired
    public HomeController(UserService userService){
        this.userService = userService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<?> getHome(){

        String out = "ReciclaWeb BackEnd<br>";

        List<User> users = userService.findAll();

        if(!users.isEmpty()) {
            out += "Users: " + users;
        }

        out += "<br>";

        User user = userService.findByEmailAddress("correo@correo");

        out += "User: " + user.getEmail();


        return new ResponseEntity(out, HttpStatus.OK);
    }
}
