import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { WatchlistLogo } from "./WatchlistLogo";
import { Button } from "./Button";
import { AuthContext } from "../contexts/AuthContext";
import { CategoriesNavBar } from "./CategoriesNavBar";
import useWidth from "../hooks/useWidth";

export default function Header({ setIsAccountModalVisible }) {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(AuthContext);
  
  const [width] = useWidth();
  return (
    <>
      <HeaderWrappler>
        <WatchlistLogo />
        <CategoriesNavBar />
        <SearchBar>
          <input
            placeholder='Search...'
            onChange={searchMovie}
            onClick={(event) => (event.target.value = "")}
          />
          <IconWrappler>
            <BsSearch />
          </IconWrappler>
        </SearchBar>
        <ConfigBar>
          <RegionWrappler>
            <RegionIcon language={userData.language} width={width} switchFunction={switchLanguage}/>
          </RegionWrappler>
          <LoginButton
            userData={userData}
            navigate={navigate}
            setIsAccountModalVisible={setIsAccountModalVisible}
          />
        </ConfigBar>
      </HeaderWrappler>
    </>
  );

  function switchLanguage() {
    if (!userData.language || userData.language === "en-US") {
      setUserData({ ...userData, language: "pt-BR" });
    } else {
      setUserData({ ...userData, language: "en-US" });
    }
    window.location.reload()
  }
  function searchMovie(event) {
    if (event.target?.value?.length > 0) {
      const starterText = event.target?.value;
      setTimeout(() => {
        const newText = event.target?.value;
        if (starterText === newText) {
          const query = encodeURIComponent(starterText);
          // to show the encoded URI, it was necessary to do the process twice as react-route-dom does a decoding process as seen in history issues #505
          navigate(`/search?term=${encodeURIComponent(query)}`);
          window.location.reload();
        }
      }, [800]);
    }
  }
}

function LoginButton({ userData, navigate, setIsAccountModalVisible }) {
  if (userData.name) {
    return (
      <>
        <UserDataWrappler onClick={() => setIsAccountModalVisible(true)}>
          <img src={userData.image} />
        </UserDataWrappler>
      </>
    );
  } else {
    return (
      <UserDataWrappler>
        <Button
          text={"LOGIN"}
          onClick={() => {
            navigate("/login");
          }}
        />
      </UserDataWrappler>
    );
  }
}
function RegionIcon({ language, width, switchFunction }) {
  if (language === "pt-BR") {
    return (
      <>
        <img onClick={()=> switchFunction()}
          src={
            "https://img.freepik.com/vetores-gratis/ilustracao-de-bandeira-brasil_53876-27017.jpg"
          }
        />
        {width > 780 && <h2 onClick={()=> switchFunction()}>pt-BR</h2>}
      </>
    );
  }
  return (
    <>
      <img onClick={()=> switchFunction()}
        src={
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/255px-Flag_of_the_United_States.svg.png"
        }
      />
      {width > 780 && <h2 onClick={()=> switchFunction()}>en-US</h2>}
    </>
  );
}

const HeaderWrappler = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #171c25;
  z-index: 1;
  filter: drop-shadow(30px 10px 20px #0c0a016d);

  h2 {
    font-size: 16px;
  }
  @media screen and (max-width: 750px) {
    padding-left: 50px;
  }
`;

const SearchBar = styled.div`
  position: relative;
  min-width: 88px;
  input {
    all: unset;
    background-color: white;
    padding: 6px 30px 6px 20px;
    height: 40px;
    max-width: 290px;
    font-size: 18px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
  }
  @media screen and (max-width: 750px) {
    input {
      width: 95%;
      height: 30px;
      font-size: 14px;
      padding: 4px;
    }
  }
  @media screen and (max-width: 438px) {
    min-width: 70px;
    input {
      font-size: 10px;
      &::placeholder {
      }
    }
  }
`;

const IconWrappler = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 12px;
  margin-right: 8px;
  pointer-events: none;
  cursor: unset;
  @media screen and (max-width: 750px) {
    margin-top: 8px;
    margin-right: 10%;
  }
`;

const ConfigBar = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  justify-content: space-between;
  width: 180px;
  h2 {
    color: white;
    margin-right: 15px;
    margin-bottom: 0px;
    cursor: pointer;
  }
`;

const UserDataWrappler = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: space-evenly;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 50px;

  img {
    width: 45px;
    height: 45px;
    border-radius: 30px;
    outline: 2px solid #de0f62;
    cursor: pointer;
    margin-left: 20px;
  }
  @media screen and (max-width: 752px) {
    img {
      width: 35px;
      height: 35px;
    }
  }
`;
const RegionWrappler = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  h2 {
    margin: 10px;
    cursor: unset;
    min-width: 50px;
  }
  img {
    width: 25px;
    height: 15px;
  }
`;
