package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Position;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.User;
import reciclaServer.services.PositionService;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*")
public class UserController {


    private UserService userService;
    private PositionService positionService;

    @Autowired
    public UserController(
            UserService userService,
            PositionService positionService){
        this.userService = userService;
        this.positionService = positionService;
    }

    @RequestMapping(value = "/users/email/{email:.+}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
            User user = userService.findByEmail(email);

        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user){
        System.out.println("Creating User " + user.getEmail());

        if (userService.isUserExist(user)) {
            System.out.println("A User with name " + user.getEmail() + " already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        userService.saveUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {

        User currentUser = userService.findById(id);

        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Position position = new Position(user.getLastPosition().getLatitude(), user.getLastPosition().getLongitude());

        user.setLastPosition(positionService.savePosition(position));

        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{id}/recycleItems", method = RequestMethod.GET)
    public ResponseEntity<?> getUserRecycleItems(HttpServletRequest request, @PathVariable("id") long id){

        long userId = (long)request.getAttribute("userId");

        if(userId == id){
            User user = userService.findById(id);

            if(user == null){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(user.getRecycleItems(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }



    }
}
