package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.AppLog;
import reciclaServer.models.DAO.AppLogDAO;


@Service("appLogService")
public class AppLogService {

    private final AppLogDAO appLogDAO;

    @Autowired
    public AppLogService(AppLogDAO appLogDAO) {
        this.appLogDAO = appLogDAO;
    }

    public AppLog saveAppLog(AppLog appLog) {
        return appLogDAO.save(appLog);
    }

    // Admin

    public Page<AppLog> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.appLogDAO.findAll(request);
    }

    public AppLog findById(long id) {
        return this.appLogDAO.findById(id);
    }

    public void deleteById(long id) {
        this.appLogDAO.deleteById(id);
    }
}
