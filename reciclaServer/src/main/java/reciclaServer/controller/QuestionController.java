package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Question;
import reciclaServer.models.User;
import reciclaServer.services.QuestionService;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@CrossOrigin(origins = "*")
@ControllerAdvice
public class QuestionController {


    private QuestionService questionService;
    private UserService userService;

    @Autowired
    public QuestionController(
            QuestionService questionService,
            UserService userService) {
        this.questionService = questionService;
        this.userService = userService;
    }


    @RequestMapping(value = "/private/questions/user/{id}/random", method = RequestMethod.GET)
    public ResponseEntity<?> getRandomQuestion(HttpServletRequest request, @PathVariable("id") long id) {

        long userId = (long) request.getAttribute("userId");

        if (userId == id) {
            User user = this.userService.findById(id);

            if (user != null) {

                LocalDateTime ldt = LocalDateTime.now();
                ZonedDateTime zdt = ZonedDateTime.of(ldt, ZoneId.systemDefault());
                ZonedDateTime gmt = zdt.withZoneSameInstant(ZoneId.of("GMT"));
                Timestamp timeNow = Timestamp.valueOf(gmt.toLocalDateTime());

                ldt = user.getLastGameDate().toLocalDateTime();
                zdt = ZonedDateTime.of(ldt, ZoneId.systemDefault());
                gmt = zdt.withZoneSameInstant(ZoneId.of("GMT"));
                Timestamp timeUser = Timestamp.valueOf(gmt.toLocalDateTime());


                long diff = timeNow.getTime() - timeUser.getTime();
                long hours = TimeUnit.HOURS.convert(diff, TimeUnit.MILLISECONDS);
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
                    return new ResponseEntity<>(hours, HttpStatus.PARTIAL_CONTENT);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }


        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/private/questions/{question_id}/user/{user_id}", method = RequestMethod.POST)
    public ResponseEntity<?> saveUserReply(HttpServletRequest request, @PathVariable("question_id") long question_id, @PathVariable("user_id") long user_id) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
