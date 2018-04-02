package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.User;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface UserDAO extends CrudRepository<User, Long> {

    List<User> findAll();

    User findFirstByEmail(String email);

    User save(User user);

    User findFirstById(long id);

    User findFirstByAccessToken(String token);

    User findFirstByEmailAndPassword(String email, String password);
}