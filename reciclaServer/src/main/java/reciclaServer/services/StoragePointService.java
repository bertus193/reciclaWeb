package reciclaServer.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.StoragePoint;
import reciclaServer.models.StoragePointDAO;

import java.util.List;

@Service("storagePointService")
public class StoragePointService {

    private final StoragePointDAO storagePointDAO;

    @Autowired
    public StoragePointService(StoragePointDAO storagePointDAO){
        this.storagePointDAO = storagePointDAO;
    }

    public List<StoragePoint> findAll(){
        return (List<StoragePoint>)this.storagePointDAO.findAll();
    }
}
