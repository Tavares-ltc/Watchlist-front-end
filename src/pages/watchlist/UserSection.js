import React from "react";
import styled from "styled-components";
import { formatDate } from "../../helper/dateFormat";
export function UserSection({ userData }) {
  const date = userData.created_at.split("T")[0];
  const formatedDate = formatDate(date);
  return (
    <UserSectionWrappler>
      <img src={userData.image} />
      <h1>{userData.name}</h1>
      <h1>Id: {userData.id}</h1>
      <h1>User since: {formatedDate}</h1>
    </UserSectionWrappler>
  );
}

const UserSectionWrappler = styled.div`
  margin: 120px 10%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    font-size: 30px;
    color: #3d3d3d;
  }
  img {
    width: 80px;
    height: 80px;
    outline: 5px solid #3d3d3d;
    margin-right: 10px;
  }
  @media screen and (max-width: 900px) {
    h1 {
      font-size: 18px;
      margin-right: 10px;
    }
  }
`;
