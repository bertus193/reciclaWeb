package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Position;
import reciclaServer.models.StoragePoint;
import reciclaServer.models.StoragePoint;
import reciclaServer.services.PositionService;
import reciclaServer.services.StoragePointService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminStoragePointController {

    @Autowired
    private StoragePointService storagePointService;

    @Autowired
    private PositionService positionService;

    private HttpHeaders headers;

    @Autowired
    public AdminStoragePointController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/storagePoints", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<StoragePoint> storagePoints = storagePointService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(storagePoints.getTotalElements()));
        return new ResponseEntity<>(storagePoints.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/storagePoints/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        StoragePoint storagePoint = storagePointService.findById(Long.parseLong(id));

        return new ResponseEntity<>(storagePoint, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/storagePoints", method = RequestMethod.POST)
    public ResponseEntity<?> createStoragePoint(@RequestBody StoragePoint storagePoint) throws NoSuchAlgorithmException {

        storagePointService.saveStoragePoint(storagePoint);
        return new ResponseEntity<>(storagePoint, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/storagePoints/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateStoragePoint(@RequestBody StoragePoint storagePoint, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        StoragePoint storagePointFound = storagePointService.findById(Long.parseLong(id));

        if(storagePointFound != null){

            storagePointService.saveStoragePoint(storagePoint);
        }

        return new ResponseEntity<>(storagePoint, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/storagePoints/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteStoragePoint(@PathVariable("id") String id) {
        StoragePoint storagePointFound = storagePointService.findById(Long.parseLong(id));

        if(storagePointFound != null){
            storagePointService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
