package MacroTrackerSpring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

    @Bean
    public CommandLineRunner testFirebaseConnection(FirebaseService firebaseService) {
        return args -> {
            firebaseService.testFirestoreConnection();
        };
    }

}
