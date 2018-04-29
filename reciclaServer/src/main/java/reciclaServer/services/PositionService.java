package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<Position> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.positionDAO.findAll(request);
    }

    public Position findById(long id) {
        return this.positionDAO.findById(id);
    }

    public void deleteById(long id) {
        this.positionDAO.deleteById(id);
    }
}
