package reciclaServer.models;


import org.springframework.data.domain.Page;

import java.util.List;

public class RecycleItems_Users {
    public Page<RecycleItem> recycleItemList;
    public List<User> userList;
}
