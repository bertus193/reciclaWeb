package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.ItemType;
import reciclaServer.services.ItemTypeService;


@RestController
@CrossOrigin(origins = "*")
public class ItemTypeController {


    private ItemTypeService itemTypeService;

    @Autowired
    public ItemTypeController(
            ItemTypeService itemTypeService) {
        this.itemTypeService = itemTypeService;
    }

    @RequestMapping(value = "/itemType/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getItemTypeById(@PathVariable("id") long id) {

        ItemType itemType = this.itemTypeService.getItemTypeById(id);
        if (itemType != null) {
            return new ResponseEntity<>(itemType, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
