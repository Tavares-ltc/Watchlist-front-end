import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { WatchlistLogo } from "./WatchlistLogo";
import { Button } from "./Button";
import { AuthContext } from "../contexts/AuthContext";

export default function Header({ setIsAccountModalVisible }) {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  return (
    <>
      <HeaderWrappler>
        <WatchlistLogo />
        <NavBar>
          <h2
            onClick={() => {
              navigate("/discover");
              window.location.reload();
            }}
          >
            Discover
          </h2>
          <h2
            onClick={() => {
              navigate("/popular");
              window.location.reload();
            }}
          >
            Popular
          </h2>
          <h2
            onClick={() => {
              navigate("/now_playing");
              window.location.reload();
            }}
          >
            Now Playing
          </h2>
          <h2
            onClick={() => {
              navigate("/upcoming");
              window.location.reload();
            }}
          >
            Upcoming
          </h2>
          <h2
            onClick={() => {
              navigate("/top_rated");
              window.location.reload();
            }}
          >
            Top Rated
          </h2>
        </NavBar>
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
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/255px-Flag_of_the_United_States.svg.png"
              }
            />
            <h2>en-US</h2>
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
      <Button
        text={"LOGIN"}
        onClick={() => {
          navigate("/login");
        }}
      />
    );
  }
}

const HeaderWrappler = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;

  padding: 2px 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #171c25;
  z-index: 1;
  filter: drop-shadow(30px 10px 20px #0c0a016d);

  h2 {
    font-size: 16px;
  }
`;

const NavBar = styled.div`
  display: flex;
  margin: 0 30px;
  h2 {
    color: white;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      color: #de0f62;
    }
  }
`;
const SearchBar = styled.div`
  position: relative;
  input {
    all: unset;
    background-color: white;
    padding: 6px 30px 6px 20px;
    height: 40px;
    width: 290px;
    font-size: 18px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
  }
`;
const ConfigBar = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  justify-content: space-between;
  width: 180px;
  h2 {
    color: white;
    margin-right: 15px;
    margin-bottom: 0px;
    cursor: pointer;
  }
`;

const IconWrappler = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 12px;
  margin-right: 8px;
`;

const UserDataWrappler = styled.div`
  width: 100px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  img {
    width: 45px;
    height: 45px;
    border-radius: 30px;
    outline: 2px solid #de0f62;
    cursor: pointer;
  }
`;
const RegionWrappler = styled.div`
  width: 150px;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 10px;
    cursor: unset;
  }
  img {
    width: 25px;
    height: 15px;
  }
`;
