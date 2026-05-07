import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";
import "./repositoryDetails.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RepositoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);

  const loggedInUserId = localStorage.getItem("userId");

 useEffect(() => {
  const fetchRepository = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/repo/${id}`
      );

      console.log("REPO DATA:", response.data);

      const data = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      setRepository(data);
    } catch (err) {
      console.error("Error fetching repository:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchRepository();
}, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this repository?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${BASE_URL}/repo/delete/${id}`
      );

      alert("Repository deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting repository:", err);
      alert("Failed to delete repository");
    }
  };

  const handleToggleVisibility = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/repo/toggle/${id}`
      );

      setRepository((prev) => ({
        ...prev,
        visibility: !prev.visibility,
      }));
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!repository) {
    return <h2 className="loading">Repository not found</h2>;
  }

  // ✅ SAFE OWNER CHECK (FIXED)
  const ownerId = repository?.owner?._id || repository?.owner;

  const isOwner =
    ownerId &&
    loggedInUserId &&
    ownerId.toString() === loggedInUserId.toString();

  return (
    <>
      <Navbar />

      <section className="repo-details-container">

        {/* HEADER */}
        <div className="repo-header">
          <div>
            <h1>{repository.name}</h1>

            <span className="visibility-badge">
              {repository.visibility ? "Public" : "Private"}
            </span>
          </div>

          {/* OWNER ACTIONS */}
          {isOwner && (
            <div className="repo-actions">
              <button
                onClick={handleToggleVisibility}
                className="toggle-btn"
              >
                Toggle Visibility
              </button>

              <Link to={`/repo/update/${repository._id}`}>
                <button className="edit-btn">
                  Edit Repository
                </button>
              </Link>

              <button
                onClick={handleDelete}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="repo-description">
          <h3>About</h3>
          <p>
            {repository?.description?.trim()
              ? repository.description
              : "No description provided."}
          </p>
        </div>

        {/* CONTENT */}
        <div className="repo-content">
          <h3>Repository Content</h3>

          {repository.content?.length > 0 ? (
            repository.content.map((file, index) => (
              <div key={index} className="file-card">
                📄 {file}
              </div>
            ))
          ) : (
            <p>No files added yet.</p>
          )}
        </div>

        {/* ISSUES */}
        <div className="repo-issues">
          <h3>Issues</h3>

          {repository.issues?.length > 0 ? (
            repository.issues.map((issue, index) => (
              <div key={index} className="issue-card">
                Issue #{index + 1}
              </div>
            ))
          ) : (
            <p>No issues found.</p>
          )}
        </div>

      </section>
    </>
  );
};

export default RepositoryDetails;