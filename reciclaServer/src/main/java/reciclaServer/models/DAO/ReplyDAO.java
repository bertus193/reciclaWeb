package reciclaServer.models.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import reciclaServer.models.Reply;

public interface ReplyDAO extends CrudRepository<Reply, Long> {

    Reply save(Reply reply);

    Reply findById(long id);

    // Admin

    Page<Reply> findAll(Pageable pageable);

    void deleteById(long id);
}
