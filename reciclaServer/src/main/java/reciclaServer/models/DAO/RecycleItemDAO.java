package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import reciclaServer.models.RecycleItem;

import javax.transaction.Transactional;

@Transactional
public interface RecycleItemDAO extends CrudRepository<RecycleItem, Long>, PagingAndSortingRepository<RecycleItem, Long> {

    RecycleItem findById(long id);

    Page<RecycleItem> findByRecycleUser_Id(long id, Pageable pageable);

    Page<RecycleItem> findAll(Pageable pageable);

    // Admin

    void deleteById(long id);

    RecycleItem save(RecycleItem recycleItem);
}