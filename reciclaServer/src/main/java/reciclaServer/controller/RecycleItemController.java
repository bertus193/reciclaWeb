package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.exceptions.ItemTypeNotFoundException;
import reciclaServer.models.exceptions.StorageNotFoundException;
import reciclaServer.models.exceptions.UserNotFoundException;
import reciclaServer.services.RecycleItemService;

@RestController
@CrossOrigin(origins = "*")
public class RecycleItemController {


    private RecycleItemService recycleItemService;

    @Autowired
    public RecycleItemController(RecycleItemService recycleItemService){
        this.recycleItemService = recycleItemService;
    }

    @RequestMapping(value = "/recycleItem", method = RequestMethod.POST)
    public ResponseEntity<?> createRecycleItem(@RequestBody RecycleItem recycleItem){
        System.out.println("Creating RecycleItem " + recycleItem.getName());

        try {
            recycleItemService.saveRecycleItem(recycleItem);
        } catch (UserNotFoundException | StorageNotFoundException | ItemTypeNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(recycleItem, HttpStatus.CREATED);
    }

}
