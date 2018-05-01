package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.ItemTypeDAO;
import reciclaServer.models.ItemType;

import java.util.List;

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

    public List<ItemType> findAllOrderByIdAsc(){
        return this.itemTypeDAO.findAllByOrderByIdAsc();
    }

    // Admin

    public Page<ItemType> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.itemTypeDAO.findAll(request);
    }

    public ItemType findById(long id) {
        return this.itemTypeDAO.findById(id);
    }

    public ItemType saveItemType(ItemType itemType) {
        return itemTypeDAO.save(itemType);
    }

    public void deleteById(long id) {
        this.itemTypeDAO.deleteById(id);
    }

}
