package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.ItemTypeDAO;
import reciclaServer.models.ItemType;

@Service("itemTypeService")
public class ItemTypeService {

    private final ItemTypeDAO itemTypeDAO;

    @Autowired
    public ItemTypeService(ItemTypeDAO itemTypeDAO){
        this.itemTypeDAO = itemTypeDAO;
    }

    public ItemType getItemTypeById(long id){
        return itemTypeDAO.getItemTypeById(id);
    }

}
