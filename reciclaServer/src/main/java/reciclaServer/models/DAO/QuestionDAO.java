package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import reciclaServer.models.Question;

import java.util.List;

public interface QuestionDAO extends CrudRepository<Question, Long> {

    @Query(value = "SELECT * FROM question q WHERE q.id NOT IN (SELECT uq.question FROM user_question uq WHERE uq.user = :user_id)", nativeQuery = true)
    List<Question> findQuestionsNotDidAlreadyByUser(@Param("user_id") int userId);

    Question save(Question question);

    Question findById(long id);


    // Admin

    Page<Question> findAll(Pageable pageable);

    void deleteById(long id);
}
