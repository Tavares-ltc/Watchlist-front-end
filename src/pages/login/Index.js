import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { Background } from "../../components/Background";
import { Modal } from "../../components/Modal";
import { WatchlistLogo } from "../../components/WatchlistLogo";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { CreateAccountForm } from "./CreateAccountForm";
import { useNavigate } from "react-router-dom";
export default function LoginPage({ action }) {
  const { userData, setUserData } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        let { displayName, photoURL } = user;

        if (!displayName) {
          displayName = user.email;
        }
        if (!photoURL) {
          photoURL =
            "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png";
        }
        setUserData({
          id: uid,
          image: photoURL,
          name: displayName,
        });
      }
    });
  });

  async function login() {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const { uid } = result.user;
      let { displayName, photoURL } = result.user;

      if (!displayName) {
        displayName = result.user.email;
      }
      if (!photoURL) {
        photoURL =
          "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png";
      }
      setUserData({
        id: uid,
        image: photoURL,
        name: displayName,
      });
    }
  }

    return (
      <>
        <Background>
          <Modal
            isVisible={true}
            height={"890px"}
            closeFunction={() => {
              navigate("/");
            }}
          >
            <FormWrappler>
              <WatchlistLogo size={"68px"} />
              <h2>
                <b>Two taps</b> on <b>any movie</b>, and it's <b>on your</b>{" "}
                <b>Watchlist!</b>
              </h2>
              <FormType type={action} navigate={navigate} />
            </FormWrappler>
          </Modal>
        </Background>
      </>
    );
}

function FormType({ type, navigate }) {
  if (type === "signup") {
    return (
      <>
        <CreateAccountForm />
        <h3 onClick={() => navigate("/login")}>
          Already have an account? Log in.
        </h3>
      </>
    );
  }
  if (type === "login") {
    return (
      <>
       
        <h3 onClick={() => navigate("/signup")}>
          Do not have an account yet? Try login through google or click here.
        </h3>
      </>
    );
  }
}

const FormWrappler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  h2 {
    color: white;
    b:first-of-type {
      color: #de0f62;
    }
    b:nth-of-type(2) {
      color: #fe6828;
    }
    b:nth-of-type(3) {
      color: #fe6828;
    }
    b:nth-of-type(4) {
      color: #de0f62;
    }
  }
  h3 {
    margin-top: 15px;
    text-decoration: underline;
    color: #de0f62;
    cursor: pointer;
  }
  form {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    label {
      font-size: 20px;
      color: #fe6828;
    }
    p {
      color: red;
      margin-bottom: 10px;
      margin-bottom: 15px;
    }
    input {
      width: 500px;
      height: 40px;
      border-radius: 10px;
      &:focus {
        outline-color: #de0f62;
      }
      font-size: 16px;
    }
    img {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }
  }
`;
