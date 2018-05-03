package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Position;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.TypeUser;
import reciclaServer.models.User;
import reciclaServer.services.PositionService;
import reciclaServer.services.RecycleItemService;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {


    private UserService userService;
    private RecycleItemService recycleItemService;
    private PositionService positionService;

    @Autowired
    public UserController(
            UserService userService,
            PositionService positionService,
            RecycleItemService recycleItemService) {
        this.userService = userService;
        this.positionService = positionService;
        this.recycleItemService = recycleItemService;
    }

    @RequestMapping(value = "/private/users/username/{username:.+}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByEmail(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user) {

        if (userService.isUserExist(user.getEmail())) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/private/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(HttpServletRequest request, @PathVariable("id") long id, @RequestBody User user) {

        long userId = (long) request.getAttribute("userId");

        if (userId == id) {
            User currentUser = userService.findById(id);

            if (currentUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Position position = currentUser.getLastPosition();

            if (user.getLastPosition() != null) {
                if (currentUser.getLastPosition() == null) {
                    position = new Position(user.getLastPosition().getLatitude(), user.getLastPosition().getLongitude());
                } else {
                    position.setLatitude(user.getLastPosition().getLatitude());
                    position.setLongitude(user.getLastPosition().getLongitude());
                }
                user.setLastPosition(positionService.savePosition(position));
            }

            user.setRecycleItems(currentUser.getRecycleItems());
            user.setQuestionsDone(currentUser.getQuestionsDone());

            //Estos valores no deben cambiar, por tanto, se dejan como estaban
            user.setId(currentUser.getId());
            user.setUsername(currentUser.getUsername());
            user.setCreatedDate(currentUser.getCreatedDate());
            user.setType(currentUser.getType());
            user.setPoints(currentUser.getPoints());
            user.setGamePoints(currentUser.getGamePoints());


            if(currentUser.getType() == TypeUser.Admin){
                user.setEmail(currentUser.getEmail());
                user.setUsername(currentUser.getUsername());
                user.setPassword(currentUser.getPassword());
                user.setType(TypeUser.Admin);
            }

            userService.saveUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


    }

    @RequestMapping(value = "/private/users/{id}/recycleItems", method = RequestMethod.GET)
    public ResponseEntity<?> getUserRecycleItems(HttpServletRequest request, @PathVariable("id") long id, @RequestParam("page") int page, @RequestParam("perPage") int perPage) {

        long userId = (long) request.getAttribute("userId");

        if (userId == id) {
            try {
                Page<RecycleItem> recycleItems = recycleItemService.findByRecycleUser_Id(id, page, perPage);

                if (recycleItems == null || recycleItems.getContent().isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }

                return new ResponseEntity<>(recycleItems, HttpStatus.OK);
            } catch (IllegalArgumentException ex) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(value = "/users/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody User user) {

        if (user.getEmail() != null && user.getPassword() != null &&
                !user.getEmail().isEmpty() && !user.getPassword().isEmpty()) {

            User userFound = userService.findFirstByEmailAndPassword(user.getEmail(), user.getPassword());

            if (userFound != null) {
                return new ResponseEntity<>(userFound, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(value = "/users/topRanked", method = RequestMethod.GET)
    public ResponseEntity<?> getTopRankedUsers() {

        List<User> users = new ArrayList<>();
        User user;

        List<User> userList = this.userService.findTop10ByPoints();

        for (int i = 0; i < userList.size(); i++) {
            user = new User();
            user.setFullName(userList.get(i).getFullName());
            user.setProfilePicture(userList.get(i).getProfilePicture());
            user.setPoints(userList.get(i).getPoints());
            users.add(user);
        }

        if (userList == null || userList.isEmpty()) {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<Object>(users, HttpStatus.OK);
        }


    }
}
