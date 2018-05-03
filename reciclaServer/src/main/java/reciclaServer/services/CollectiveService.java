package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.CollectiveDAO;
import reciclaServer.models.Collective;

import java.util.List;

@Service("typeCollectiveService")
public class CollectiveService {
    private final CollectiveDAO collectiveDAO;

    @Autowired
    public CollectiveService(CollectiveDAO collectiveDAO){
        this.collectiveDAO = collectiveDAO;
    }

    public Collective saveCollective(Collective collective) {
        return collectiveDAO.save(collective);
    }


    // Admin

    public Page<Collective> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.collectiveDAO.findAll(request);
    }

    public Collective findById(long id) {
        return this.collectiveDAO.findById(id);
    }

    public void deleteById(long id) {
        this.collectiveDAO.deleteById(id);
    }

    public List<Collective> getAllCollectives(){
        return this.collectiveDAO.findAll();
    }
}
