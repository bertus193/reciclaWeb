package reciclaServer.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.StoragePoint;
import reciclaServer.models.DAO.StoragePointDAO;

import java.util.List;

@Service("storagePointService")
public class StoragePointService {

    private final StoragePointDAO storagePointDAO;

    @Autowired
    public StoragePointService(StoragePointDAO storagePointDAO){
        this.storagePointDAO = storagePointDAO;
    }

    // Admin

    public Page<StoragePoint> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.storagePointDAO.findAll(request);
    }

    public StoragePoint findById(long id) {
        return this.storagePointDAO.findById(id);
    }

    public StoragePoint saveStoragePoint(StoragePoint storagePoint) {
        return storagePointDAO.save(storagePoint);
    }

    public void deleteById(long id) {
        this.storagePointDAO.deleteById(id);
    }

}
