package reciclaServer.config;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import reciclaServer.models.AppLog;
import reciclaServer.models.EnumUser;
import reciclaServer.models.User;
import reciclaServer.services.AppLogService;
import reciclaServer.services.UserService;
import reciclaServer.utils.JsonReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Scanner;

public class AppInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    UserService userService;

    @Autowired
    AppLogService appLogService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        String token = request.getHeader("x-auth-token");
        User user = null;
        String username = null;

        if (token != null && !token.isEmpty()) {

            // Social login  - UserType -> findByUsername
            String userType = request.getHeader("user-type");
            if (userType != null && (userType.equals("Facebook") || userType.equals("Instagram"))) {
                request.setAttribute("token", token);

                try{
                    if (userType.equals("Facebook")) {
                        JSONObject fbUser = JsonReader.readJsonFromUrl("https://graph.facebook.com/me/?access_token=" + token);
                        username = fbUser.getString("id");

                        user = this.userService.findByUsername(username);
                    } else if (userType.equals("Instagram")) {
                        JSONObject instagramUser = JsonReader.readJsonFromUrl("https://api.instagram.com/v1/users/self/?access_token=" + token);
                        username = instagramUser.getJSONObject("data").getString("id");
                        user = this.userService.findByUsername(username);
                    }
                }catch (IOException ex){
                    // Server returned HTTP response code: 400
                    // user = null (Social user using normal login)
                }

                if (user != null && user.isEnabled()) {
                    request.setAttribute("userId", user.getId());
                    return true;
                } else if (username != null) { //Create
                    return true;
                }
            }

            // Rest private petitions
            if(user == null) {
                user = userService.findByAccessToken(token);
            }

            if (user != null && user.isEnabled()) {
                if(user.getType() == EnumUser.Admin){
                    String adminToken = request.getHeader("x-admin-token");
                    if (adminToken != null && adminToken.equals("c772e65a-4afe-4d70-a61b-eeaabe93cc53")) {
                        return true;
                    }
                }
                else{
                    request.setAttribute("userId", user.getId());
                    return true;
                }

            }
        }
        // Unauthorized

        AppLog appLog = new AppLog(HttpStatus.UNAUTHORIZED, "Unauthorized", this.extractPostRequestBody(request) ,request.getRequestURI());
        this.appLogService.saveAppLog(appLog);

        response.setStatus(401);
        return false;
    }

    static String extractPostRequestBody(HttpServletRequest request) throws IOException {
        if ("POST".equalsIgnoreCase(request.getMethod()) || "PUT".equalsIgnoreCase(request.getMethod())) {
            Scanner s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
            return s.hasNext() ? s.next() : "";
        }
        return "";
    }


}