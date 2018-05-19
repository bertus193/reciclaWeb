package reciclaServer.models.auxiliar;

import reciclaServer.models.Question;
import reciclaServer.models.Reply;

public class LastQuestionDone {

    private Reply userReply;

    private long hours;

    private Question question;


    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Reply getUserReply() {
        return userReply;
    }

    public void setUserReply(Reply userReply) {
        this.userReply = userReply;
    }

    public long getHours() {
        return hours;
    }

    public void setHours(long hours) {
        this.hours = hours;
    }
}
