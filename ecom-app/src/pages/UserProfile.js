import React from "react";
import { useData } from "../context/DataContext";
import { useContext } from "react"
import {AuthContext} from ".."


const UserProfile = () => {
  const { user } = useContext(AuthContext);


  return (
    <div>
      <h1>User Profile</h1>
      {user? (
        <div>
          <p>Name: {user.firstName} {user.lastName}</p>
        
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
