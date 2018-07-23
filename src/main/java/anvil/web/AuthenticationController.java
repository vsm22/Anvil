package anvil.web;

import anvil.security.auth.api.UserAuthenticationService;
import anvil.security.entities.user.crud.api.UserCrudService;
import anvil.security.entities.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class AuthenticationController {

    @NonNull
    UserAuthenticationService auth;

    @NonNull
    UserCrudService users;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    ResponseEntity<String> register(@RequestParam("username") final String username,
                  @RequestParam("email") final String email,
                  @RequestParam("password") final String password) {

        if (users.findByUsername(username).isPresent()) {
            return new ResponseEntity<String>("Username already exists", HttpStatus.CONFLICT);
        }

        User newUser = User.builder()
                        .username(username)
                        .email(email)
                        .password(passwordEncoder.encode(password))
                        .build();

        users.save(newUser);

        return new ResponseEntity<String>(login(username, password), HttpStatus.OK);
    }

    @PostMapping("/login")
    String login(@RequestParam("username") final String username,
                 @RequestParam("password") final String password) {

        return auth.login(username, password)
                    .orElseThrow(() -> new RuntimeException("Invalid login credentials"));

    }
}
