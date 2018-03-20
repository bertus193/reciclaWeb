package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.ItemTypeName;

import javax.transaction.Transactional;

@Transactional
public interface ItemTypeNameDAO extends CrudRepository<ItemTypeName, Long>{

    ItemTypeName findFirstByDescription(String name);
}