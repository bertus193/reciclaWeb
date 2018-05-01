package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Question;
import reciclaServer.models.Question;
import reciclaServer.services.QuestionService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminQuestionController {

    @Autowired
    private QuestionService questionService;

    private HttpHeaders headers;

    @Autowired
    public AdminQuestionController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/questions", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<Question> questions = questionService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(questions.getTotalElements()));
        return new ResponseEntity<>(questions.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/questions/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Question question = questionService.findById(Long.parseLong(id));

        return new ResponseEntity<>(question, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/questions", method = RequestMethod.POST)
    public ResponseEntity<?> createQuestion(@RequestBody Question question) throws NoSuchAlgorithmException {

        questionService.saveQuestion(question);
        return new ResponseEntity<>(question, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/questions/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateQuestion(@RequestBody Question question, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        Question questionFound = questionService.findById(Long.parseLong(id));

        if(questionFound != null){
            questionService.saveQuestion(question);
        }

        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/questions/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteQuestion(@PathVariable("id") String id) {
        Question questionFound = questionService.findById(Long.parseLong(id));

        if(questionFound != null){
            questionService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
