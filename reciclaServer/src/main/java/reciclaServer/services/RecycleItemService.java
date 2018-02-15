package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.RecycleItemDAO;

import java.util.List;


@Service("recycleItemService")
public class RecycleItemService {

    private final RecycleItemDAO recycleItemDAO;

    @Autowired
    public RecycleItemService(RecycleItemDAO recycleItemDAO){
        this.recycleItemDAO = recycleItemDAO;
    }


    public List<RecycleItem> findAll(){
        List<RecycleItem> recycleItems = recycleItemDAO.findAll();
        return recycleItems;
    }


    public void saveRecycleItem(RecycleItem recycleItem) {
        recycleItemDAO.save(recycleItem);
    }
}
