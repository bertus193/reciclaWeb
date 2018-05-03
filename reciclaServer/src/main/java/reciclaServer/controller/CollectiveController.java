package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.ItemType;
import reciclaServer.models.Storage;
import reciclaServer.models.StoragePoint;
import reciclaServer.services.CollectiveService;
import reciclaServer.services.StorageService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CollectiveController {

    private CollectiveService collectiveService;

    @Autowired
    public CollectiveController(CollectiveService collectiveService) {
        this.collectiveService = collectiveService;
    }


    @RequestMapping(value = "/collectives", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCollectives() {
        return new ResponseEntity<>(this.collectiveService.getAllCollectives(), HttpStatus.OK);
    }


}