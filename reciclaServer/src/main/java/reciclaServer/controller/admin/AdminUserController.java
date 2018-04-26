package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AdminUserController {


    private UserService userService;
    private RecycleItemService recycleItemService;
    private PositionService positionService;

    private HttpHeaders headers;

    @Autowired
    public AdminUserController(
            UserService userService,
            PositionService positionService,
            RecycleItemService recycleItemService) {
        this.userService = userService;
        this.positionService = positionService;
        this.recycleItemService = recycleItemService;

        this.headers = new HttpHeaders();
        this.headers.add("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/users", method = RequestMethod.GET)
    public ResponseEntity<?> findAll() {
        List<User> users = userService.findAll();

        this.headers.add("X-Total-Count", String.valueOf(users.size()));
        return new ResponseEntity<>(users, headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        User user = userService.findById(Long.parseLong(id));

        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }
}
