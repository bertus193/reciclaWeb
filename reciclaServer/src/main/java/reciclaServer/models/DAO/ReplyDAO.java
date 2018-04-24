package reciclaServer.models.DAO;

import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Reply;

public interface ReplyDAO extends CrudRepository<Reply, Long> {

    Reply save(Reply reply);

    Reply findFirstById(long id);
}
