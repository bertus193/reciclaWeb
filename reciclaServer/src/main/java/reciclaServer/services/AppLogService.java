package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
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
}
