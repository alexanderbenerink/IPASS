package nl.hu.ipass.domain.webservices;

import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.domain.webservices.dto.ChangePasswordRequest;
import nl.hu.ipass.domain.webservices.dto.RegistrationRequest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.HashMap;
import java.util.Map;

@Path("account")
public class AccountResource {

    @Path("create")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewAccount(RegistrationRequest registrationRequest) {
//        // Read and convert json values from incoming request to a usable format
//        // TODO: Make this easier by creating a request class above with the same attributes as the json request
//        ObjectMapper objectMapper = new ObjectMapper();
//        Map<String, String> map = objectMapper.readValue(jsonBody, new TypeReference<>() {});
//
//        String username = map.get("username");
//        String email = map.get("email");
//        String password = map.get("password");
//
//        // Check if user already exists
//        // TODO: Make this less messy!
//        List<String> userExists = new ArrayList<>();
//
//        Gebruiker.getAlleGebruikers().forEach(gebruiker -> {
//            if (gebruiker.getName().equals(username)) {
//                userExists.add("yes");
//            }
//        });
//
//        if (userExists.contains("yes")) {
//            return Response.status(Response.Status.CONFLICT).build();
//        }
//
//        // Create new user and return a 200 response
//        Gebruiker gebruiker = new Gebruiker(username, email, password);
//        return Response.ok().build();
        Gebruiker current = new Gebruiker(registrationRequest.username, registrationRequest.email, registrationRequest.password);
        Gebruiker existing = Gebruiker.getUserByName(current.getName());

        if (Gebruiker.getAlleGebruikers().contains(current) || existing != null) {
            return Response.status(Response.Status.CONFLICT).build();
        }

        Gebruiker.addUser(registrationRequest.username, registrationRequest.email, registrationRequest.password);
        System.out.println(Gebruiker.getAlleGebruikers());
        return Response.ok().build();
    }

//    @Path("login")
//    @POST
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response loginToAccount(String jsonBody) throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        Map<String, String> map = objectMapper.readValue(jsonBody, new TypeReference<>() {});
////        Map<String, String> account = new HashMap<>();
//        List<String> userExists = new ArrayList<>();
//
//        String username = map.get("username");
//        String password = map.get("password");
//
//        Gebruiker.getAlleGebruikers().forEach(gebruiker -> {
//            if (gebruiker.getName().equals(username) && gebruiker.getWachtwoord().equals(password)) {
////                account.put("username", gebruiker.getGebruikersnaam());
////                account.put("password", gebruiker.getWachtwoord());
//                userExists.add("yes");
//            }
//        });
//
//        if (!userExists.contains("yes")) {
//            return Response.status(Response.Status.UNAUTHORIZED).build();
//        }
//
//        return Response.ok().build();
//    }

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

    @PUT
    @Path("editpassword")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response editPassword(@Context SecurityContext sc, ChangePasswordRequest request) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            Gebruiker current = (Gebruiker) sc.getUserPrincipal();
            if (current.getWachtwoord().equals(request.oldpassword)) {
                current.setWachtwoord(request.newpassword);
                return Response.ok().build();
            }
            return Response.status(Response.Status.CONFLICT).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
