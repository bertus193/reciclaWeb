package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.ItemTypeName;
import reciclaServer.models.ItemTypeName;
import reciclaServer.services.ItemTypeNameService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminItemTypeNameController {

    @Autowired
    private ItemTypeNameService itemTypeNameService;

    private HttpHeaders headers;

    @Autowired
    public AdminItemTypeNameController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/itemTypeNames", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<ItemTypeName> itemTypeNames = itemTypeNameService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(itemTypeNames.getTotalElements()));
        return new ResponseEntity<>(itemTypeNames.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/itemTypeNames/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        ItemTypeName itemTypeName = itemTypeNameService.findById(Long.parseLong(id));

        return new ResponseEntity<>(itemTypeName, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/itemTypeNames", method = RequestMethod.POST)
    public ResponseEntity<?> createItemTypeName(@RequestBody ItemTypeName itemTypeName) throws NoSuchAlgorithmException {

        itemTypeNameService.saveItemTypeName(itemTypeName);
        return new ResponseEntity<>(itemTypeName, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/itemTypeNames/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateItemTypeName(@RequestBody ItemTypeName itemTypeName, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        ItemTypeName itemTypeNameFound = itemTypeNameService.findById(Long.parseLong(id));

        if(itemTypeNameFound != null){
            itemTypeNameService.saveItemTypeName(itemTypeName);
        }

        return new ResponseEntity<>(itemTypeName, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/itemTypeNames/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteItemTypeName(@PathVariable("id") String id) {
        ItemTypeName itemTypeNameFound = itemTypeNameService.findById(Long.parseLong(id));

        if(itemTypeNameFound != null){
            itemTypeNameService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
