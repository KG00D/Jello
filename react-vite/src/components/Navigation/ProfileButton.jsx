import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogin, thunkLogout, thunkSignup } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu, true);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };


  const demoUser = async () => {

    const demoUser = {
      email: 'demo@demo.io',
      password: 'password'
    }
    const serverResponse = await dispatch(
      thunkLogin(demoUser)
    );

    if (serverResponse) {
      dispatch(thunkSignup({
        email: "demo@demo.io",
        username: "demouser",
        password: "password",
        first_name: "demo",
        last_name: "user",
      }))
    } else {
      navigate("/session/boards");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <button className="profile-logged-in" onClick={toggleMenu}>
            {user.first_name[0] + user.last_name[0]}
          </button>
        </>
      ) : (
        <>
          <button className="login-button" onClick={toggleMenu}>
            Sign in
          </button>
        </>
      )}

      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <h4>Account</h4>
              <li>{`${user.username} ${user.last_name[0]}`}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <div className="login-signup">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <p onClick={demoUser} id='demo-login'>Demo Login</p>
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
