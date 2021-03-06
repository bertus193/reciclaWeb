package reciclaServer.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import reciclaServer.config.EntityIdResolver;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "storage")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        resolver = EntityIdResolver.class,
        scope = Storage.class,
        property = "id")
public class Storage {

    // An autogenerated id (unique for each user in the db)
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(mappedBy = "storage")
    private List<RecycleItem> recycledItems;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "item_type")
    private ItemType itemType;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "storage_point")
    private StoragePoint storagePoint;

    public Storage(){ //Needed for JPA

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public StoragePoint getStoragePoint() {
        return storagePoint;
    }
}
