package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.TipDAO;
import reciclaServer.models.Tip;

import java.util.List;

@Service("tipService")
public class TipService {

    private final TipDAO tipDAO;

    @Autowired
    public TipService(TipDAO tipDAO) {
        this.tipDAO = tipDAO;
    }

    public List<Tip> findAll(){
        return this.tipDAO.findAll();
    }

    // Admin

    public Page<Tip> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.tipDAO.findAll(request);
    }

    public Tip saveTip(Tip tip) {
        return tipDAO.save(tip);
    }

    public void deleteById(long id) {
        this.tipDAO.deleteById(id);
    }

    public Tip findById(long id) {
        return this.tipDAO.findById(id);
    }
}
