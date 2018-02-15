package reciclaServer.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "recycle_items")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class RecycleItem {

    // An autogenerated id (unique for each user in the db)
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    private String image;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "storage")
    private Storage storage;

    @ManyToOne(cascade = CascadeType.ALL)
    @NotNull
    @JoinColumn(name = "item_type")
    private ItemType itemType;

    public RecycleItem(){ //Needed for JPA

    }

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }

    public String getImage() {
        return image;
    }

    public User getUser() {
        return user;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public Storage getStorage() {
        return storage;
    }
}
