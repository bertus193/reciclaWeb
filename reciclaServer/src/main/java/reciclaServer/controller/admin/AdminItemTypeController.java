package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.ItemType;
import reciclaServer.models.Position;
import reciclaServer.services.ItemTypeService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminItemTypeController {

    @Autowired
    private ItemTypeService itemTypeService;

    private HttpHeaders headers;

    @Autowired
    public AdminItemTypeController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/itemTypes", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<ItemType> itemTypes = itemTypeService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(itemTypes.getTotalElements()));
        return new ResponseEntity<>(itemTypes.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/itemTypes/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        ItemType itemType = itemTypeService.findById(Long.parseLong(id));

        return new ResponseEntity<>(itemType, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/itemTypes", method = RequestMethod.POST)
    public ResponseEntity<?> createPosition(@RequestBody ItemType itemType) throws NoSuchAlgorithmException {

        itemTypeService.saveItemType(itemType);
        return new ResponseEntity<>(itemType, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/itemTypes/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePosition(@RequestBody Position position, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        ItemType itemTypeFound = itemTypeService.findById(Long.parseLong(id));

        if(itemTypeFound != null){
            itemTypeService.saveItemType(itemTypeFound);
        }

        return new ResponseEntity<>(position, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/itemTypes/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePosition(@PathVariable("id") String id) {
        ItemType itemTypeFound = itemTypeService.findById(Long.parseLong(id));

        if(itemTypeFound != null){
            itemTypeService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
