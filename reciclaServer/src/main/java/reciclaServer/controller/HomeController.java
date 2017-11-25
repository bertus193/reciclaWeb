package reciclaServer.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class HomeController {

    @RequestMapping("/")
    @ResponseBody
    String home() {
        return "Hello World!";
    }
}
