package mm.mongo.service;

import mm.mongo.model.User;
import mm.mongo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public User getUser(@PathVariable("id") String id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public User newUser(@RequestBody User user) {
        User savedUser = userRepository.insert(user);
        return savedUser;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
    public User updateUser(@RequestBody User user, @PathVariable("id") String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            return null;

        User currentUser = optionalUser.get();
        currentUser.copy(user);
        userRepository.save(currentUser);
        return currentUser;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        userRepository.deleteById(id);
    }
}
