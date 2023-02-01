import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { ButtonContainer, InputWrappler } from "./CreateAccountForm";
import styled from "styled-components";
import useSignIn from "../../hooks/api/useSignIn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
export function LoginAccountForm({ children }) {
  const { setUserData } = useContext(AuthContext);
  const [userInputData, setUserInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  return (
    <LoginFormWrappler>
      <form>
        <InputWrappler>
          <label>Email</label>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={handleForm}
          />
          <p></p>
        </InputWrappler>
        <InputWrappler>
          <label>Password</label>
          <input
            type='text'
            name='password'
            placeholder='Password'
            onChange={handleForm}
          />
          <p></p>
        </InputWrappler>
        <ButtonContainer>
          <Button
            text={"Login"}
            height={"60px"}
            width={"180px"}
            onClick={submitLogin}
          />
        </ButtonContainer>
      </form>
      <FederatedLoginsContainer>{children}</FederatedLoginsContainer>
    </LoginFormWrappler>
  );

  function handleForm(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    setUserInputData({ ...userInputData, [inputName]: value });
  }

  async function submitLogin(event) {
    event.preventDefault();
    try {
      const { token, name, image } = await signIn(
        userInputData.email,
        userInputData.password
      );
      toast.success("Welcome!", {
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      setUserData({ token, name, image });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong, please try again later.", {
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
    }
  }
}

const LoginFormWrappler = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FederatedLoginsContainer = styled.div`
  width: 100%;
`;
