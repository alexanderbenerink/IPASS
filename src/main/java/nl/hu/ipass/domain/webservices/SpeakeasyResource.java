package nl.hu.ipass.domain.webservices;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

@Path("codeword")
public class SpeakeasyResource {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response enterHomePage(String jsonBody) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = objectMapper.readValue(jsonBody, new TypeReference<Map<String, String>>() {});

        // TODO: add persistence to passphrase so it can be changed by the admin later
        if (map.get("codeword").equals("Welkom01")) {
            return Response.ok().build();
        }

        return Response.status(Response.Status.CONFLICT).build();
    }
}
