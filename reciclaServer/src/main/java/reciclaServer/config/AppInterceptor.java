package reciclaServer.config;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import reciclaServer.models.User;
import reciclaServer.services.AppLogService;
import reciclaServer.services.UserService;
import reciclaServer.utils.JsonReader;

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
        String username = null;

        if (token != null && !token.isEmpty()) {

            if (token.equals("d458b311-71f3-4b62-93af-beff72e644e6")) {
                String adminToken = request.getHeader("x-admin-token");
                if (token != null && !token.isEmpty()) {
                    if (adminToken.equals("c772e65a-4afe-4d70-a61b-eeaabe93cc53")) {
                        return true;
                    }
                }
            }
            String userType = request.getHeader("user-type");


            if (userType != null && (userType.equals("Facebook") || userType.equals("Instagram"))) {
                request.setAttribute("token", token);


                if (userType.equals("Facebook")) {
                    JSONObject fbUser = JsonReader.readJsonFromUrl("https://graph.facebook.com/me/?access_token=" + token);
                    username = fbUser.getString("id");

                    user = this.userService.findByUsername(username);
                } else if (userType.equals("Instagram")) {
                    JSONObject instagramUser = JsonReader.readJsonFromUrl("https://api.instagram.com/v1/users/self/?access_token=" + token);
                    username = instagramUser.getJSONObject("data").getString("id");
                    user = this.userService.findByUsername(username);
                }


                if (user != null && user.isEnabled()) {
                    request.setAttribute("userId", user.getId());
                    return true;
                } else if (username != null) { //Create
                    return true;
                }
            }
            else {
                user = userService.findByAccessToken(token);
            }

            if (user != null && user.isEnabled()) {
                request.setAttribute("userId", user.getId());
                return true;
            }
        }
        response.setStatus(401);
        return false;
    }


}