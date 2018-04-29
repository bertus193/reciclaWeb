package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
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
        this.headers.add("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/positions", method = RequestMethod.GET)
    public ResponseEntity<?> findAll() {
        List<Position> positions = positionService.findAll();

        this.headers.add("X-Total-Count", String.valueOf(positions.size()));
        return new ResponseEntity<>(positions, headers, HttpStatus.OK);
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
