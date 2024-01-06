import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

const validateEmail = (email) => {
  if (
    email.indexOf("@") < 1 ||
    email.indexOf(".") < 3 ||
    email.indexOf(".") === email.length - 1
  )
    return false;
  else return true;
};

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      !email.length ||
      username.length < 4 ||
      password.length < 6 ||
      !firstName.length ||
      !lastName.length ||
      confirmPassword.length < 6 ||
      !validateEmail(email)
    )
      setDisabled(true);
    else setDisabled(false);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-modal">
      <h2>Sign Up</h2>
      <p >(Fill in all fields)</p>

      {errors.server && <p className="sign-up-error">{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name </label>
        <input
          id="signup-first-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email@email.com"
        />

        {errors.email && <p className="sign-up-error">{errors.email}</p>}
        <label>Username </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Must be at least 4 characters"
        />

        {errors.username && <p className="sign-up-error">{errors.username}</p>}
        <label>Password </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Must be at least 6 characters"
        />

        {errors.password && <p className="sign-up-error">{errors.password}</p>}
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button
          id={
            disabled ? `sign-up-button-disabled` : "sign-up-button-not-disabled"
          }
          disabled={disabled}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
