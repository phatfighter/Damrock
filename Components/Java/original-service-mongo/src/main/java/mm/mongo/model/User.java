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
public class User implements Serializable {
    @Id
    private String id;

    @Field("Name")
    private String name;

    @Field("Email")
    private String email;

    @Field("Id")
    private String userId;

    public void copy(User rhs) {
        this.userId = rhs.userId;
        this.name = rhs.name;
        this.email = rhs.email;
    }
}
