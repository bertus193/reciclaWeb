package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.PositionDAO;
import reciclaServer.models.Position;

import java.util.List;

@Service("positionService")
public class PositionService {
    private final PositionDAO positionDAO;

    @Autowired
    public PositionService(PositionDAO positionDAO){
        this.positionDAO = positionDAO;
    }

    public Position savePosition(Position position) {
        return positionDAO.save(position);
    }


    // Admin

    public List<Position> findAll() {
        return this.positionDAO.findAll();
    }

    public Position findById(long id) {
        return this.positionDAO.findById(id);
    }

    public void deleteById(long id) {
        this.positionDAO.deleteById(id);
    }
}
