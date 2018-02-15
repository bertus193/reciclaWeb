package reciclaServer.models;

import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface RecycleItemDAO extends CrudRepository<RecycleItem, Long>{

    List<RecycleItem> findAll();
}