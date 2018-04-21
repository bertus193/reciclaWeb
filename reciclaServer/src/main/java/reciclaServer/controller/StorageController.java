package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.ItemType;
import reciclaServer.models.Storage;
import reciclaServer.models.StoragePoint;
import reciclaServer.services.ItemTypeService;
import reciclaServer.services.StorageService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StorageController {

    private StorageService storageService;
    private ItemTypeService itemTypeService;

    @Autowired
    public StorageController(StorageService storageService,
                             ItemTypeService itemTypeService) {
        this.storageService = storageService;
        this.itemTypeService = itemTypeService;
    }


    @RequestMapping(value = "/storages/itemType/{itemType}/storagePoints", method = RequestMethod.GET)
    public ResponseEntity<?> getStoragePointsByItemType(@PathVariable("itemType") long itemTypeId) {

        ItemType itemType = itemTypeService.getItemTypeById(itemTypeId);
        List<StoragePoint> storagePoints = new ArrayList();

        if (itemType != null) {
            List<Storage> storageList = storageService.getStoragesByItemType(itemType);
            for (int i = 0; i < storageList.size(); i++) {
                storagePoints.add(storageList.get(i).getStoragePoint());
            }
            if (storageList != null) {
                return new ResponseEntity<>(storagePoints, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}