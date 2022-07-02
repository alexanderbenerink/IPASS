package nl.hu.ipass.domain.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Verlanglijst {
    private String name;
    private Gebruiker owner;
    private static List<Verlanglijst> allWishLists = new ArrayList<>();
    private List<Product> wishlist;

    public Verlanglijst(String name, Gebruiker owner) {
        this.name = name;
        this.owner = owner;
        allWishLists.add(this);
        wishlist = new ArrayList<>();
    }

    public Product getProductById(int articlenumber) {
        for (Product product : wishlist) {
            if (product.getArtikelnummer() == articlenumber) {
                return product;
            }
        }
        return null;
    }

    public List<Product> getProductList() { return Collections.unmodifiableList(wishlist); }

    public void addProductToWishlist(Product p) {
        if (!wishlist.contains(p)) {
            wishlist.add(p);
        }
    }

    public String getName() { return name; }

    public Gebruiker getOwner() { return owner; }

    public static List<Verlanglijst> getAllWishLists() { return Collections.unmodifiableList(allWishLists); }

    public void removeProduct(Product product) {
        wishlist.remove(product);
    }

}
