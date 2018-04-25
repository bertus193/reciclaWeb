package reciclaServer.config;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import reciclaServer.models.AppLog;
import reciclaServer.models.User;
import reciclaServer.services.AppLogService;
import reciclaServer.services.UserService;
import reciclaServer.utils.JsonReader;
import springfox.documentation.spring.web.json.Json;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AppInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    UserService userService;

    @Autowired
    AppLogService appLogService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        String token = request.getHeader("x-auth-token");
        User user = null;
        String email = null;

        if (token != null && !token.isEmpty()) {


            String userType = request.getHeader("user-type");

            if(userType != null){
                if(userType.equals("Facebook")){
                    JSONObject fbUser = JsonReader.readJsonFromUrl("https://graph.facebook.com/me/?access_token=" + token);
                    AppLog applog = new AppLog(HttpStatus.OK, userType, fbUser.toString(), "");
                    this.appLogService.saveAppLog(applog);
                    email = fbUser.getString("id");
                    user = this.userService.findByEmail(email);
                }
                else if(userType.equals("Instagram")){
                    JSONObject instagramUser = JsonReader.readJsonFromUrl("https://api.instagram.com/v1/users/self/?access_token=" + token);
                    AppLog applog = new AppLog(HttpStatus.OK, userType, instagramUser.toString(), "");
                    this.appLogService.saveAppLog(applog);
                    email = instagramUser.getJSONArray("data").getJSONObject(0).getString("id");
                    user = this.userService.findByEmail(email);
                }
                else if(userType.equals("Normal")){
                    user = userService.findByAccessToken(token);
                }
            }

            if (user != null) {
                request.setAttribute("userId", user.getId());
                return true;
            }
        }
        response.setStatus(401);
        return false;
    }


}