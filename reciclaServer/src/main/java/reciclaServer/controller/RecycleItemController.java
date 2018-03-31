package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public RecycleItemController(RecycleItemService recycleItemService) {
        this.recycleItemService = recycleItemService;
    }

    @RequestMapping(value = "/recycleItems/private", method = RequestMethod.POST)
    public ResponseEntity<?> createRecycleItem(HttpServletRequest request, @RequestBody RecycleItem recycleItem) {

        long userId = (long) request.getAttribute("userId");

        if (userId == recycleItem.getRecycleUser().getId()) {

            try {
                recycleItemService.saveRecycleItem(recycleItem);
            } catch (UserNotFoundException | StorageNotFoundException | ItemTypeNotFoundException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(recycleItem, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @RequestMapping(value = "/recycleItems/latest/", method = RequestMethod.GET)
    public ResponseEntity<?> getLatestRecycleItems(@RequestParam("page") int page, @RequestParam("perPage") int perPage) {

        try {
            Page<RecycleItem> recycleItems = recycleItemService.findLatest(page, perPage);

            if (recycleItems == null || recycleItems.getContent().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(recycleItems, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


    @RequestMapping(value = "/recycleItems/private/{id}/", method = RequestMethod.GET)
    public ResponseEntity<RecycleItem> updateUser(HttpServletRequest request, @PathVariable("id") long id) {

        long userId = (long) request.getAttribute("userId");

        RecycleItem recycleItem = recycleItemService.findById(id);

        if (recycleItem == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            if (userId == recycleItem.getRecycleUser().getId()) {
                return new ResponseEntity<>(recycleItem, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }
    }

}
