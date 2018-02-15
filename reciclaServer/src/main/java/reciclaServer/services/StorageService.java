package reciclaServer.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.StorageDAO;

@Service("storageService")
public class StorageService {

    private final StorageDAO storageDAO;

    @Autowired
    public StorageService(StorageDAO storageDAO){
        this.storageDAO = storageDAO;
    }

}
