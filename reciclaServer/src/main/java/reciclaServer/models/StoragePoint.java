package reciclaServer.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import reciclaServer.config.EntityIdResolver;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "storage_point")
@JsonIdentityInfo(              //Bidirectional relationships with Jackson
        generator = ObjectIdGenerators.PropertyGenerator.class,
        resolver = EntityIdResolver.class,
        scope = StoragePoint.class,
        property = "id")
public class StoragePoint {

    // An autogenerated id (unique for each user in the db)
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "storagePoint")
    private List<Storage> storages;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "position")
    private Position position;

    public StoragePoint(){ //Needed for JPA

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Storage> getStorages() {
        return storages;
    }

    public Position getPosition() {
        return position;
    }
}
