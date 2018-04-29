package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Position;

import java.util.List;

public interface PositionDAO extends CrudRepository<Position, Long> {

    Position save(Position position);

    //Admin

    List<Position> findAll();

    Position findById(long id);

    void deleteById(long id);
}

