package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Storage;
import reciclaServer.models.Storage;
import reciclaServer.services.StorageService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminStorageController {

    @Autowired
    private StorageService storageService;

    private HttpHeaders headers;

    @Autowired
    public AdminStorageController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/storages", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<Storage> storages = storageService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(storages.getTotalElements()));
        return new ResponseEntity<>(storages.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/storages/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Storage storage = storageService.findById(Long.parseLong(id));

        return new ResponseEntity<>(storage, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/storages", method = RequestMethod.POST)
    public ResponseEntity<?> createStorage(@RequestBody Storage storage) throws NoSuchAlgorithmException {

        storageService.saveStorage(storage);
        return new ResponseEntity<>(storage, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/storages/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateStorage(@RequestBody Storage storage, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        Storage storageFound = storageService.findById(Long.parseLong(id));

        if(storageFound != null){
            storageService.saveStorage(storage);
        }

        return new ResponseEntity<>(storage, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/storages/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteStorage(@PathVariable("id") String id) {
        Storage storageFound = storageService.findById(Long.parseLong(id));

        if(storageFound != null){
            storageService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
