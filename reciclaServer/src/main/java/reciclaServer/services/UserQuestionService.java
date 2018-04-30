package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.UserQuestionDAO;
import reciclaServer.models.Question;
import reciclaServer.models.User;
import reciclaServer.models.UserQuestion;

@Service("userQuestionService")
public class UserQuestionService {

    private final UserQuestionDAO userQuestionDAO;

    @Autowired
    public UserQuestionService(UserQuestionDAO userQuestionDAO) {
        this.userQuestionDAO = userQuestionDAO;
    }

    public UserQuestion save(UserQuestion userQuestion) {
        return userQuestionDAO.save(userQuestion);
    }

    public UserQuestion findFirstByQuestionAndUser(Question question, User user) {
        return this.userQuestionDAO.findFirstByQuestionAndUser(question, user);
    }

    public UserQuestion findFirstByUser(User user) {
        return this.userQuestionDAO.findFirstByUserOrderByCreatedDateDesc(user);
    }


}
