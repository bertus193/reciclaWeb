package reciclaServer.models.auxiliar;


import org.springframework.data.domain.Page;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.User;

import java.util.List;

public class RecycleItems_Users {
    public Page<RecycleItem> recycleItemList;
    public List<User> userList;
}
