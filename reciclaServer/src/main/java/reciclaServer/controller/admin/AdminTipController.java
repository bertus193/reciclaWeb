package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Tip;
import reciclaServer.services.TipService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminTipController {

    @Autowired
    private TipService tipService;

    private HttpHeaders headers;

    @Autowired
    public AdminTipController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/tips", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<Tip> tips = tipService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(tips.getTotalElements()));
        return new ResponseEntity<>(tips.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/tips/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Tip tip = tipService.findById(Long.parseLong(id));

        return new ResponseEntity<>(tip, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/tips", method = RequestMethod.POST)
    public ResponseEntity<?> createTip(@RequestBody Tip tip) throws NoSuchAlgorithmException {

        tipService.saveTip(tip);
        return new ResponseEntity<>(tip, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/tips/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateTip(@RequestBody Tip tip, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        Tip tipFound = tipService.findById(Long.parseLong(id));

        if(tipFound != null){
            tipService.saveTip(tip);
        }

        return new ResponseEntity<>(tip, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/tips/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTip(@PathVariable("id") String id) {
        Tip tipFound = tipService.findById(Long.parseLong(id));

        if(tipFound != null){
            tipService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
