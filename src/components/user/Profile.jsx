import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState({ username: "username" });

  // ✅ NEW STATE (ADDED ONLY)
  const [repositories, setRepositories] = useState([]);

  const { setCurrentUser } = useAuth();
  const loggedInUserId = localStorage.getItem("userId");
  const isOwnProfile = loggedInUserId === id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = id;

      if (userId) {
        try {
          const response = await axios.get(
            `${BASE_URL}/userProfile/${userId}`
          );

          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };

    fetchUserDetails();
  }, [id]);

  // ✅ NEW EFFECT (FETCH USER REPOSITORIES)
  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/repo/user/${id}`
        );

        setRepositories(res.data.repositories);
      } catch (err) {
        console.error("Error fetching user repositories:", err);
      }
    };

    if (id) fetchUserRepos();
  }, [id]);

  return (
    <>
      <Navbar />

      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/auth";
        }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        {/* LEFT SECTION */}
        <div className="user-profile-section">
          <div className="profile-image">
            <img
              src="https://avatars.githubusercontent.com/u/9919?s=400&v=4"
              alt="profile"
            />
          </div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          {isOwnProfile ? (
            <Link to={`/updateProfile/${id}`}>
              <button className="follow-btn">Edit Profile</button>
            </Link>
          ) : (
            <button className="follow-btn">Follow</button>
          )}

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="heat-map-section">
          <HeatMapProfile />

          {/* ✅ NEW SECTION: USER REPOSITORIES */}
          <div className="repo-card-wrapper">
            {repositories.length > 0 ? (
              repositories.map((repo) => (
                <div className="repo" key={repo._id}>
                  <Link to={`/repo/${repo._id}`}>
                    <h3 className="repo-name">{repo.name}</h3>
                  </Link>

                  <p className="description">
                    {repo.description || "No description provided"}
                  </p>

                  <p
                    style={{
                      marginTop: "10px",
                      color: repo.visibility ? "#2ea043" : "#f85149",
                      fontWeight: "600",
                    }}
                  >
                    {repo.visibility ? "Public" : "Private"}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: "#8b949e", marginTop: "20px" }}>
                No repositories found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;