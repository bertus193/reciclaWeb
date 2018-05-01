package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.UserQuestionDAO;
import reciclaServer.models.ItemType;
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

    public UserQuestion saveUserQuestion(UserQuestion userQuestion) {
        return userQuestionDAO.save(userQuestion);
    }

    public UserQuestion findFirstByQuestionAndUser(Question question, User user) {
        return this.userQuestionDAO.findFirstByQuestionAndUser(question, user);
    }

    public UserQuestion findFirstByUser(User user) {
        return this.userQuestionDAO.findFirstByUserOrderByCreatedDateDesc(user);
    }

    // Admin

    public Page<UserQuestion> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.userQuestionDAO.findAll(request);
    }

    public UserQuestion findById(long id) {
        return this.userQuestionDAO.findById(id);
    }

    public void deleteById(long id) {
        this.userQuestionDAO.deleteById(id);
    }


}
