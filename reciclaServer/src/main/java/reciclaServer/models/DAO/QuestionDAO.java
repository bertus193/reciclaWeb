package reciclaServer.models.DAO;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import reciclaServer.models.Question;

import java.util.List;

public interface QuestionDAO extends CrudRepository<Question, Long> {

    @Query(value = "SELECT * FROM question q WHERE q.id NOT IN (SELECT id FROM user_question uq WHERE uq.user = :user_id)", nativeQuery = true)
    List<Question> findQuestionsNotDidAlreadyByUser(@Param("user_id") int userId);

    Question save(Question question);
}
