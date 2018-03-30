package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.RecycleItem;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface RecycleItemDAO extends CrudRepository<RecycleItem, Long>{

    RecycleItem findFirstById(long id);
}