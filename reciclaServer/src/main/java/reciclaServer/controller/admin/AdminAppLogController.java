package reciclaServer.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reciclaServer.models.AppLog;
import reciclaServer.models.AppLog;
import reciclaServer.services.AppLogService;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "*")
public class AdminAppLogController {

    @Autowired
    private AppLogService appLogService;

    private HttpHeaders headers;

    @Autowired
    public AdminAppLogController() {

        this.headers = new HttpHeaders();
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Access-Control-Expose-Headers", "X-Total-Count");
    }

    @RequestMapping(value = "/admin/appLogs", method = RequestMethod.GET)
    public ResponseEntity<?> findAll(
            @RequestParam(value = "_start", defaultValue = "10") int _start, @RequestParam(value = "_end", defaultValue = "0") int _end,
            @RequestParam(value = "_sort", defaultValue = "id") String _sort, @RequestParam(value = "_order", defaultValue = "DESC") String direction) {


        Sort.Direction myDirection = Sort.Direction.DESC;
        if(direction.equals("ASC")){
            myDirection = Sort.Direction.ASC;
        }
        int myPage = (int)(Math.floor(_start / 10));
        Page<AppLog> appLogs = appLogService.findAll(myPage, 10, _sort, myDirection);

        this.headers.set("X-Total-Count", String.valueOf(appLogs.getTotalElements()));
        return new ResponseEntity<>(appLogs.getContent(), headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/admin/appLogs/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        AppLog appLog = appLogService.findById(Long.parseLong(id));

        return new ResponseEntity<>(appLog, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/appLogs", method = RequestMethod.POST)
    public ResponseEntity<?> createAppLog(@RequestBody AppLog appLog) throws NoSuchAlgorithmException {

        appLogService.saveAppLog(appLog);
        return new ResponseEntity<>(appLog, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/admin/appLogs/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateAppLog(@RequestBody AppLog appLog, @PathVariable("id") String id) throws NoSuchAlgorithmException {
        AppLog appLogFound = appLogService.findById(Long.parseLong(id));

        if(appLogFound != null){
            appLogService.saveAppLog(appLog);
        }

        return new ResponseEntity<>(appLog, HttpStatus.OK);
    }

    @RequestMapping(value = "/admin/appLogs/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAppLog(@PathVariable("id") String id) {
        AppLog appLogFound = appLogService.findById(Long.parseLong(id));

        if(appLogFound != null){
            appLogService.deleteById(Long.parseLong(id));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
