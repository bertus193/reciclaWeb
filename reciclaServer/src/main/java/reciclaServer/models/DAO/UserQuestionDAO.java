package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Question;
import reciclaServer.models.User;
import reciclaServer.models.UserQuestion;

public interface UserQuestionDAO extends CrudRepository<UserQuestion, Long> {

    UserQuestion save(UserQuestion question);

    UserQuestion findFirstByQuestionAndUser(Question question, User user);

    UserQuestion findFirstByUserOrderByCreatedDateDesc(User user);
}
