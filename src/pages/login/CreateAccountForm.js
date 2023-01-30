import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { useValidateImage } from "../../hooks/useValidateImage";
import { AvatarImagesSelector } from "./AvatarImagesSelector";
import useSignUp from "../../hooks/api/useSignUp";
import { toast } from "react-toastify";
export function CreateAccountForm() {
  const [userImage, setUserImage] = useState("");
  const { signUp } = useSignUp();
  const validateImage = useValidateImage;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    otherPassword: "",
    image: userImage,
  });
  const [errorAlert, setErrorAlert] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  useEffect(() => {
    setUserData({ ...userData, image: userImage });
  }, [userImage]);

  useEffect(() => {
    verifyData(userData);

    //check url image
    if (userData.image.length > 0) {
      const promise = validateImage(userData.image);
      promise.then((res) => {
        if (res) setErrorAlert({ ...errorAlert, image: "" });
        if (!res)
          setErrorAlert({
            ...errorAlert,
            image: "The image url must be valid",
          });
      });
    }
  }, [userData]);
  return (
    <form>
      <InputWrappler>
        <label>Name</label>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleForm}
        />
        <p>{errorAlert.name}</p>
      </InputWrappler>
      <InputWrappler>
        <label>Email</label>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={handleForm}
        />
        <p>{errorAlert.email}</p>
      </InputWrappler>
      <InputWrappler>
        <label>Password</label>
        <input
          type='text'
          name='password'
          placeholder='Password'
          onChange={handleForm}
        />
        <p>{errorAlert.password}</p>
      </InputWrappler>
      <InputWrappler>
        <label>Password</label>
        <input
          type='text'
          name='otherPassword'
          placeholder='Password'
          onChange={handleForm}
        />
        <p>{errorAlert.password}</p>
      </InputWrappler>
      <InputWrappler>
        <label>User image</label>
        <AvatarImagesSelector userImage={userImage} setUserImage={setUserImage}>
          <input
            type='text'
            name='image'
            onChange={(e) => {
              setUserImage(e.target.value);
            }}
            value={userImage}
            placeholder='It can be an image URL from the web or one of the avatars below'
          />
        </AvatarImagesSelector>
        <p>{errorAlert.image}</p>
      </InputWrappler>
      <ButtonContainer>
        <Button
          text={"Create Account"}
          height={"60px"}
          width={"180px"}
          onClick={createAccount}
        />
      </ButtonContainer>
    </form>
  );

  function handleForm(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [inputName]: value });
    if (userData.name.length < 3) {
      setErrorAlert({
        ...errorAlert,
        name: "Name must have more than 3 letters.",
      });
    }
  }
  function createAccount(event) {
    event.preventDefault();
    verifyData(userData);
    const errorsMessages = Object.values(errorAlert).filter(
      (message) => message.length > 0
    );
    const hasError = errorsMessages.length > 0 ? true : false;
    if (!hasError) {
      const promise = signUp(userData.name, userData.email, userData.password, userData.image);
      promise
      .then(()=> {
        toast.success("Your account was created!", {
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
          })
      })
      .catch(()=>{
        toast.error("Something went wrong, please try again later.", {
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
          })
      })
    }
    
  }

  function verifyData(data) {
    const error = {
      name: "",
      email: "",
      password: "",
    };
    //verify name
    if (data.name.length > 0 && data.name.length <= 2) {
      error.name = "Name must have more than two letters.";
    } else {
      error.name = "";
    }
    //verify email
    if (
      data.email.length > 0 &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      error.email = "Email must be valid.";
    } else {
      error.email = "";
    }
    //verify password
    if (
      data.otherPassword.length > 0 &&
      (data.password.length < 6 || data.password !== data.otherPassword)
    ) {
      if (data.password !== data.otherPassword)
        error.password = "Passwords need to be the same.";
      if (data.password.length < 6)
        error.password = "Passwords must be at least six characters long.";
    } else {
      error.password = "";
    }

    setErrorAlert({ ...errorAlert, ...error });
  }
}

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const InputWrappler = styled.div`
  min-height: 96px;
  display: flex;
  flex-direction: column;
  &:nth-child(5) {
    height: 180px;
  }
`;
