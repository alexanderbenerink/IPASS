package nl.hu.ipass.domain.webservices;

import nl.hu.ipass.domain.model.Product;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
}
