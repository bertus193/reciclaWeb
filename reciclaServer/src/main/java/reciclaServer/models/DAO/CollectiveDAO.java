package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Collective;

import java.util.List;

public interface CollectiveDAO extends CrudRepository<Collective, Long> {

    List<Collective> findAllByOrderByIdAsc();

    Collective findByName(String name);

    // Admin

    Page<Collective> findAll(Pageable pageable);

    Collective findById(long id);

    void deleteById(long id);

    Collective save(Collective collective);


}

