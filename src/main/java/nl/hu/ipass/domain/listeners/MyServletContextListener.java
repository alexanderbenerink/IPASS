package nl.hu.ipass.domain.listeners;

import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.domain.model.Product;
import nl.hu.ipass.domain.persistence.PersistenceManager;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionListener;

@WebListener
public class MyServletContextListener implements ServletContextListener, HttpSessionListener, HttpSessionAttributeListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        /* code to create objects or invoke loading azure etc */
        PersistenceManager.loadUsersFromAzure();
        System.out.println(Gebruiker.getAlleGebruikers());

        Product.addProduct(1234, "Tattoo 1", "https://i.imgur.com/DlFgABJ.jpg", "Een cool product");
        Product.addProduct(5678, "Tattoo 2", "https://i.imgur.com/DlFgABJ.jpg","Een nog cooler product");
        Product.addProduct(4123, "Tattoo 3", "https://i.imgur.com/DlFgABJ.jpg", "Een ander product");
        Product.addProduct(4756, "Tattoo 4", "https://i.imgur.com/DlFgABJ.jpg", "Een heel ander product");
        Product.addProduct(1029, "Tattoo 5", "https://i.imgur.com/DlFgABJ.jpg", "Een goed verkocht product");
        Product.addProduct(3748, "Tattoo 6", "https://i.imgur.com/DlFgABJ.jpg", "Een beter verkocht product");

        // If the Thomas account exists, make it admin.
        Gebruiker opdrachtgever = Gebruiker.getUserByName("Thomas");
        if (opdrachtgever != null) {opdrachtgever.makeAdmin();}
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        /* code to dispose of loops and connections and/or to write to azure etc */
        PersistenceManager.saveUsersToAzure();
    }
}
