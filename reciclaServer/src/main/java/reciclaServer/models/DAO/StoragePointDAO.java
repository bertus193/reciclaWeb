package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.StoragePoint;

public interface StoragePointDAO extends CrudRepository<StoragePoint, Long> {

    // Admin

    Page<StoragePoint> findAll(Pageable pageable);

    StoragePoint findById(long id);

    void deleteById(long id);

    StoragePoint save(StoragePoint storagePoint);
}
