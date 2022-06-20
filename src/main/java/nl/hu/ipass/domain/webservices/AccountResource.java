package nl.hu.ipass.domain.webservices;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import nl.hu.ipass.domain.model.Gebruiker;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("account")
public class AccountResource {

    @Path("create")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNewAccount(String jsonBody) throws JsonProcessingException {
        // Read and convert json values from incoming request to a usable format
        // TODO: Make this easier by creating a request class above with the same attributes as the json request
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = objectMapper.readValue(jsonBody, new TypeReference<>() {});

        String username = map.get("username");
        String email = map.get("email");
        String password = map.get("password");

        // Check if user already exists
        // TODO: Make this less messy!
        List<String> userExists = new ArrayList<>();

        Gebruiker.getAlleGebruikers().forEach(gebruiker -> {
            if (gebruiker.getGebruikersnaam().equals(username)) {
                userExists.add("yes");
            }
        });

        if (userExists.contains("yes")) {
            return Response.status(Response.Status.CONFLICT).build();
        }

        // Create new user and return a 200 response
        Gebruiker gebruiker = new Gebruiker(username, email, password);
        return Response.ok().build();
    }

    @Path("login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginToAccount(String jsonBody) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = objectMapper.readValue(jsonBody, new TypeReference<>() {});
//        Map<String, String> account = new HashMap<>();
        List<String> userExists = new ArrayList<>();

        String username = map.get("username");
        String password = map.get("password");

        Gebruiker.getAlleGebruikers().forEach(gebruiker -> {
            if (gebruiker.getGebruikersnaam().equals(username) && gebruiker.getWachtwoord().equals(password)) {
//                account.put("username", gebruiker.getGebruikersnaam());
//                account.put("password", gebruiker.getWachtwoord());
                userExists.add("yes");
            }
        });

        if (!userExists.contains("yes")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        return Response.ok().build();
    }
}
