package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.ItemTypeDAO;
@Service("itemTypeService")
public class ItemTypeService {

    private final ItemTypeDAO itemTypeDAO;

    @Autowired
    public ItemTypeService(ItemTypeDAO itemTypeDAO){
        this.itemTypeDAO = itemTypeDAO;
    }

}
