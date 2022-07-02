package nl.hu.ipass.domain.persistence;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import nl.hu.ipass.domain.model.Gebruiker;
import nl.hu.ipass.domain.model.Product;
import nl.hu.ipass.domain.model.Verlanglijst;

import java.io.*;
import java.util.Base64;
import java.util.List;

public class PersistenceManager {
    private final static String ENDPOINT = "https://ab2001propedeuse.blob.core.windows.net";
    private final static String SASTOKEN = "?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2023-07-01T18:04:40Z&st=2022-07-01T10:04:40Z&spr=https&sig=kMmcbTSzrYhgG7tX6UvZfSmr61EZ5JBeVSnLO9zHJg8%3D";
    private final static String CONTAINER = "ipasscontainer";

    private static BlobContainerClient blobContainerClient = new BlobContainerClientBuilder()
            .endpoint(ENDPOINT)
            .sasToken(SASTOKEN)
            .containerName(CONTAINER)
            .buildClient();

    // Save to and load users from Azure

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

    // Save to and load products from Azure

    public static void loadProductsFromAzure() {
        // Maak verbinding
        // Ga bytes schuiven
        // Plaats producten in Product klasse
        try {
            if (blobContainerClient.exists()) {
                BlobClient blob = blobContainerClient.getBlobClient("products");

                if (blob.exists()) {
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    blob.download(baos);

                    ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
                    ObjectInputStream ois = new ObjectInputStream(bais);

                    List<Product> loadedProducts = (List<Product>) ois.readObject();

                    for (Product product : loadedProducts) {
                        Product.addProduct(product.getArtikelnummer(), product.getTitel(), product.getFoto(), product.getBeschrijving());
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void saveProductsToAzure() {
        // Haal de producten op
        // Connect
        // Stream
        try {
            if (!blobContainerClient.exists()) {
                blobContainerClient.create();
            }

            BlobClient blob = blobContainerClient.getBlobClient("products");
            List<Product> productsToSave = Product.getAlleProducten();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(productsToSave);

            byte[] bytez = baos.toByteArray();

            ByteArrayInputStream bais = new ByteArrayInputStream(bytez);
            blob.upload(bais, bytez.length, true);

        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    // Base64 Images to and from Azure

    public static EncodedBase64 loadEncodedUploadFromAzure(String uploadId) {
        if (!blobContainerClient.exists())
            throw new IllegalStateException("Container does not exist!");

        BlobClient blob = blobContainerClient.getBlobClient(uploadId);

        if (!blob.exists())
            throw new IllegalStateException("Blob does not exist!");

        byte[] bytez = null;
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            blob.download(baos);
            bytez = baos.toByteArray();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }

        return new EncodedBase64(new String(bytez));
    }

    public static DecodedBase64 loadDecodedUploadFromAzure(String uploadId) {
        String base64str = loadEncodedUploadFromAzure(uploadId).getBase64str();

        int prefixEndIndex = base64str.indexOf(";base64");
        String mime = base64str.substring(5, prefixEndIndex);
        byte[] bytez = Base64.getDecoder().decode(base64str.substring(prefixEndIndex + 8));

        return new DecodedBase64(bytez, mime);
    }

    public static String saveUploadToAzure(EncodedBase64 upload) {
        if (!blobContainerClient.exists()) {
            blobContainerClient.create();
        }

        String base64str = upload.getBase64str();

        long[] idParts = { System.currentTimeMillis(), Math.abs(base64str.hashCode()) };
        String uniqueId = String.valueOf(idParts[0]).concat(String.valueOf(idParts[1]));

        BlobClient blob = blobContainerClient.getBlobClient(uniqueId);

        byte[] bytez = base64str.getBytes();

        try (ByteArrayInputStream bais = new ByteArrayInputStream(bytez)) {
            blob.upload(bais, bytez.length, true);
            return uniqueId;
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }

        return null;
    }

    // Save to and load wishlist(s) from Azure

    public static void loadWishlistsFromAzure() {
        // Maak verbinding
        // Ga bytes schuiven
        // Plaats wishlists in Verlanglijst klasse
        try {
            if (blobContainerClient.exists()) {
                BlobClient blob = blobContainerClient.getBlobClient("wishlists");

                if (blob.exists()) {
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    blob.download(baos);

                    ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
                    ObjectInputStream ois = new ObjectInputStream(bais);

                    List<Verlanglijst> allWishLists = (List<Verlanglijst>) ois.readObject();

                    for (Verlanglijst wishlist : allWishLists) {
                        Verlanglijst vl = new Verlanglijst("wishlist", wishlist.getOwner());

                        for (Product product : wishlist.getProductList()) {
                            vl.addProductToWishlist(product);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void saveWishlistsToAzure() {
        // Haal de wishlists op
        // Connect
        // Stream
        try {
            if (!blobContainerClient.exists()) {
                blobContainerClient.create();
            }

            BlobClient blob = blobContainerClient.getBlobClient("wishlists");
            List<Verlanglijst> wishlistsToSave = Verlanglijst.getAllWishLists();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(wishlistsToSave);

            byte[] bytez = baos.toByteArray();

            ByteArrayInputStream bais = new ByteArrayInputStream(bytez);
            blob.upload(bais, bytez.length, true);

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}
