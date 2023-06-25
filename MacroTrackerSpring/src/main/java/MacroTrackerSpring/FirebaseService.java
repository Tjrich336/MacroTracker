package MacroTrackerSpring;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class FirebaseService {

    private final Firestore db;
    private final CollectionReference foodItemsCollection;

    public FirebaseService(FirebaseInitializer firebaseInitializer) {
        this.db = firebaseInitializer.getDatabase();
        this.foodItemsCollection = db.collection("FoodItems");
    }

    // Convert foods.json to obj
    public Map<String, FoodItem> jsonToObject() throws IOException {
        // Create Gson object
        Gson gson = new Gson();
        // Get Path to file "foods.json"
        ClassPathResource resource = new ClassPathResource("foods.json");
        // Read file
        ArrayList<FoodItem> foodItems = gson.fromJson(new InputStreamReader(resource.getInputStream()),
                new TypeToken<ArrayList<FoodItem>>() {
                }.getType());

        // Create a HashMap to store FoodItem object
        Map<String, FoodItem> foodItemMap = new HashMap<>();

        // Add the FoodItem objects to the HashMap
        for (FoodItem foodItem : foodItems) {
            foodItemMap.put(foodItem.getName(), foodItem);
        }
        return foodItemMap;
    }

    // upload FoodItem obj to firestore firebase
    public void addDataToFirestore(Map<String, FoodItem> foodItemsMap) {
        for (Map.Entry<String, FoodItem> entry : foodItemsMap.entrySet()) {
            try {
                if (entry.getKey() != null && !entry.getKey().isEmpty()) {
                    ApiFuture<WriteResult> future = db.collection("FoodItems").document(entry.getKey())
                            .set(entry.getValue());
                    System.out.println("Update time: " + future.get().getUpdateTime());
                } else {
                    System.out.println("Invalid key for entry: " + entry.getValue());
                }

            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }
    }

    public CollectionReference getFoodItemsCollection() {
        return foodItemsCollection;
    }
}
