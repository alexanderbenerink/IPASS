package nl.hu.ipass.domain.webservices;

import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.domain.model.Product;
import nl.hu.ipass.domain.webservices.dto.ProductRequest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("product")
public class ProductResource {
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

            if (request.image == null) {
                request.image = "No preview available";
            }

            Product.addProduct(request.article_number, request.title, request.image, request.description);
            return Response.ok().build();
        }

        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
