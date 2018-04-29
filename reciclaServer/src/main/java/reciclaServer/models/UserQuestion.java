package reciclaServer.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import reciclaServer.config.EntityIdResolver;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "user_question")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        resolver = EntityIdResolver.class,
        scope = UserQuestion.class,
        property = "id")
public class UserQuestion {

    // An autogenerated id (unique for each user in the db)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "\"user\"")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "question")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Question question;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_reply")
    private Reply userReply;

    private Timestamp createdDate;


    public UserQuestion() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }
}
