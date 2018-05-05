package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import reciclaServer.models.Tip;
import reciclaServer.services.TipService;

import java.security.SecureRandom;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TipController {

    private TipService tipService;

    @Autowired
    public TipController(TipService tipService) {
        this.tipService = tipService;
    }


    @RequestMapping(value = "/tips/random", method = RequestMethod.GET)
    public ResponseEntity<?> getRandomTip() {

        SecureRandom rand = new SecureRandom();

        List<Tip> tips = this.tipService.findAll();

        if (tips == null || tips.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else {
            Tip tip = tips.get(rand.nextInt(tips.size()));

            if (tip == null) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>(tip, HttpStatus.OK);
            }
        }
    }


}