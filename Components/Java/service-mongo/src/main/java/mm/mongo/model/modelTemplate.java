package mm.mongo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Document
@Getter
@Setter
public class [NAME] implements Serializable {
    @Id
    private String id;

[FIELDS]
    public void copy([NAME] rhs) {
[ATTRIBUTES]
    }
}
