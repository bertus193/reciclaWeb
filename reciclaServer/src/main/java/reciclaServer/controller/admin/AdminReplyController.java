package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Reply;
import reciclaServer.models.Position;
import reciclaServer.services.ReplyService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminReplyController {

    @Autowired
    private ReplyService replyService;

    private HttpHeaders headers;

    @Autowired
    public AdminReplyController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/replies", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<Reply> replies = replyService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(replies.getTotalElements()));
        return new ResponseEntity<>(replies.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/replies/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Reply reply = replyService.findById(Long.parseLong(id));

        return new ResponseEntity<>(reply, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/replies", method = RequestMethod.POST)
    public ResponseEntity<?> createPosition(@RequestBody Reply reply) throws NoSuchAlgorithmException {

        replyService.saveReply(reply);
        return new ResponseEntity<>(reply, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/replies/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePosition(@RequestBody Position position, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        Reply replyFound = replyService.findById(Long.parseLong(id));

        if(replyFound != null){
            replyService.saveReply(replyFound);
        }

        return new ResponseEntity<>(position, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/replies/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePosition(@PathVariable("id") String id) {
        Reply replyFound = replyService.findById(Long.parseLong(id));

        if(replyFound != null){
            replyService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
