// CreateRepo.jsx

import React, { useState } from "react";
import axios from "axios";
import "./createRepo.css";
import Navbar from "../Navbar";

import {
  TextInput,
  Textarea,
  Button,
  Checkbox,
} from "@primer/react";

const CreateRepo = () => {
  const [repoData, setRepoData] = useState({
    name: "",
    description: "",
    visibility: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setRepoData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? Boolean(checked) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost:3002/repo/create",
        {
          name: repoData.name,
          description: repoData.description,
          visibility: repoData.visibility,
          owner: userId,
        }
      );

      console.log(response.data);

      alert("Repository created successfully!");

      setRepoData({
        name: "",
        description: "",
        visibility: false,
      });

    } catch (err) {
      console.error("Error creating repository:", err);
    }
  };

  return (
    <>
      <Navbar />

      <section id="create-repo-page">
        <div className="create-repo-container">

          <div className="repo-heading">
            <h1>Create a new repository</h1>

            <p>
              A repository contains all your project files,
              revision history, and collaboration tools.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="repo-form">

            <div className="input-group">
              <label>Repository name</label>

              <TextInput
                block
                name="name"
                placeholder="my-awesome-project"
                value={repoData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Description</label>

              <Textarea
                name="description"
                placeholder="Write a short description..."
                value={repoData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="visibility-section">
              <h3>Visibility</h3>

              <label className="checkbox-container">

                <Checkbox
                  name="visibility"
                  checked={repoData.visibility}
                  onChange={handleChange}
                />

                <div>
                  <h4>Private</h4>

                  <p>
                    Only you can see this repository.
                  </p>
                </div>

              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="create-btn"
            >
              Create repository
            </Button>

          </form>
        </div>
      </section>
    </>
  );
};

export default CreateRepo;