package reciclaServer.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.QuestionDAO;
import reciclaServer.models.Question;

import java.util.List;

@Service("questionService")
public class QuestionService {

    private final QuestionDAO questionDAO;

    @Autowired
    public QuestionService(QuestionDAO questionDAO) {
        this.questionDAO = questionDAO;
    }

    public Question saveAppLog(Question question) {
        return questionDAO.save(question);
    }

    public List<Question> findQuestionsNotDidAlreadyByUser(int userId) {
        return this.questionDAO.findQuestionsNotDidAlreadyByUser(userId);
    }

    public Question findById(long id) {
        return this.questionDAO.findById(id);
    }
}