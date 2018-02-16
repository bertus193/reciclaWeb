package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.ItemType;

import javax.transaction.Transactional;
import java.util.List;


@Transactional
public interface ItemTypeDAO extends CrudRepository<ItemType, Long> {

    List<ItemType> findAll();
}
