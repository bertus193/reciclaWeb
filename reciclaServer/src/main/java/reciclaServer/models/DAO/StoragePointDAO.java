package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.StoragePoint;

public interface StoragePointDAO extends CrudRepository<StoragePoint, Long> {
}
