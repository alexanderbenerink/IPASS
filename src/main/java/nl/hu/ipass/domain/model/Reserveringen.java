package nl.hu.ipass.domain.model;

import java.util.ArrayList;
import java.util.List;

public class Reserveringen {
    private int artikelnummer;
    private int aantal;
    private static List<Reserveringen> alleReserveringen = new ArrayList<>();

    public int getArtikelnummer() {
        return artikelnummer;
    }

    public int getAantal() {
        return aantal;
    }
}
