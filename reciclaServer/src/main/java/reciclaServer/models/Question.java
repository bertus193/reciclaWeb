package reciclaServer.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import reciclaServer.config.EntityIdResolver;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "question")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        resolver = EntityIdResolver.class,
        scope = Question.class,
        property = "id")
public class Question {

    // An autogenerated id (unique for each user in the db)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private int questionValue;

    @OneToOne
    @JoinColumn(name = "correct_reply")
    private Reply correctReply;

    @OneToMany(mappedBy = "question")
    private List<Reply> replies;


    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "user_question",
            joinColumns = {@JoinColumn(name = "question")},
            inverseJoinColumns = {@JoinColumn(name = "user")}
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<User> users;


    public Question() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuestionValue() {
        return questionValue;
    }

    public void setQuestionValue(int questionValue) {
        this.questionValue = questionValue;
    }

    public Reply getCorrectReply() {
        return correctReply;
    }

    public void setCorrectReply(Reply correctReply) {
        this.correctReply = correctReply;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
