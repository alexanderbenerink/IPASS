package nl.hu.ipass.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.security.dto.LogonRequest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.security.Key;
import java.util.AbstractMap;
import java.util.Calendar;

@Path("authentication")
public class AuthenticationResource {
    // Generate key
    public final static Key key = MacProvider.generateKey();

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateUser(LogonRequest logonRequest) {
        System.out.println(Gebruiker.getAlleGebruikers());
        try {
            System.out.println("hi");
            //TODO: Add support for logging in with an e-mail
            String role = Gebruiker.validateLogin(logonRequest.username, logonRequest.password);
            if (role == null) {
                throw new IllegalArgumentException(("No user found"));
            }

            String token = createToken(logonRequest.username, role);
            return Response.ok(new AbstractMap.SimpleEntry<>("JWT", token)).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    private String createToken(String username, String role) {
        Calendar expiration = Calendar.getInstance();
        expiration.add(Calendar.MINUTE, 30);

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(expiration.getTime())
                .claim("role", role)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }
}