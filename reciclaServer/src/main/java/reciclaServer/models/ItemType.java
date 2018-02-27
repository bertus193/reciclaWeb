package reciclaServer.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import reciclaServer.config.EntityIdResolver;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "item_type")
public class ItemType {

    // An autogenerated id (unique for each user in the db)
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING) //Fix: by default enums are persisted as int using oridinal
    private TypeRecycle type;

    @Column(name = "recycle_value")
    private int recycleValue;

    @OneToMany(mappedBy = "itemType")
    List<RecycleItem> recycleItems;

    @OneToMany(mappedBy = "itemType")
    List<Storage> storages;

    public ItemType(){

    }

    public TypeRecycle getType() {
        return type;
    }

    public int getRecycleValue() {
        return recycleValue;
    }

    public long getId() {
        return id;
    }
}
