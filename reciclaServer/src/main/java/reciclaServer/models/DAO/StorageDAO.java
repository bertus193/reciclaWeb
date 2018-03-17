package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.ItemType;
import reciclaServer.models.Storage;

import java.util.List;

public interface StorageDAO extends CrudRepository<Storage, Long> {
    List<Storage> findByItemType(ItemType itemType);
}
