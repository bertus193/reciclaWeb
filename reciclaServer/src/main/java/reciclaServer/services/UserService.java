package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.User;
import reciclaServer.models.UserDAO;
import java.util.List;


@Service
public class UserService{

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO){
        this.userDAO = userDAO;
    }


    public List<User> findAll(){
        List<User> users = userDAO.findAll();
        return users;
    }

    public List<User> findByEmailAndName(String email, String name){
        List<User> users = userDAO.findByEmailAndName(email, name);
        return users;
    }

}
