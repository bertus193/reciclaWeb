package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.ItemTypeNameDAO;
import reciclaServer.models.ItemTypeName;

@Service("ItemTypeNameService")
public class ItemTypeNameService {
    private final ItemTypeNameDAO itemTypeNameDAO;

    @Autowired
    public ItemTypeNameService(ItemTypeNameDAO itemTypeNameDAO){
        this.itemTypeNameDAO = itemTypeNameDAO;
    }

    public ItemTypeName findFirstByDescription(String description){
        return this.itemTypeNameDAO.findFirstByDescription(description);
    }
}
