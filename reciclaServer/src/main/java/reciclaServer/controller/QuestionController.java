package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.LastQuestionDone;
import reciclaServer.models.Question;
import reciclaServer.models.User;
import reciclaServer.models.UserQuestion;
import reciclaServer.services.QuestionService;
import reciclaServer.services.UserQuestionService;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@ControllerAdvice
public class QuestionController {


    private QuestionService questionService;
    private UserService userService;
    private UserQuestionService userQuestionService;

    @Autowired
    public QuestionController(
            QuestionService questionService,
            UserService userService,
            UserQuestionService userQuestionService) {
        this.questionService = questionService;
        this.userService = userService;
        this.userQuestionService = userQuestionService;
    }


    @RequestMapping(value = "/private/questions/user/{id}/random", method = RequestMethod.GET)
    public ResponseEntity<?> getRandomQuestion(HttpServletRequest request, @PathVariable("id") long id) {

        long userId = (long) request.getAttribute("userId");

        if (userId == id) {
            User user = this.userService.findById(id);

            if (user != null) {
                long hours = user.getHoursDifferenceToPlay();
                if (hours >= 24) {
                    SecureRandom rand = new SecureRandom();

                    List<Question> questions = this.questionService.findQuestionsNotDidAlreadyByUser(java.lang.Math.toIntExact(userId));

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
                } else {
                    LastQuestionDone lastQuestionDone = new LastQuestionDone();
                    UserQuestion userQuestion = this.userQuestionService.findFirstByUser(user);

                    lastQuestionDone.setHours(hours);
                    if (userQuestion != null) {
                        lastQuestionDone.setQuestion(userQuestion.getQuestion());
                        lastQuestionDone.setUserReply(userQuestion.getUserReply());
                    }

                    return new ResponseEntity<>(lastQuestionDone, HttpStatus.PARTIAL_CONTENT);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }


        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
