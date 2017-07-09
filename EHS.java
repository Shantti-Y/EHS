
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class EHS extends Application {
   public static void main(String[] args) {
      launch(args);
   }

   @Override
   public void start(Stage stage) throws Exception {
      BorderPane root;
      root = (BorderPane)FXMLLoader.load(getClass().getResource("content.fxml"));
      Scene scene = new Scene(root);
      stage.setScene(scene);
      stage.show();
   }
}
