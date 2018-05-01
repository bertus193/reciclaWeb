package reciclaServer.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public List<Question> findQuestionsNotDidAlreadyByUser(int userId) {
        return this.questionDAO.findQuestionsNotDidAlreadyByUser(userId);
    }

    public Question findById(long id) {
        return this.questionDAO.findById(id);
    }

    // Admin

    public Page<Question> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.questionDAO.findAll(request);
    }

    public Question saveQuestion(Question question) {
        return questionDAO.save(question);
    }

    public void deleteById(long id) {
        this.questionDAO.deleteById(id);
    }
}