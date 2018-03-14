package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.PositionDAO;
import reciclaServer.models.Position;

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
}
