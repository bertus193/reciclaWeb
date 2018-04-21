package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import reciclaServer.services.StoragePointService;

@RestController
@CrossOrigin(origins = "*")
public class StoragePointController {

    private StoragePointService storagePointService;

    @Autowired
    public StoragePointController(StoragePointService storagePointService) {
        this.storagePointService = storagePointService;
    }
}
