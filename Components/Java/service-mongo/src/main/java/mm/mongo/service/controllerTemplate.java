package mm.mongo.service;

import mm.mongo.model.[NAME];
import mm.mongo.repository.[NAME]Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/[name]")
public class [NAME]Controller {

    @Autowired
    private [NAME]Repository [name]Repository;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
    public List<[NAME]> get[NAME]() {
        return [name]Repository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public [NAME] get[NAME](@PathVariable("id") String id) {
        Optional<[NAME]> optionalObj = [name]Repository.findById(id);
        return optionalObj.orElse(null);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public [NAME] new[NAME](@RequestBody [NAME] obj) {
        [NAME] savedObj = [name]Repository.insert(obj);
        return savedObj;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
    public [NAME] update[NAME](@RequestBody [NAME] obj, @PathVariable("id") String id) {
        Optional<[NAME]> optionalObj = [name]Repository.findById(id);
        if (optionalObj.isEmpty())
            return null;

        [NAME] currentObj = optionalObj.get();
        currentObj.copy(obj);
        [name]Repository.save(currentObj);
        return currentObj;
    }

    @DeleteMapping("/{id}")
    public void delete[NAME](@PathVariable("id") String id) {
        [name]Repository.deleteById(id);
    }
}
