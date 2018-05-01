package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.ItemTypeName;

import javax.transaction.Transactional;

@Transactional
public interface ItemTypeNameDAO extends CrudRepository<ItemTypeName, Long>{

    ItemTypeName findFirstByDescription(String name);

    // Admin

    Page<ItemTypeName> findAll(Pageable pageable);

    ItemTypeName findById(long id);

    void deleteById(long id);

    ItemTypeName save(ItemTypeName itemTypeName);
}