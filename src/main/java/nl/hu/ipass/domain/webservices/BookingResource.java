package nl.hu.ipass.domain.webservices;

import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.domain.model.Product;
import nl.hu.ipass.domain.model.Reservering;
import nl.hu.ipass.domain.model.Verlanglijst;
import nl.hu.ipass.domain.webservices.dto.ProductRequest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.AbstractMap;

@Path("book")
public class BookingResource {

    public static final String ERROR = "error";
    public static final String SUCCESS = "success";

    @POST
    @Path("allbookings")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response getAllBookings(@Context SecurityContext sc) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            return Response.ok(Reservering.getAllBookings()).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("bookproduct")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response bookProduct(@Context SecurityContext sc, ProductRequest request) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            if (Product.getProductByName(request.article_number) != null) {
                Gebruiker current = Gebruiker.getUserByName(sc.getUserPrincipal().getName());
                Product product = Product.getProductByName(request.article_number);
                Reservering booking = Reservering.getAllBookings().stream().filter(e->e.getOwner().equals(sc.getUserPrincipal())).findFirst().orElse(null);
                if (booking == null) {
                    Reservering rv = new Reservering(current);
                    rv.addProductToReservering(product);
                    return Response.ok(new AbstractMap.SimpleEntry<>(SUCCESS, "Booking has been made")).build();
                }
                if (booking.getProductList().contains(product)) {
                    booking.removeProduct(product);
                    return Response.ok(new AbstractMap.SimpleEntry<>(SUCCESS, "Booking has been cancelled")).build();
                }
                booking.addProductToReservering(product);
                return Response.ok(new AbstractMap.SimpleEntry<>(SUCCESS, "Booking has been made")).build();
            }
            return Response.status(Response.Status.CONFLICT).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user", "admin"})
    public Response getBooking(@Context SecurityContext sc, @PathParam("productId") int productId) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            Gebruiker currentUser = Gebruiker.getUserByName(sc.getUserPrincipal().getName());
            Reservering booking = Reservering.getAllBookings().stream().filter(e->e.getOwner().equals(currentUser)).findFirst().orElse(null);
            if (booking != null && booking.getProductById(productId) != null) {
                return Response.ok(booking.getProductById(productId)).entity(new AbstractMap.SimpleEntry<>(SUCCESS, "This product has already been booked")).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity(new AbstractMap.SimpleEntry<>(ERROR, "Product has not yet been booked")).build();
            }
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();

    }

    @POST
    @Path("user")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response getUserBookings(@Context SecurityContext sc, ProductRequest request) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            Gebruiker currentUser = Gebruiker.getUserByName(sc.getUserPrincipal().getName());
            Reservering booking = Reservering.getAllBookings().stream().filter(e->e.getOwner().equals(currentUser)).findFirst().orElse(null);
            if (booking != null) {
                return Response.ok(booking.getProductList()).build();
            }
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
