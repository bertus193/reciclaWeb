package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.StoragePoint;
import reciclaServer.models.User;
import reciclaServer.services.RecycleItemService;
import reciclaServer.services.StoragePointService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StoragePointController {

    private StoragePointService storagePointService;

    @Autowired
    public StoragePointController(StoragePointService storagePointService){
        this.storagePointService = storagePointService;
    }
}
