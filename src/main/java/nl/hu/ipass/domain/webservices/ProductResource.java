package nl.hu.ipass.domain.webservices;

import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.domain.model.Product;
import nl.hu.ipass.domain.model.Reservering;
import nl.hu.ipass.domain.model.Verlanglijst;
import nl.hu.ipass.domain.persistence.EncodedBase64;
import nl.hu.ipass.domain.persistence.PersistenceManager;
import nl.hu.ipass.domain.webservices.dto.ProductRequest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.*;
import java.util.AbstractMap.SimpleEntry;

@Path("product")
public class ProductResource {

    public static final String ERROR = "error";
    public static final String SUCCESS = "success";

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllProducts() {
        List<Map> list = new ArrayList<>();
        List<Product> products = Product.getAlleProducten();

        products.forEach(p -> {
            Map<String, String> product = new HashMap<>();
            product.put("Article_number", String.valueOf(p.getArtikelnummer()));
            product.put("Title", p.getTitel());
            product.put("Image", p.getFoto());
            product.put("Description", p.getBeschrijving());
            list.add(product);
        });

        return Response.ok(list).build();
    }

    //TODO: Post methode where admin can add products
    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response addProduct(@Context SecurityContext sc, ProductRequest request) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            Object articleNumber = request.article_number;

//            if (!articleNumber.getClass().getSimpleName().equals("Integer")) {
//                return Response.status(Response.Status.CONFLICT).build();
//            }

            Product existingProduct = Product.getProductByName(request.article_number);

            if (existingProduct != null) {
                return Response.status(Response.Status.CONFLICT).build();
            }

            Product.addProduct(request.article_number, request.title, request.image, request.description);
            Product added = Product.getProductByName(request.article_number);

            if (request.image != null || !request.image.isEmpty()) {
                EncodedBase64 base64 = new EncodedBase64(added.getFoto());
                String uploadId = PersistenceManager.saveUploadToAzure(base64);
                added.setFotoUploadId(uploadId);
            }

            return Response.ok().build();
        }

        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @GET
    @Path("{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getProduct(@PathParam("productId") int productId) {
        Product current = Product.getProductByName(productId);
        return Response.ok(current).build();
    }

    @DELETE
    @Path("remove/{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response removeProduct(@Context SecurityContext sc, @PathParam("productId") int productId) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            Product current = Product.getProductByName(productId);

            List<Verlanglijst> allWishlists = Verlanglijst.getAllWishLists();
            List<Reservering> allReservations = Reservering.getAllBookings();

            for (Verlanglijst wishlist : allWishlists) {
                if (wishlist.getProductList().contains(current)) {
                    wishlist.removeProduct(current);
                }
            }

            for (Reservering reservation : allReservations) {
                if (reservation.getProductList().contains(current)) {
                    reservation.removeProduct(current);
                }
            }

            Product.removeProduct(current);
            return Response.ok().build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("addtowishlist")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response addProductToWishlist(@Context SecurityContext sc, ProductRequest request) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            if (Product.getProductByName(request.article_number) != null) {
                Gebruiker current = Gebruiker.getUserByName(sc.getUserPrincipal().getName());
                Product product = Product.getProductByName(request.article_number);
                Verlanglijst wishlist = Verlanglijst.getAllWishLists().stream().filter(e->e.getOwner().equals(sc.getUserPrincipal())).findFirst().orElse(null);
                if (wishlist == null) {
                    Verlanglijst vl = new Verlanglijst("wishlist", current);
                    vl.addProductToWishlist(product);
                    return Response.ok(new AbstractMap.SimpleEntry<>(SUCCESS, "Product has been added to your wishlist!")).build();
                } else if (wishlist.getProductList().contains(product)) {
                    wishlist.removeProduct(product);
                    return Response.ok(new SimpleEntry<>(SUCCESS, "Product has been removed from your wishlist!")).build();
                }
                wishlist.addProductToWishlist(product);
                return Response.ok(new SimpleEntry<>(SUCCESS, "Product has been added to your wishlist!")).build();
            }
            return Response.status(Response.Status.CONFLICT).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("wishlist")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response getWishlist(@Context SecurityContext sc, ProductRequest request) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            System.out.println(Verlanglijst.getAllWishLists());
            Gebruiker currentUser = Gebruiker.getUserByName(sc.getUserPrincipal().getName());
            Verlanglijst wishlist = Verlanglijst.getAllWishLists().stream().filter(e->e.getOwner().equals(currentUser)).findFirst().orElse(null);
            if (wishlist != null) {
                return Response.ok(wishlist.getProductList()).build();
            }
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("wishlist/{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public Response getProductFromWishlist(@Context SecurityContext sc, @PathParam("productId") int productId) {
        if (sc.getUserPrincipal() instanceof Gebruiker) {
            Gebruiker currentUser = Gebruiker.getUserByName(sc.getUserPrincipal().getName());
            Verlanglijst wishlist = Verlanglijst.getAllWishLists().stream().filter(e->e.getOwner().equals(currentUser)).findFirst().orElse(null);
            if (wishlist != null && wishlist.getProductById(productId) != null) {
                return Response.ok(wishlist.getProductById(productId)).entity(new SimpleEntry<>(SUCCESS, "This product is in your wishlist")).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity(new SimpleEntry<>(ERROR, "Product not in wishlist")).build();
            }
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
