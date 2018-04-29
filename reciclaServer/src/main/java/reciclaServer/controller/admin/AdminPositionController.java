package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Position;
import reciclaServer.services.PositionService;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AdminPositionController {

    @Autowired
    private PositionService positionService;

    private HttpHeaders headers;

    @Autowired
    public AdminPositionController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/positions", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<Position> positions = positionService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(positions.getTotalElements()));
        return new ResponseEntity<>(positions.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/positions/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Position position = positionService.findById(Long.parseLong(id));

        return new ResponseEntity<>(position, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/positions", method = RequestMethod.POST)
    public ResponseEntity<?> createPosition(@RequestBody Position position) throws NoSuchAlgorithmException {

        positionService.savePosition(position);
        return new ResponseEntity<>(position, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/positions/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePosition(@RequestBody Position position, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        Position positionFound = positionService.findById(Long.parseLong(id));

        if(positionFound != null){
            positionService.savePosition(position);
        }

        return new ResponseEntity<>(position, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/positions/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePosition(@PathVariable("id") String id) {
        Position positionFound = positionService.findById(Long.parseLong(id));

        if(positionFound != null){
            positionService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
