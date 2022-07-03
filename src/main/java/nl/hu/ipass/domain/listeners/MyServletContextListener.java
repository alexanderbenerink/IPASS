package nl.hu.ipass.domain.listeners;

import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.domain.model.Product;
import nl.hu.ipass.domain.model.Verlanglijst;
import nl.hu.ipass.domain.persistence.PersistenceManager;
import reactor.core.scheduler.Schedulers;
import reactor.netty.http.HttpResources;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionListener;
import java.time.Duration;

@WebListener
public class MyServletContextListener implements ServletContextListener, HttpSessionListener, HttpSessionAttributeListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        /* code to create objects or invoke loading azure etc */
        PersistenceManager.loadUsersFromAzure();
        PersistenceManager.loadProductsFromAzure();
        PersistenceManager.loadWishlistsFromAzure();
        PersistenceManager.loadReservationsFromAzure();

        System.out.println(Gebruiker.getAlleGebruikers());

        // If the Thomas account exists, make it admin.
        Gebruiker opdrachtgever = Gebruiker.getUserByName("Thomas");
        if (opdrachtgever != null) {opdrachtgever.makeAdmin();}
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        /* code to dispose of loops and connections and/or to write to azure etc */
        PersistenceManager.saveUsersToAzure();
        PersistenceManager.saveProductsToAzure();
        PersistenceManager.saveWishlistsToAzure();
        PersistenceManager.saveReservationsToAzure();

        Schedulers.shutdownNow();
        HttpResources.disposeLoopsAndConnectionsLater(Duration.ZERO, Duration.ZERO).block();
    }
}
