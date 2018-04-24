package reciclaServer.services;

import org.springframework.beans.factory.annotation.Autowired;
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


    public Reply findFirstById(long id) {
        return this.replyDAO.findFirstById(id);
    }


}
