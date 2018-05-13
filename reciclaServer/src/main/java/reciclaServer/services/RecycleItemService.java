package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.RecycleItemDAO;
import reciclaServer.models.RecycleItem;
import reciclaServer.models.exceptions.ItemTypeNotFoundException;
import reciclaServer.models.exceptions.StorageNotFoundException;
import reciclaServer.models.exceptions.UserNotFoundException;


@Service("recycleItemService")
public class RecycleItemService {

    private final RecycleItemDAO recycleItemDAO;

    @Autowired
    public RecycleItemService(RecycleItemDAO recycleItemDAO) {
        this.recycleItemDAO = recycleItemDAO;
    }


    public RecycleItem findById(long id) {
        return recycleItemDAO.findById(id);
    }

    public Page<RecycleItem> findByRecycleUser_Id(long id, int pageNumber, int pageSize) {

        Sort sort = new Sort(new Sort.Order(Sort.Direction.DESC, "createdDate"));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return recycleItemDAO.findByRecycleUser_Id(id, request);
    }

    public Page<RecycleItem> findLatest(int pageNumber, int pageSize) {

        Sort sort = new Sort(new Sort.Order(Sort.Direction.DESC, "createdDate"));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return recycleItemDAO.findAll(request);
    }


    public RecycleItem saveRecycleItem(RecycleItem recycleItem) throws UserNotFoundException, StorageNotFoundException, ItemTypeNotFoundException {
        if (recycleItem.getRecycleUser() == null) {
            throw new UserNotFoundException("recycleItem user not found");
        } else if (recycleItem.getStorage() == null) {
            throw new StorageNotFoundException("recycleItem storage not found");
        } else if (recycleItem.getItemType() == null) {
            throw new ItemTypeNotFoundException("recycleItem itemType not found");
        } else {
            return recycleItemDAO.save(recycleItem);
        }

    }

    // Admin

    public Page<RecycleItem> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.recycleItemDAO.findAll(request);
    }

    public void deleteById(long id) {
        this.recycleItemDAO.deleteById(id);
    }
}
