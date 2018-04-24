package reciclaServer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class AppConfig extends WebMvcConfigurerAdapter {

    @Bean
    AppInterceptor appInterceptor() {
        return new AppInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(this.appInterceptor()).addPathPatterns(
                "/users/private/{id}/recycleItems",
                "/recycleItems/private",
                "/users/private/{id}",
                "/recycleItems/private/{id}",
                "/private/questions/user/{id}/random",
                "/private/userQuestions/{question_id}/user/{user_id}/reply/{reply_id}"
        );
    }
}
