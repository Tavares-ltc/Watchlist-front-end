import React, { useContext } from "react";
import styled from "styled-components";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import useSignUp from "../../hooks/api/useSignUp";
import useSignIn from "../../hooks/api/useSignIn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export function GoogleButton() {
  const { userData, setUserData } = useContext(AuthContext);
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const navigate = useNavigate()
  return (
    <>
      <ButtonWrappler onClick={login}>
        <ImgWrappler>
          <img
            src={
              "https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
            }
          />
        </ImgWrappler>
        <h1>Sign in with google</h1>
      </ButtonWrappler>
    </>
  );

  async function login() {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const { uid } = result.user;
      let { displayName, photoURL, email } = result.user;

      if (!displayName) {
        displayName = result.user.email;
      }
      if (!photoURL) {
        photoURL =
          "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png";
      }

      try {
        await signUp(displayName, email, uid, photoURL);
        const { token } = signIn(email, uid);

        setUserData({
          image: photoURL,
          name: displayName,
          token,
        });

        toast.success("Welcome!", {
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
        navigate("/")
      } catch (error) {
        if (error.response.status === 409) {
          const { token } = await signIn(email, uid);
          console.log(token);
          setUserData({
            image: photoURL,
            name: displayName,
            token,
          });
          toast.success("Welcome!", {
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
          navigate("/")
        } else {
          toast.error("Something went wrong, please try again later.", {
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
        }
      }
    }
  }
}

const ButtonWrappler = styled.div`
  width: 180px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000f17;
  outline: 3px solid white;
  margin-bottom: 50px;
  cursor: pointer;

  h1 {
    font-size: 15px;
    color: white;
    text-align: center;
  }
`;

const ImgWrappler = styled.div`
  height: 100%;
  width: 65px;
  display: flex;
  justify-content: center;
  background-color: white;
`;
