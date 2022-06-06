package nl.hu.ipass.domain.listeners;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        /* code to create objects or invoke loading azure etc */
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        /* code to dispose of loops and connections and/or to write to azure etc */
    }
}
