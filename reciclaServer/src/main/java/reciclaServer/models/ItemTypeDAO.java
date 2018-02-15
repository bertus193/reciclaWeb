package reciclaServer.models;

import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;


@Transactional
public interface ItemTypeDAO extends CrudRepository<ItemType, Long> {

    List<ItemType> findAll();
}
