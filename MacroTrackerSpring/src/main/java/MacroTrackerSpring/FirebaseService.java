package MacroTrackerSpring;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

@Service
public class FirebaseService {

    private final Firestore db;

    public FirebaseService(FirebaseInitializer firebaseInitializer) {
        this.db = firebaseInitializer.getDatabase();
    }

    public void testFirestoreConnection() {
        // Create a new document with some example data
        Map<String, Object> docData = new HashMap<>();
        docData.put("name", "Test");
        docData.put("description", "This is a test document");

        // Add the document to the "tests" collection
        ApiFuture<WriteResult> future = db.collection("tests").document().set(docData);

        // Wait for the operation to complete and print the result
        try {
            System.out.println("Update time: " + future.get().getUpdateTime());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
