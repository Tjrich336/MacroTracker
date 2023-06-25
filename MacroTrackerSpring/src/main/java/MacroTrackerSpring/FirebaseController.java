package MacroTrackerSpring;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

@RestController
@RequestMapping("/fooditems")
public class FirebaseController {
    private final FirebaseService firebaseService;

    @Autowired
    public FirebaseController(FirebaseService firebaseService) {
        this.firebaseService = firebaseService;
    }

    @GetMapping("/addData")
    public void addData() {
        try {
            Map<String, FoodItem> foodItems = firebaseService.jsonToObject();
            firebaseService.addDataToFirestore(foodItems);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @GetMapping("/fooditemcatalog")
    public ArrayList<FoodItem> getAllFoodItems() {
        ArrayList<FoodItem> foodItems = new ArrayList<>();

        // Retrieve the food items from Firestore
        // Assuming you have a collection called "FoodItems"
        CollectionReference foodItemsCollection = firebaseService.getFoodItemsCollection();
        try {
            QuerySnapshot querySnapshot = foodItemsCollection.get().get();
            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                FoodItem foodItem = document.toObject(FoodItem.class);
                foodItems.add(foodItem);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return foodItems;
    }
}
