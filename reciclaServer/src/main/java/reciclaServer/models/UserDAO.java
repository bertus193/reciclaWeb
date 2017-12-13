package reciclaServer.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface UserDAO extends CrudRepository<User, Long>, JpaRepository<User, Long> {

    List<User> findAll();

    @Query(value = "SELECT * FROM USERS WHERE email = ?1", nativeQuery = true)
    User findByEmailAddress(String emailAddress);

}