package reciclaServer.services;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import reciclaServer.models.User;
import reciclaServer.models.UserDAO;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


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

    public User findByEmailAddress(String email){
        User user = userDAO.findByEmailAddress(email);
        return user;
    }

}

/*
@Repository
@Transactional
public class UserService extends JdbcDaoSupport {
    //https://www.concretepage.com/spring/jdbc-template-spring-jdbc-integration-example

    @Autowired
    DataSource dataSource;

    @Autowired
    UserDAO userDao;

    @PostConstruct
    private void initialize(){
        setDataSource(dataSource);
    }


    public List<User> findAll(){
        List<User> users = userDao.findAll();
        return users;
    }

}
 */
