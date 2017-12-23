package reciclaServer.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface UserDAO extends CrudRepository<User, Long>{

    List<User> findAll();

    User findByEmail(String email);

    User save(User user);

    User findById(long id);
}