package nl.hu.ipass.domain.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Reservering implements Serializable {
    private Gebruiker owner;
//    private String datetime;
    private List<Product> reservering;
    private static List<Reservering> alleReserveringen = new ArrayList<>();

    public Reservering(Gebruiker owner) {
        this.owner = owner;
//        this.datetime = datetime;
        this.reservering = new ArrayList<>();
        alleReserveringen.add(this);
    }

    public Product getProductById(int articlenumber) {
        for (Product product : reservering) {
            if (product.getArtikelnummer() == articlenumber) {
                return product;
            }
        }
        return null;
    }

    public List<Product> getProductList() { return Collections.unmodifiableList(reservering); }

    public void addProductToReservering(Product p) {
        if (!reservering.contains(p)) {
            reservering.add(p);
        }
    }

    public Gebruiker getOwner() { return owner; }

//    public String getDatetime() { return datetime; }

    public static List<Reservering> getAllBookings() { return Collections.unmodifiableList(alleReserveringen); }

    public void removeProduct(Product product) {
        reservering.remove(product);
    }
}
