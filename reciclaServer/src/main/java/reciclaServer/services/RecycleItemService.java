package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.DAO.RecycleItemDAO;
import reciclaServer.models.exceptions.ItemTypeNotFoundException;
import reciclaServer.models.exceptions.StorageNotFoundException;
import reciclaServer.models.exceptions.UserNotFoundException;

import java.util.List;


@Service("recycleItemService")
public class RecycleItemService {

    private final RecycleItemDAO recycleItemDAO;

    @Autowired
    public RecycleItemService(RecycleItemDAO recycleItemDAO){
        this.recycleItemDAO = recycleItemDAO;
    }


    public RecycleItem findById(long id){
        return recycleItemDAO.findFirstById(id);
    }


    public void saveRecycleItem(RecycleItem recycleItem) throws UserNotFoundException, StorageNotFoundException, ItemTypeNotFoundException {
        if(recycleItem.getRecycleUser() == null){
            throw new UserNotFoundException("recycleItem user not found");
        }
        else if(recycleItem.getStorage() == null){
            throw new StorageNotFoundException("recycleItem storage not found");
        }
        else if(recycleItem.getItemType() == null){
            throw new ItemTypeNotFoundException("recycleItem itemType not found");
        }
        else{
            recycleItemDAO.save(recycleItem);
        }

    }
}
