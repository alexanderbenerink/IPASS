package nl.hu.ipass.setup;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("restservices")
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        packages("nl.hu.ipass.domain.webservices, nl.hu.ipass.domain.security");
        register(JacksonFeature.class);
        register(RolesAllowedDynamicFeature.class);
    }
}
