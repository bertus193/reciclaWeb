package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Question;
import reciclaServer.models.User;
import reciclaServer.models.UserQuestion;

public interface UserQuestionDAO extends CrudRepository<UserQuestion, Long> {

    UserQuestion save(UserQuestion userQuestion);

    UserQuestion findFirstByQuestionAndUser(Question question, User user);

    UserQuestion findFirstByUserOrderByCreatedDateDesc(User user);

    // Admin

    Page<UserQuestion> findAll(Pageable pageable);

    UserQuestion findById(long id);

    void deleteById(long id);
}
