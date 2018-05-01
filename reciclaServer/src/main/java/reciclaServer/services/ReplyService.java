package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reciclaServer.models.DAO.ReplyDAO;
import reciclaServer.models.Reply;

@Service("replyService")
public class ReplyService {

    private final ReplyDAO replyDAO;

    @Autowired
    public ReplyService(ReplyDAO replyDAO) {
        this.replyDAO = replyDAO;
    }


    public Reply findById(long id) {
        return this.replyDAO.findById(id);
    }

    // Admin

    public Page<Reply> findAll(int pageNumber, int pageSize, String sortByColumn, Sort.Direction direction) {
        Sort sort = new Sort(new Sort.Order(direction, sortByColumn));
        Pageable request = new PageRequest(pageNumber, pageSize, sort);

        return this.replyDAO.findAll(request);
    }

    public Reply saveReply(Reply reply) {
        return replyDAO.save(reply);
    }

    public void deleteById(long id) {
        this.replyDAO.deleteById(id);
    }
}
