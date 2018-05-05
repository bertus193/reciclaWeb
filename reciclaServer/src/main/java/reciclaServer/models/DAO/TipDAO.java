package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Tip;

import java.util.List;

public interface TipDAO extends CrudRepository<Tip, Long> {

    List<Tip> findAll();

    // Admin

    Page<Tip> findAll(Pageable pageable);

    void deleteById(long id);

    Tip save(Tip tip);

    Tip findById(long id);
}
