package io.github.apedrina.auth.model.error;

public class StudentBusinessException extends RuntimeException {

    public static final String AGE_NOT_ALLOWED = "The student should has more than 16 years old";
    public static final String NOT_UNIQUE_ADDRESS = "The address already exist in our DataBase";

    public StudentBusinessException() {

    }

    public StudentBusinessException(Throwable ex) {
        super(ex);

    }

    public StudentBusinessException(String ex) {
        super(ex);

    }


}
