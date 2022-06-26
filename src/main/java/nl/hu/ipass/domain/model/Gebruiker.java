package nl.hu.ipass.domain.model;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Gebruiker implements Principal {
    private String gebruikersnaam, email, wachtwoord, rol;
    private static List<Gebruiker> alleGebruikers = new ArrayList<>();

    public Gebruiker(String gb, String em, String ww) {
        this.gebruikersnaam = gb;
        this.email = em;
        this.wachtwoord = ww;
        this.rol = "user";
//        if (alleGebruikers.contains(this)) addUser(gb, em, ww);
    }

    public boolean makeAdmin() {
        this.rol = "admin";
        return true;
    }

    public static List<Gebruiker> getAlleGebruikers() { return Collections.unmodifiableList(alleGebruikers); }

    @Override
    public String getName() {
        return gebruikersnaam;
    }

    public static Gebruiker getUserByName(String username) {
        for (Gebruiker myUser : alleGebruikers) {
            if (myUser.gebruikersnaam.equals(username)) {
                return myUser;
            }
        }
        return null;
    }

    public static String validateLogin(String username, String password) {
        // Find user based on username
        // Verify password
        // Return the role
        Gebruiker found = Gebruiker.getUserByName(username);
        if (found != null && found.wachtwoord.equals(password)) {
            return found.rol;
        }
        return null;
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

    public String getRole() {
        return rol;
    }

    public static void addUser(String username, String email, String password) {
        Gebruiker toAdd = new Gebruiker(username, email, password);
        if (!alleGebruikers.contains(toAdd)) {
            alleGebruikers.add(toAdd);
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(gebruikersnaam, email, wachtwoord);
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
