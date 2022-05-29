package nl.hu.ipass.domain.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Product {
    private int artikelnummer;
    private String titel;
    private String beschrijving;
    private String foto;
    private static List<Product> alleProducten = new ArrayList<>();

    public Product(int an, String tt, String bs, String ft) {
        this.artikelnummer = an;
        this.titel = tt;
        this.beschrijving = bs;
        this.foto = ft;
        if (!alleProducten.contains(this)) alleProducten.add(this);
    }

    public int getArtikelnummer() {
        return artikelnummer;
    }

    public void setArtikelnummer(int artikelnummer) {
        this.artikelnummer = artikelnummer;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getBeschrijving() {
        return beschrijving;
    }

    public void setBeschrijving(String beschrijving) {
        this.beschrijving = beschrijving;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    @Override
    public int hashCode() {
        return Objects.hash(titel);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return artikelnummer == product.artikelnummer
                && titel.equals(product.titel)
                && beschrijving.equals(product.beschrijving)
                && foto.equals(product.foto);
    }
}
