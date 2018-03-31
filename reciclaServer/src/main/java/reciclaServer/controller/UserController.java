package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.Position;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.User;
import reciclaServer.services.PositionService;
import reciclaServer.services.RecycleItemService;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;

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

    @RequestMapping(value = "/users/email/{email:.+}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        User user = userService.findByEmail(email);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user) {
        System.out.println("Creating User " + user.getEmail());

        if (userService.isUserExist(user)) {
            System.out.println("A User with name " + user.getEmail() + " already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/users/private/{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(HttpServletRequest request, @PathVariable("id") long id, @RequestBody User user) {

        long userId = (long) request.getAttribute("userId");

        if (userId == id) {
            User currentUser = userService.findById(id);

            if (currentUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            user.setId(id);

            Position position = user.getLastPosition();

            if (user.getLastPosition().getId() == -1) {
                position = new Position(user.getLastPosition().getLatitude(), user.getLastPosition().getLongitude());
            }

            user.setLastPosition(positionService.savePosition(position));

            userService.saveUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


    }

    @RequestMapping(value = "/users/private/{id}/recycleItems", method = RequestMethod.GET)
    public ResponseEntity<?> getUserRecycleItems(HttpServletRequest request, @PathVariable("id") long id, @RequestParam("page") int page, @RequestParam("perPage") int perPage) {

        long userId = (long) request.getAttribute("userId");

        if (userId == id) {
            try {
                Page<RecycleItem> recycleItems = recycleItemService.findByRecycleUser_Id(id, page, perPage);

                if (recycleItems == null || recycleItems.getContent().isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }

                return new ResponseEntity<>(recycleItems.getContent(), HttpStatus.OK);
            } catch (IllegalArgumentException ex) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


}
