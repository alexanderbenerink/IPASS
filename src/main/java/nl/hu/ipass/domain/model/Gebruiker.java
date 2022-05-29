package nl.hu.ipass.domain.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Gebruiker {
    private String gebruikersnaam;
    private String email;
    private String wachtwoord;
    private static List<Gebruiker> alleGebruikers = new ArrayList<>();

    public Gebruiker(String gb, String em, String ww) {
        this.gebruikersnaam = gb;
        this.email = em;
        this.wachtwoord = ww;
        if (!getAlleGebruikers().contains(this)) getAlleGebruikers().add(this);
    }

    public static List<Gebruiker> getAlleGebruikers() {
        return alleGebruikers;
    }

    public String getGebruikersnaam() {
        return gebruikersnaam;
    }

    public void setGebruikersnaam(String gebruikersnaam) {
        this.gebruikersnaam = gebruikersnaam;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public void setWachtwoord(String wachtwoord) {
        this.wachtwoord = wachtwoord;
    }

    @Override
    public int hashCode() {
        return Objects.hash(gebruikersnaam);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Gebruiker gebruiker = (Gebruiker) o;
        return gebruikersnaam.equals(gebruiker.gebruikersnaam)
                && email.equals(gebruiker.email)
                && wachtwoord.equals(gebruiker.wachtwoord);
    }

    @Override
    public String toString() {
        return this.gebruikersnaam;
    }
}
