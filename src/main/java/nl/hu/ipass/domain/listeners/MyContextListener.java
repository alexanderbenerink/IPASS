package nl.hu.ipass.domain.listeners;

import nl.hu.ipass.domain.model.Product;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        /* code to create objects or invoke loading azure etc */
        Product product1 = new Product(1234, "Tattoo 1", "Een cool product", "https://i.imgur.com/DlFgABJ.jpg");
        Product product2 = new Product(5678, "Tattoo 2", "Een nog cooler product", "https://i.imgur.com/DlFgABJ.jpg");
        Product product3 = new Product(4123, "Tattoo 3", "Een ander product", "https://i.imgur.com/DlFgABJ.jpg");
        Product product4 = new Product(4756, "Tattoo 4", "Een heel ander product", "https://i.imgur.com/DlFgABJ.jpg");
        Product product5 = new Product(1029, "Tattoo 5", "Een goed verkocht product", "https://i.imgur.com/DlFgABJ.jpg");
        Product product6 = new Product(3748, "Tattoo 6", "Een beter verkocht product", "https://i.imgur.com/DlFgABJ.jpg");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        /* code to dispose of loops and connections and/or to write to azure etc */
    }
}
