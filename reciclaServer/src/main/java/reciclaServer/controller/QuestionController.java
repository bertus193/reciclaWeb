package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Question;
import reciclaServer.services.QuestionService;

import java.security.SecureRandom;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@ControllerAdvice
public class QuestionController {


    private QuestionService questionService;

    @Autowired
    public QuestionController(
            QuestionService questionService) {
        this.questionService = questionService;
    }


    @RequestMapping(value = "/questions/random", method = RequestMethod.GET)
    public ResponseEntity<?> getRandomQuestion() {
        SecureRandom rand = new SecureRandom();

        List<Question> questions = this.questionService.findAll();

        if (questions == null || questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Question question = questions.get(rand.nextInt(questions.size()));

            if (question == null) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>(question, HttpStatus.OK);
            }
        }


    }
}
