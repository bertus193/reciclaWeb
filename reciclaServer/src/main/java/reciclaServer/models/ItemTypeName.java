package reciclaServer.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import reciclaServer.config.EntityIdResolver;

import javax.persistence.*;

@Entity
@Table(name = "item_type_name")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        resolver = EntityIdResolver.class,
        scope = ItemTypeName.class,
        property = "id")
public class ItemTypeName {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private String description;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "item_type")
    private ItemType itemType;

    public ItemTypeName() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
    }
}
