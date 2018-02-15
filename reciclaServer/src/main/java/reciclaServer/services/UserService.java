package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.User;
import reciclaServer.models.UserDAO;
import java.util.List;


@Service("userService")
public class UserService{

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    public void saveUser(User user) {
        userDAO.save(user);
    }


    public List<User> findAll(){
        List<User> users = userDAO.findAll();
        return users;
    }

    public User findByEmail(String email){
        return userDAO.findFirstByEmail(email);
    }

    public boolean isUserExist(User user){
        return findByEmail(user.getEmail()) != null;
    }

    public User findById(long id) {
        return userDAO.findFirstById(id);
    }
}
