package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.ItemType;
import reciclaServer.models.LabelAnnotations;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.exceptions.ItemTypeNotFoundException;
import reciclaServer.models.exceptions.StorageNotFoundException;
import reciclaServer.models.exceptions.UserNotFoundException;
import reciclaServer.services.RecycleItemService;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*")
public class RecycleItemController {


    private RecycleItemService recycleItemService;

    @Autowired
    public RecycleItemController(RecycleItemService recycleItemService){
        this.recycleItemService = recycleItemService;
    }

    @RequestMapping(value = "/recycleItems", method = RequestMethod.POST)
    public ResponseEntity<?> createRecycleItem(HttpServletRequest request, @RequestBody RecycleItem recycleItem){

        long userId = (long)request.getAttribute("userId");

        if(userId == recycleItem.getRecycleUser().getId()){

            try {
                recycleItemService.saveRecycleItem(recycleItem);
            } catch (UserNotFoundException | StorageNotFoundException | ItemTypeNotFoundException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(recycleItem, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
