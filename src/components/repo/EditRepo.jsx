import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./editRepo.css";

const EditRepo = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchRepo();
  }, []);

  const fetchRepo = async () => {
    try {

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/repo/update/${id}`
      );

      const repo = response.data[0];

      // SECURITY CHECK FRONTEND
      if (repo.owner._id !== userId) {
        alert("You can only edit your own repositories");
        navigate("/dashboard");
        return;
      }

      setName(repo.name);
      setDescription(repo.description);
      setVisibility(repo.visibility);

    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/repo/${id}`,
        {
          name,
          description,
          visibility,
          userId
        }
      );

      alert("Repository updated successfully");

      navigate(`/repo/${id}`);

    } catch (err) {
      console.error(err);
      alert("Failed to update repository");
    }
  };

  return (
    <div id="edit-repo-page">

      <div className="edit-repo-container">

        <div className="edit-repo-heading">
          <h1>Edit Repository</h1>
          <p>Update your repository details</p>
        </div>

        <form className="edit-repo-form" onSubmit={handleUpdate}>

          <div className="input-group">
            <label>Repository Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="visibility-box">

            <label>

              <input
                type="checkbox"
                checked={visibility}
                onChange={() => setVisibility(!visibility)}
              />

              Public Repository

            </label>

          </div>

          <button className="save-repo-btn" type="submit">
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditRepo;