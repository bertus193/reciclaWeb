package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Question;
import reciclaServer.models.User;
import reciclaServer.models.UserQuestion;

public interface UserQuestionDAO extends CrudRepository<UserQuestion, Long> {

    UserQuestion save(UserQuestion question);

    UserQuestion findFirstByQuestion(Question question);

    UserQuestion findFirstByUserOrderByCreatedDateDesc(User user);
}
