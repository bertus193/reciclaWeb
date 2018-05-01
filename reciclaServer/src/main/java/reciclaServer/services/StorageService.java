package reciclaServer.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    // Admin

    public Page<Storage> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.storageDAO.findAll(request);
    }

    public Storage findById(long id) {
        return this.storageDAO.findById(id);
    }

    public Storage saveStorage(Storage storage) {
        return storageDAO.save(storage);
    }

    public void deleteById(long id) {
        this.storageDAO.deleteById(id);
    }
}
