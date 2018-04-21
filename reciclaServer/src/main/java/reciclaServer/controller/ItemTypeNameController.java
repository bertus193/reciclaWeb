package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.AppLog;
import reciclaServer.models.ItemTypeName;
import reciclaServer.models.LabelAnnotations;
import reciclaServer.services.AppLogService;
import reciclaServer.services.ItemTypeNameService;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class ItemTypeNameController {


    private ItemTypeNameService itemTypeNameService;
    private AppLogService appLogService;

    @Autowired
    public ItemTypeNameController(
            ItemTypeNameService itemTypeNameService,
            AppLogService appLogService) {
        this.itemTypeNameService = itemTypeNameService;
        this.appLogService = appLogService;
    }

    @RequestMapping(value = "/itemTypeName/labelAnnotations", method = RequestMethod.POST)
    public ResponseEntity<?> getRecycleItemItemTypeBylabelAnnotations(@RequestBody List<LabelAnnotations> labelAnnotations) {
        ItemTypeName itemTypeName;
        LabelAnnotations labelAnnotation;

        for (int i = 0; i < labelAnnotations.size(); i++) {
            labelAnnotation = labelAnnotations.get(i);
            if (labelAnnotation.getScore() > 0.5) {
                itemTypeName = this.itemTypeNameService.findFirstByDescription(labelAnnotation.getDescription());

                if (itemTypeName != null) {
                    return new ResponseEntity<>(itemTypeName, HttpStatus.OK);
                }
            }
        }

        HttpStatus status = HttpStatus.NOT_FOUND;
        AppLog appLog = new AppLog(status, "LabelAnnotation not found", labelAnnotations.toString(), "/itemTypeName/labelAnnotations");
        this.appLogService.saveAppLog(appLog);

        return new ResponseEntity<>(null, status);
    }
}
