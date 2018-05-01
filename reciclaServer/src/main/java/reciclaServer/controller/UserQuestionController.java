package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Question;
import reciclaServer.models.Reply;
import reciclaServer.models.User;
import reciclaServer.models.UserQuestion;
import reciclaServer.services.QuestionService;
import reciclaServer.services.ReplyService;
import reciclaServer.services.UserQuestionService;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;

@RestController
@CrossOrigin(origins = "*")
public class UserQuestionController {


    private QuestionService questionService;
    private UserService userService;
    private UserQuestionService userQuestionService;
    private ReplyService replyService;

    @Autowired
    public UserQuestionController(
            QuestionService questionService,
            UserService userService,
            UserQuestionService userQuestionService,
            ReplyService replyService) {
        this.questionService = questionService;
        this.userService = userService;
        this.userQuestionService = userQuestionService;
        this.replyService = replyService;
    }


    @RequestMapping(value = "/private/userQuestions/{question_id}/user/{user_id}/reply/{reply_id}", method = RequestMethod.POST)
    public ResponseEntity<?> saveUserReply(HttpServletRequest request, @PathVariable("question_id") long question_id, @PathVariable("user_id") long user_id, @PathVariable("reply_id") long reply_id) {

        long userId = (long) request.getAttribute("userId");

        if (userId == user_id) {
            User user = this.userService.findById(user_id);

            if (user != null) {

                long hours = user.getHoursDifferenceToPlay();

                if (hours >= 24) {
                    Question question = this.questionService.findById(question_id);

                    if (question != null) {
                        Reply reply = replyService.findById(reply_id);

                        if (reply != null) {
                            UserQuestion userQuestion = this.userQuestionService.findFirstByQuestionAndUser(question, user);

                            if (userQuestion == null && reply.getQuestion().getId() == question.getId()) {
                                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                                userQuestion = new UserQuestion();
                                userQuestion.setCreatedDate(timestamp);
                                userQuestion.setUser(user);
                                userQuestion.setQuestion(question);
                                userQuestion.setUserReply(reply);

                                this.userQuestionService.saveUserQuestion(userQuestion);

                                if (question.getCorrectReply().getId() == reply.getId()) {
                                    user.setGamePoints(user.getGamePoints() + question.getQuestionValue());
                                }
                                user.setLastGameDate(timestamp);
                                this.userService.saveUser(user);

                                return new ResponseEntity<>(question.getCorrectReply(), HttpStatus.OK);
                            } else {
                                return new ResponseEntity<>(HttpStatus.CONFLICT);
                            }
                        } else {
                            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                        }
                    } else {
                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
