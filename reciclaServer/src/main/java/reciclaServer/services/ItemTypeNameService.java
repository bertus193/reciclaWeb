package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    // Admin

    public Page<ItemTypeName> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.itemTypeNameDAO.findAll(request);
    }

    public ItemTypeName findById(long id) {
        return this.itemTypeNameDAO.findById(id);
    }

    public ItemTypeName saveItemTypeName(ItemTypeName itemTypeName) {
        return itemTypeNameDAO.save(itemTypeName);
    }

    public void deleteById(long id) {
        this.itemTypeNameDAO.deleteById(id);
    }
}
