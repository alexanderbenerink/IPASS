package nl.hu.ipass.security;

import nl.hu.ipass.domain.model.Gebruiker;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.HashMap;
import java.util.Map;

@Path("authorization")
public class AuthorizationResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response isAuthorized(@Context SecurityContext sc) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            return Response.ok().build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @GET
    @Path("getuser")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response getUser(@Context SecurityContext sc) {
        Map<String, String> data = new HashMap<>();
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            Gebruiker current = (Gebruiker) sc.getUserPrincipal();
            data.put("username", current.getName());
            return Response.ok(data).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}