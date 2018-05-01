package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.exceptions.ItemTypeNotFoundException;
import reciclaServer.models.exceptions.StorageNotFoundException;
import reciclaServer.models.exceptions.UserNotFoundException;
import reciclaServer.services.RecycleItemService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminRecycleItemController {

    @Autowired
    private RecycleItemService recycleItemService;

    private HttpHeaders headers;

    @Autowired
    public AdminRecycleItemController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/recycleItems", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<RecycleItem> recycleItems = recycleItemService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(recycleItems.getTotalElements()));
        return new ResponseEntity<>(recycleItems.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/recycleItems/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        RecycleItem recycleItem = recycleItemService.findById(Long.parseLong(id));

        return new ResponseEntity<>(recycleItem, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/recycleItems", method = RequestMethod.POST)
    public ResponseEntity<?> createRecycleItem(@RequestBody RecycleItem recycleItem) throws NoSuchAlgorithmException, UserNotFoundException, StorageNotFoundException, ItemTypeNotFoundException {

        recycleItemService.saveRecycleItem(recycleItem);
        return new ResponseEntity<>(recycleItem, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/recycleItems/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateRecycleItem(@RequestBody RecycleItem recycleItem, @PathVariable("id") String id) throws NoSuchAlgorithmException, UserNotFoundException, StorageNotFoundException, ItemTypeNotFoundException {
        RecycleItem recycleItemFound = recycleItemService.findById(Long.parseLong(id));

        if(recycleItemFound != null){
            recycleItemService.saveRecycleItem(recycleItem);
        }

        return new ResponseEntity<>(recycleItem, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/recycleItems/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteRecycleItem(@PathVariable("id") String id) {
        RecycleItem recycleItemFound = recycleItemService.findById(Long.parseLong(id));

        if(recycleItemFound != null){
            recycleItemService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
