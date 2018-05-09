package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.User;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface UserDAO extends CrudRepository<User, Long> {

    List<User> findAllByOrderByPointsDesc();

    User findFirstByEmail(String email);

    User save(User user);

    User findFirstById(long id);

    User findFirstByAccessToken(String token);

    User findFirstByEmailAndPassword(String email, String password);

    User findFirstByUsername(String username);

    //Admin

    Page<User> findAll(Pageable pageable);

    void deleteById(long id);
}