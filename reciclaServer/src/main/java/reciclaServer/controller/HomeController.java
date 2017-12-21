package reciclaServer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity getHome(){
        return new ResponseEntity("Hello World", HttpStatus.OK);
    }
}
