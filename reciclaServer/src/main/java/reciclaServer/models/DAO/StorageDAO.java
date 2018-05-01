package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.ItemType;
import reciclaServer.models.Storage;

import java.util.List;

public interface StorageDAO extends CrudRepository<Storage, Long> {
    List<Storage> findByItemType(ItemType itemType);

    // Admin

    Page<Storage> findAll(Pageable pageable);

    Storage findById(long id);

    void deleteById(long id);

    Storage save(Storage storage);
}
