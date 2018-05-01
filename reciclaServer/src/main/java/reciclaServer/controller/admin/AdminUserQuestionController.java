package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.UserQuestion;
import reciclaServer.models.Position;
import reciclaServer.services.UserQuestionService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminUserQuestionController {

    @Autowired
    private UserQuestionService userQuestionService;

    private HttpHeaders headers;

    @Autowired
    public AdminUserQuestionController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/userQuestions", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<UserQuestion> userQuestions = userQuestionService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(userQuestions.getTotalElements()));
        return new ResponseEntity<>(userQuestions.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/userQuestions/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        UserQuestion userQuestion = userQuestionService.findById(Long.parseLong(id));

        return new ResponseEntity<>(userQuestion, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/userQuestions", method = RequestMethod.POST)
    public ResponseEntity<?> createPosition(@RequestBody UserQuestion userQuestion) throws NoSuchAlgorithmException {

        userQuestionService.saveUserQuestion(userQuestion);
        return new ResponseEntity<>(userQuestion, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/userQuestions/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePosition(@RequestBody Position position, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        UserQuestion userQuestionFound = userQuestionService.findById(Long.parseLong(id));

        if(userQuestionFound != null){
            userQuestionService.saveUserQuestion(userQuestionFound);
        }

        return new ResponseEntity<>(position, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/userQuestions/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePosition(@PathVariable("id") String id) {
        UserQuestion userQuestionFound = userQuestionService.findById(Long.parseLong(id));

        if(userQuestionFound != null){
            userQuestionService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
