package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.User;
import reciclaServer.models.EnumUser;
import reciclaServer.services.UserService;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;

@RestController
@CrossOrigin(origins = "*")
public class AdminUserController {


    private UserService userService;

    private HttpHeaders headers;

    @Autowired
    public AdminUserController(
            UserService userService) {
        this.userService = userService;

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }


    @RequestMapping(value = "/admin/users", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction
    ) {

        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));

        Page<User> users = userService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(users.getTotalElements()));
        return new ResponseEntity<>(users.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        User user = userService.findById(Long.parseLong(id));

        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/users", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user) throws NoSuchAlgorithmException {

        if (userService.isUserExist(user.getEmail())) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }

        if(user.getType() == null){
            user.setType(EnumUser.Normal);
        }

        if(user.getType() != EnumUser.Normal){
            user.setPassword("");
        }

        if(user.getPassword() != null && !user.getPassword().isEmpty()){
            user.setPassword(this.checkPassword(user.getPassword()));
        }

        user.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        user.setLastGameDate(new Timestamp(System.currentTimeMillis()));
        user.setUsername(user.getEmail());
        user.setEnabled(true);

        userService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/users/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        User userFound = userService.findById(Long.parseLong(id));

        if(userFound != null){
            user.setUsername(userFound.getUsername());

            if(user.getType() != EnumUser.Normal){
                user.setPassword("");
            }

            if(userFound.getType() == EnumUser.Admin){
                user.setEmail(userFound.getEmail());
                user.setUsername(userFound.getUsername());
                user.setPassword(userFound.getPassword());
                user.setType(EnumUser.Admin);
            }

            if(!user.getPassword().isEmpty() && !userFound.getPassword().equals(user.getPassword())){
                user.setPassword(this.checkPassword(user.getPassword()));
            }

            userService.saveUser(user);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/users/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id) {
        User userFound = userService.findById(Long.parseLong(id));

        if(userFound != null){
            userService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    public String checkPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance( "SHA-256" );

        // Change this to UTF-16 if needed
        md.update( password.getBytes( StandardCharsets.UTF_8 ) );
        byte[] digest = md.digest();

        String hex = String.format( "%064x", new BigInteger( 1, digest ) );
        return hex;
    }
}
