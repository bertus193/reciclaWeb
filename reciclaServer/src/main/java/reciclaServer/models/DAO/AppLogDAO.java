package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.AppLog;

import javax.transaction.Transactional;

@Transactional
public interface AppLogDAO extends CrudRepository<AppLog, Long> {

    AppLog save(AppLog log);
}