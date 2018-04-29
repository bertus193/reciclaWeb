package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Position;

import java.util.List;

public interface PositionDAO extends CrudRepository<Position, Long> {

    Position save(Position position);

    //Admin

    Page<Position> findAll(Pageable pageable);

    Position findById(long id);

    void deleteById(long id);
}

