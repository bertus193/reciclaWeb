package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.AppLog;
import reciclaServer.models.ItemTypeName;
import reciclaServer.models.auxiliar.LabelAnnotations;
import reciclaServer.models.auxiliar.LabelAnnotationsWithImage;
import reciclaServer.services.AppLogService;
import reciclaServer.services.ItemTypeNameService;


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

    @RequestMapping(value = "/itemTypeNames/labelAnnotations", method = RequestMethod.POST)
    public ResponseEntity<?> getRecycleItemItemTypeBylabelAnnotations(@RequestBody LabelAnnotationsWithImage labelAnnotationsWithImage) {
        ItemTypeName itemTypeName;
        LabelAnnotations labelAnnotation;

        for (int i = 0; i < labelAnnotationsWithImage.labelAnnotations.size(); i++) {
            labelAnnotation = labelAnnotationsWithImage.labelAnnotations.get(i);
            if (labelAnnotation.getScore() > 0.5) {
                itemTypeName = this.itemTypeNameService.findFirstByDescription(labelAnnotation.getDescription());

                if (itemTypeName != null) {
                    return new ResponseEntity<>(itemTypeName, HttpStatus.OK);
                }
            }
        }

        HttpStatus status = HttpStatus.NOT_FOUND;
        AppLog appLog = new AppLog(status, "LabelAnnotation not found", labelAnnotationsWithImage.labelAnnotations.toString(), "/itemTypeName/labelAnnotations");
        appLog.setBase64Image(labelAnnotationsWithImage.base64Image);
        this.appLogService.saveAppLog(appLog);

        return new ResponseEntity<>(null, status);
    }
}
