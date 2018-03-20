package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.ItemTypeName;
import reciclaServer.models.LabelAnnotations;
import reciclaServer.services.ItemTypeNameService;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class ItemTypeNameController {


    private ItemTypeNameService itemTypeNameService;

    @Autowired
    public ItemTypeNameController(
            ItemTypeNameService itemTypeNameService){
        this.itemTypeNameService = itemTypeNameService;
    }

    @RequestMapping(value = "/itemTypeName/labelAnnotations", method = RequestMethod.POST)
    public ResponseEntity<?> GetsRecycleItemItemTypeBylabelAnnotations(@RequestBody List<LabelAnnotations> labelAnnotations){
        ItemTypeName itemTypeName;
        LabelAnnotations labelAnnotation;

        for(int i = 0; i < labelAnnotations.size(); i++){
            labelAnnotation = labelAnnotations.get(i);
            System.out.println(labelAnnotation.getScore());
            if(labelAnnotation.getScore() > 0.5){
                itemTypeName = this.itemTypeNameService.findFirstByDescription(labelAnnotation.getDescription());

                if(itemTypeName != null){
                    return new ResponseEntity<>(itemTypeName.getItemType(), HttpStatus.OK);
                }
            }
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
