package nl.hu.ipass.domain.model;

import junit.framework.TestCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class GebruikerTest extends TestCase {
    private Gebruiker gebruiker;
    private Gebruiker doppelganger;

    @BeforeEach
    public void initialize() {
        gebruiker = new Gebruiker("Alexander", "alexanderbenerink@email.com", "#Welkom01");
        doppelganger = new Gebruiker("Alexander", "alexanderbenerink@email.com", "#Welkom01");
    }

    /*
    * Duplicaten mogen niet voorkomen binnen het systeem.
    * Check op de uniekheid van een gebruiker door te kijken of doppelganger aangemaakt mag worden.
    */
    @Test
    public void checkUniekheidGebruiker() {
        assertEquals(1, Gebruiker.getAlleGebruikers().size());
    }
}