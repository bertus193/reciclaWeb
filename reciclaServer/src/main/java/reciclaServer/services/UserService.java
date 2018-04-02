package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.UserDAO;
import reciclaServer.models.User;


@Service("userService")
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public void saveUser(User user) {
        userDAO.save(user);
    }


    public User findByEmail(String email) {
        return userDAO.findFirstByEmail(email);
    }

    public boolean isUserExist(String email) {
        return findByEmail(email) != null;
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
}
