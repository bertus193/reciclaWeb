package reciclaServer.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import reciclaServer.models.User;
import reciclaServer.services.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AppInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {


        String token = request.getParameter("token");


        if (token != null && !token.isEmpty()) {

            User user = userService.findByAccessToken(token);

            if (user != null) {
                request.setAttribute("userId", user.getId());
                return true;
            }
        }
        response.setStatus(401);
        return false;
    }


}