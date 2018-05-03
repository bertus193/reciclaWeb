package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Collective;
import reciclaServer.services.CollectiveService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminCollectiveController {

    @Autowired
    private CollectiveService collectiveService;

    private HttpHeaders headers;

    @Autowired
    public AdminCollectiveController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/collectives", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<Collective> collectives = collectiveService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(collectives.getTotalElements()));
        return new ResponseEntity<>(collectives.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/collectives/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Collective collective = collectiveService.findById(Long.parseLong(id));

        return new ResponseEntity<>(collective, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/collectives", method = RequestMethod.POST)
    public ResponseEntity<?> createCollective(@RequestBody Collective collective) throws NoSuchAlgorithmException {

        collectiveService.saveCollective(collective);
        return new ResponseEntity<>(collective, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/collectives/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateCollective(@RequestBody Collective collective, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        Collective collectiveFound = collectiveService.findById(Long.parseLong(id));

        if(collectiveFound != null){
            collectiveService.saveCollective(collective);
        }

        return new ResponseEntity<>(collective, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/collectives/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCollective(@PathVariable("id") String id) {
        Collective collectiveFound = collectiveService.findById(Long.parseLong(id));

        if(collectiveFound != null){
            collectiveService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
