package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Question;

import java.util.List;

public interface QuestionDAO extends CrudRepository<Question, Long> {

    List<Question> findAll();

    Question save(Question question);
}
