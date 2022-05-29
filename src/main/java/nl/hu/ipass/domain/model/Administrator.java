package nl.hu.ipass.domain.model;

import java.util.Objects;

public class Administrator {
    private String gebruikersnaam;
    private String email;
    private String wachtwoord;

    public Administrator(String gb, String em, String ww) {
        this.gebruikersnaam = gb;
        this.email = em;
        this.wachtwoord = ww;
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
        Administrator admin = (Administrator) o;
        return gebruikersnaam.equals(admin.gebruikersnaam)
                && email.equals(admin.email)
                && wachtwoord.equals(admin.wachtwoord);
    }
}
