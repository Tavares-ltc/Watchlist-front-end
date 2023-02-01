import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "../../components/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth, provider } from "../../services/firebase";
export function AccountMenuModal({
  isAccountModalVisible,
  setIsAccountModalVisible,
}) {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate()
  return (
    <>
      <Modal
        isVisible={isAccountModalVisible}
        width={"300px"}
        height={"200px"}
        alignItems={"flex-start"}
        justifyContent={"end"}
        fontSize={"25px"}
        closeFunction={() => setIsAccountModalVisible(false)}
      >
        <AccountMenu>

        <h1>{userData.name}</h1>
        <h2 onClick={()=> alert("Coming soon")}>Watchlist</h2>
        <h2 onClick={logout}>Logout</h2>
        </AccountMenu>
      </Modal>
    </>
  );

function logout(){
    localStorage.removeItem("userData")
    signOut(auth, provider)
    window.location.reload()
}


}

const AccountMenu = styled.div`
h1{
    font-size: 26px;
    color: #fe6828;
    margin-bottom: 40px;
}
h2 {
    font-size: 18px;
    color: white;
    margin-bottom: 40px;
    cursor: pointer;
    &:hover {
      color: #de0f62;
    }
}
`
