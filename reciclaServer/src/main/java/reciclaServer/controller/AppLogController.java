package reciclaServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import reciclaServer.models.AppLog;
import reciclaServer.services.AppLogService;

@RestController
@CrossOrigin(origins = "*")
@ControllerAdvice
public class AppLogController {


    private AppLogService appLogService;

    @Autowired
    public AppLogController(
            AppLogService appLogService) {
        this.appLogService = appLogService;
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> handleException(
            Exception ex, WebRequest request) {

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        String path = request.getDescription(false).replace("uri=", "");
        if (path.contains(";")) {
            path = path.substring(path.indexOf(";"));
        }

        AppLog appLog = new AppLog(status, ex.getClass().getName(), ex.getMessage(), path);
        appLog = this.appLogService.saveAppLog(appLog);

        return new ResponseEntity<>(appLog, status);
    }


    @RequestMapping(value = "/appLogs", method = RequestMethod.POST)
    public ResponseEntity<?> createAppLog(@RequestBody AppLog appLog) {
        if (appLog.getMessage() != null) {
            appLogService.saveAppLog(appLog);
            return new ResponseEntity<>(appLog, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/time", method = RequestMethod.GET)
    public ResponseEntity<?> getTimestamp() {
        return new ResponseEntity<>(new java.util.Date(), HttpStatus.OK);
    }
}
