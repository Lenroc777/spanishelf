package com.lenroc.springbootlibrary.config;

import com.lenroc.springbootlibrary.entity.Book;
import com.lenroc.springbootlibrary.entity.Message;
import com.lenroc.springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigins = "https://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };
        config.exposeIdsFor(Book.class);
        disableHttpMethods(Book.class, config, theUnsupportedActions);

        config.exposeIdsFor(Review.class);
        disableHttpMethods(Review.class, config, theUnsupportedActions);

        config.exposeIdsFor(Message.class);
        disableHttpMethods(Message.class, config, theUnsupportedActions);

        /* Configure CORS mapping */
        cors.addMapping(config.getBasePath()+"/**")
                .allowedOrigins(theAllowedOrigins);

        /* Set base path */
        config.setBasePath("/api");
    }

    private void disableHttpMethods(Class<?> theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
