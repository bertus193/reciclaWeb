package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Position;

public interface PositionDAO extends CrudRepository<Position, Long> {

    Position save(Position position);
}

