package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.RecycleItems_Users;
import reciclaServer.models.User;
import reciclaServer.models.exceptions.ItemTypeNotFoundException;
import reciclaServer.models.exceptions.StorageNotFoundException;
import reciclaServer.models.exceptions.UserNotFoundException;
import reciclaServer.services.RecycleItemService;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
public class RecycleItemController {


    private RecycleItemService recycleItemService;
    private UserService userService;

    @Autowired
    public RecycleItemController(RecycleItemService recycleItemService, UserService userService) {
        this.recycleItemService = recycleItemService;
        this.userService = userService;
    }

    @RequestMapping(value = "/private/recycleItems", method = RequestMethod.POST)
    public ResponseEntity<?> createRecycleItem(HttpServletRequest request, @RequestBody RecycleItem recycleItem) {

        long userId = (long) request.getAttribute("userId");

        if (userId == recycleItem.getRecycleUser().getId()) {

            try {
                recycleItem = recycleItemService.saveRecycleItem(recycleItem);

                User user = userService.findById(userId);
                user.setPoints(user.getPoints() + recycleItem.getItemType().getRecycleValue());
                this.userService.saveUser(user);

            } catch (UserNotFoundException | StorageNotFoundException | ItemTypeNotFoundException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(recycleItem, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @RequestMapping(value = "/recycleItems/latest", method = RequestMethod.GET)
    public ResponseEntity<?> getLatestRecycleItems(@RequestParam("page") int page, @RequestParam("perPage") int perPage) {

        RecycleItems_Users recycleItem_userList = new RecycleItems_Users();
        try {
            Page<RecycleItem> recycleItems = recycleItemService.findLatest(page, perPage);

            recycleItem_userList.recycleItemList = recycleItems;

            recycleItem_userList.userList = new ArrayList();
            for (int i = 0; i < recycleItems.getContent().size(); i++) {
                User user = new User();
                user.setId(recycleItems.getContent().get(i).getRecycleUser().getId());
                user.setFullName(recycleItems.getContent().get(i).getRecycleUser().getFullName());
                user.setProfilePicture(recycleItems.getContent().get(i).getRecycleUser().getProfilePicture());

                if (!recycleItem_userList.userList.contains(user)) {
                    recycleItem_userList.userList.add(user);
                }

            }

            if (recycleItems == null || recycleItems.getContent().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(recycleItem_userList, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


    @RequestMapping(value = "/private/recycleItems/{id}", method = RequestMethod.GET)
    public ResponseEntity<RecycleItem> findRecycleItemById(HttpServletRequest request, @PathVariable("id") long id) {

        long userId = (long) request.getAttribute("userId");

        RecycleItem recycleItem = recycleItemService.findById(id);

        if (recycleItem == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            if (userId == recycleItem.getRecycleUser().getId()) {
                return new ResponseEntity<>(recycleItem, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }
    }

}
