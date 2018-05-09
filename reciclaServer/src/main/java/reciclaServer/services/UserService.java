package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.UserDAO;
import reciclaServer.models.User;

import java.util.List;


@Service("userService")
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User saveUser(User user) {
        return userDAO.save(user);
    }


    public User findByEmail(String email) {
        return userDAO.findFirstByEmail(email);
    }

    public User findByUsername(String username){ return userDAO.findFirstByUsername(username);}

    public boolean isUserExistByEmail(String email) {
        return findByEmail(email) != null;
    }

    public boolean isUserExistByUsername(String username) {
        return findByUsername(username) != null;
    }

    public User findById(long id) {
        return userDAO.findFirstById(id);
    }

    public User findByAccessToken(String token) {
        return userDAO.findFirstByAccessToken(token);
    }

    public User findFirstByEmailAndPassword(String email, String password) {
        return userDAO.findFirstByEmailAndPassword(email, password);
    }

    public List<User> getUserPointsRanking() {
        return this.userDAO.findAllByOrderByPointsDesc();
    }


    //Admin

    public Page<User> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction){
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.userDAO.findAll(request);
    }

    public void deleteById(long id){
        this.userDAO.deleteById(id);
    }
}
