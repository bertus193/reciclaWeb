package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.*;
import reciclaServer.models.auxiliar.MyMail;
import reciclaServer.services.CollectiveService;
import reciclaServer.services.PositionService;
import reciclaServer.services.RecycleItemService;
import reciclaServer.services.UserService;
import reciclaServer.utils.SendMail;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public class UserController {


    private UserService userService;
    private RecycleItemService recycleItemService;
    private PositionService positionService;
    private CollectiveService collectiveService;

    @Autowired
    public UserController(
            UserService userService,
            PositionService positionService,
            RecycleItemService recycleItemService,
            CollectiveService collectiveService) {
        this.userService = userService;
        this.positionService = positionService;
        this.recycleItemService = recycleItemService;
        this.collectiveService = collectiveService;
    }

    @RequestMapping(value = "/private/users/username/{username:.+}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserByUsername(HttpServletRequest request, @PathVariable("username") String username) {
        User user = userService.findByUsername(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        String token = (String) request.getAttribute("token");
        if(token != null){
            user.setAccessToken(token);
            user = userService.saveUser(user);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user) {

        if(user.getType() == EnumUser.Normal){
            if (userService.isUserExistByEmail(user.getEmail())) {
                return new ResponseEntity<Void>(HttpStatus.CONFLICT);
            }
        }
        else{
            if (userService.isUserExistByUsername(user.getUsername())) {
                return new ResponseEntity<Void>(HttpStatus.CONFLICT);
            }
        }


        user.setCollective(this.collectiveService.findByName("Alumno"));

        user = userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/private/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(HttpServletRequest request, @PathVariable("id") long id, @RequestBody User user, @RequestParam(value ="prev_password", defaultValue = "") String prev_password) {

        long userId = (long) request.getAttribute("userId");

        if (userId == id) {
            User currentUser = userService.findById(id);

            if (currentUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if(user.getEmail() != null){
                if(currentUser.getEmail() != null){
                    if(!currentUser.getEmail().equals(user.getEmail())){
                        if (userService.isUserExistByEmail(user.getEmail())) {
                            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
                        }
                    }

                }
            }



            Timestamp userPwdRcverDate = user.getResetPwdCodeDate();
            if(userPwdRcverDate != null){
                if(user.pwdRecoverDateIsOutDated() == true){
                    user.setResetPwdCodeDate(null);
                    user.setResetPwdCode(null);
                }
            }

            if(currentUser.getPassword() != null && !currentUser.getPassword().equals(user.getPassword())){
                if(!(currentUser.getPassword().equals(prev_password))){
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
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


            if(currentUser.getType() == EnumUser.Admin){
                user.setEmail(currentUser.getEmail());
                user.setUsername(currentUser.getUsername());
                user.setPassword(currentUser.getPassword());
                user.setType(EnumUser.Admin);
            }

            if(user.getType() == EnumUser.Normal){
                user.setAccessToken(UUID.randomUUID().toString());
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
                Timestamp userPwdRcverDate = userFound.getResetPwdCodeDate();
                if(userPwdRcverDate != null){
                    if(userFound.pwdRecoverDateIsOutDated()){
                        userFound.setResetPwdCodeDate(null);
                        userFound.setResetPwdCode(null);
                    }
                }
                userFound.setAccessToken(UUID.randomUUID().toString());
                userFound = userService.saveUser(userFound);


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

        List<User> userList = this.userService.getUserPointsRanking();

        for (int i = 0; (i < userList.size() && i < 10); i++) {
            if(userList.get(i).getType() != EnumUser.Admin){
                user = new User();
                user.setId(userList.get(i).getId());
                user.setFullName(userList.get(i).getFullName());
                user.setProfilePicture(userList.get(i).getProfilePicture());
                user.setPoints(userList.get(i).getPoints());
                users.add(user);
            }
        }

        if (userList == null || userList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/users/forget", method = RequestMethod.POST)
    public ResponseEntity<?> sendRecoverMail(@RequestBody MyMail email) throws IOException, MessagingException {

        User user = userService.findByEmail(email.getTo());

        if(user != null){

            SecureRandom random = new SecureRandom();
            byte bytes[] = new byte[6];
            random.nextBytes(bytes);
            Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
            String resetPwdCode = encoder.encodeToString(bytes);

            user.setResetPwdCode(resetPwdCode);
            user.setResetPwdCodeDate(new Timestamp(System.currentTimeMillis()));

            userService.saveUser(user);
            SendMail sendEmail = new SendMail();
            sendEmail.sendRecoverMail(email.getFrom(), email.getFromPassword(), email.getFromName(), email.getTo(), email.getSubject(), resetPwdCode);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(value = "/users/recover", method = RequestMethod.POST)
    public ResponseEntity<?> recoverUser(@RequestBody User user) throws IOException, MessagingException {

        User userFound = userService.findByEmail(user.getEmail());

        if(userFound != null){
            if(userFound.getResetPwdCode() != null){
                if(!userFound.pwdRecoverDateIsOutDated()){

                    if(userFound.getResetPwdCode().toLowerCase().equals(user.getResetPwdCode().toLowerCase())){
                        userFound.setPassword(user.getPassword());
                        userFound.setResetPwdCode(null);
                        userFound.setResetPwdCodeDate(null);
                        this.userService.saveUser(userFound);

                        return new ResponseEntity<>(userFound, HttpStatus.OK);
                    }
                    else{
                        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // 401
                    }
                }
                else{
                    userFound.setResetPwdCode(null);
                    userFound.setResetPwdCodeDate(null);
                    this.userService.saveUser(userFound);
                    return new ResponseEntity<>(HttpStatus.GONE); // 410
                }
            }
            else{
                return new ResponseEntity<>(HttpStatus.PRECONDITION_REQUIRED); // 428
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(value = "/users/exist/email/{email:.+}", method = RequestMethod.GET)
    public ResponseEntity<?> existUserByEmail(@PathVariable("email") String email) {
        User user = userService.findByEmail(email);

        if (user == null) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
