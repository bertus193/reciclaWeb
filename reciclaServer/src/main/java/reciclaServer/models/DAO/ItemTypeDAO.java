package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.ItemType;

import javax.transaction.Transactional;
import java.util.List;


@Transactional
public interface ItemTypeDAO extends CrudRepository<ItemType, Long> {

    List<ItemType> findAllByOrderByIdAsc();

    ItemType getItemTypeById(long id);

    // Admin

    Page<ItemType> findAll(Pageable pageable);

    ItemType findById(long id);

    void deleteById(long id);

    ItemType save(ItemType itemType);
}
