package reciclaServer.models.exceptions;

public class UserNotFoundException extends Exception {

    // Constructor that accepts a message
    public UserNotFoundException(String msg)
    {
        super(msg);
    }
}
