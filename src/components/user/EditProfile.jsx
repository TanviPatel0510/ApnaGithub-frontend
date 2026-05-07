// EditProfile.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import "./editProfile.css";

import {
  TextInput,
  Button,
} from "@primer/react";

import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Fetch current user data
  useEffect(() => {

    const fetchUserDetails = async () => {

      try {

        const response = await axios.get(
          `http://localhost:3002/userProfile/${id}`
        );

        setUserData({
          username: response.data.username || "",
          email: response.data.email || "",
          password: "",
        });

      } catch (err) {

        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.put(
        `http://localhost:3002/updateProfile/${id}`,
        userData
      );

      console.log(response.data);

      alert("Profile updated successfully!");

      navigate(`/profile/${id}`);

    } catch (err) {

      console.error("Error updating profile:", err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar />

      <section id="edit-profile-page">

        <div className="edit-profile-container">

          <div className="edit-heading">

            <h1>Edit Profile</h1>

            <p>
              Update your account information.
            </p>

          </div>

          <form
            className="edit-profile-form"
            onSubmit={handleSubmit}
          >

            <div className="input-group">

              <label>Username</label>

              <TextInput
                block
                name="username"
                placeholder="Enter username"
                value={userData.username}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Email</label>

              <TextInput
                block
                type="email"
                name="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>New Password</label>

              <TextInput
                block
                type="password"
                name="password"
                placeholder="Enter new password"
                value={userData.password}
                onChange={handleChange}
              />

            </div>

            <Button
              type="submit"
              variant="primary"
              className="save-btn"
            >
              Save Changes
            </Button>

          </form>
        </div>
      </section>
    </>
  );
};

export default EditProfile;