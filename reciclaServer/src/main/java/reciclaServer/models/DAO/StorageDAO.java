package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Storage;

public interface StorageDAO extends CrudRepository<Storage, Long> {
}
