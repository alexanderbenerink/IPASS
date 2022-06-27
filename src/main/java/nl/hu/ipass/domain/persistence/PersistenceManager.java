package nl.hu.ipass.domain.persistence;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import nl.hu.ipass.domain.model.Gebruiker;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.List;

public class PersistenceManager {
    private final static String ENDPOINT = "https://ab2001propedeuse.blob.core.windows.net";
    private final static String SASTOKEN = "?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2023-06-27T02:21:37Z&st=2022-06-26T18:21:37Z&spr=https&sig=UdGxBty9GWzjGyhZQcJb2sJmTOgKYRw3lqUPIPh%2B5AY%3D";
    private final static String CONTAINER = "ipasscontainer";

    private static BlobContainerClient blobContainerClient = new BlobContainerClientBuilder()
            .endpoint(ENDPOINT)
            .sasToken(SASTOKEN)
            .containerName(CONTAINER)
            .buildClient();

    public static void loadUsersFromAzure() {
        // Maak verbinding
        // Ga bytes schuiven
        // Plaats users in Gebruiker klasse
        try {
            if (blobContainerClient.exists()) {
                BlobClient blob = blobContainerClient.getBlobClient("users");

                if (blob.exists()) {
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    blob.download(baos);

                    ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
                    ObjectInputStream ois = new ObjectInputStream(bais);

                    List<Gebruiker> loadedUsers = (List<Gebruiker>) ois.readObject();

                    for (Gebruiker user : loadedUsers) {
                        Gebruiker.addUser(user.getName(), user.getEmail(), user.getWachtwoord());
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void saveUsersToAzure() {
        // Haal de gebruikers op
        // Connect
        // Stream
        try {
            if (!blobContainerClient.exists()) {
                blobContainerClient.create();
            }

            BlobClient blob = blobContainerClient.getBlobClient("users");
            List<Gebruiker> usersToSave = Gebruiker.getAlleGebruikers();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(usersToSave);

            byte[] bytez = baos.toByteArray();

            ByteArrayInputStream bais = new ByteArrayInputStream(bytez);
            blob.upload(bais, bytez.length, true);

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}
