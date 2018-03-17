package reciclaServer.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.StorageDAO;
import reciclaServer.models.ItemType;
import reciclaServer.models.Storage;

import java.util.List;

@Service("storageService")
public class StorageService {

    private final StorageDAO storageDAO;

    @Autowired
    public StorageService(StorageDAO storageDAO){
        this.storageDAO = storageDAO;
    }

    public List<Storage> getStoragesByItemType(ItemType itemType){
        return this.storageDAO.findByItemType(itemType);
    }

}
