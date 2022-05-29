package nl.hu.ipass.domain.model;

import java.util.ArrayList;
import java.util.List;

public class Verlanglijst {
    private int artikelnummer;
    private int aantal;
    private static List<Verlanglijst> alleBewaardeProducten = new ArrayList<>();

    public int getArtikelnummer() {
        return artikelnummer;
    }

    public int getAantal() {
        return aantal;
    }
}
