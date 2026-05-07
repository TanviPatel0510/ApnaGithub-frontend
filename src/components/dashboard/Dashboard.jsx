    /*import React, { useState, useEffect} from 'react';
    import "./dashboard.css";
    import Navbar from '../Navbar';
    import { Link } from 'react-router-dom';

    const Dashboard = () => {

        const [repositories, setRepositories] = useState([]);
        const [searchQuery, setSearchQuery] = useState("");
        const [suggestedRepositories, setSuggestedRepositories] = useState([]);
        const [searchResults, setSearchResults] = useState([]);

        //useEffect for fetching the data from database
        /*useEffect(()=> {
            const userId = localStorage.getItem('userId');
            const fetchRepositories = async () => {
                try {
                    const response = await fetch(`http://localhost:3002/repo/user/${userId}`);
                    const data = await response.json();
                    console.log(data);
                    //setRepositories(data);
                } catch (err) {
                    console.error("Error fetching repositories: ", err);
                }
            }
            fetchRepositories();
        },[]);

        useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId || userId === "undefined") {
            console.error("Invalid userId");
            return;
        }

        const fetchRepositories = async () => {
        try {
            const response = await fetch(`http://localhost:3002/repo/user/${userId}`);
            const data = await response.json();

            console.log(data);

            if (Array.isArray(data)) {
                setRepositories(data);
            } else {
                setRepositories([]);
                console.error(data.error);
            }

        } catch (err) {
            console.error("Error fetching repositories: ", err);
            setRepositories([]);
        }
    };
        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3002/repo/all`);
                const data = await response.json();

                console.log("RAW SUGGESTED:", data);

                // ✅ FIX: filter only public repos
                const publicRepos = Array.isArray(data)
                ? data.filter(repo => repo.visibility === true)
                : [];

                setSuggestedRepositories(publicRepos);

            } catch (err) {
                console.error("Error fetching suggested repositories: ", err);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(() => {
        if(searchQuery == ''){
            setSearchResults(repositories);
        }else{
            const filteredRepos = repositories.filter(repo => 
                repo.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredRepos);
        }
    },[searchQuery, repositories])
        return (
            <>
            <Navbar />
            <section id="dashboard">
                <aside>
                    <h3>Suggested Repositories</h3>
                    {suggestedRepositories.map((repo) => {
                    return (

                            <Link
                                to={`/repo/${repo._id}`}
                                key={repo._id}
                                className="repo-link"
                            >
                                <div className="suggested-repo-card">
                                    <h4>{repo.name}</h4>
                                    <p>{repo.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </aside>
                <main>
                    <h2>Your Repositories</h2>
                    <div id="search">
                        <input type="text" value={searchQuery} placeholder='Search...'
                        onChange={(e)=>setSearchQuery(e.target.value)} />
                    </div>
                    {searchResults.map((repo) => {
                        return (
                            <div key={repo._id}>
                                <h4>{repo.name}</h4>
                                <p>{repo.description}</p>
                            </div>
                        )
                    })}
                </main>
                <aside>
                    <h3>Upcoming Events</h3>
                    <ul>
                        <li><p>Tech Conference - Dec 15</p></li>
                        <li>Developer Meetup - Dec 25</li>
                        <li>React Summit - Jan 5 </li>
                    </ul>
                </aside>
            </section>
            </>
        )
    }

    export default Dashboard;*/

import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [publicRepositories, setPublicRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // 🔥 FETCH ONLY PUBLIC REPOS (Explore Feed)
  useEffect(() => {
    const fetchPublicRepos = async () => {
      try {
        const response = await fetch("http://localhost:3002/repo/all");
        const data = await response.json();

        const publicRepos = Array.isArray(data)
          ? data.filter((repo) => repo.visibility === true)
          : [];

        setPublicRepositories(publicRepos);
      } catch (err) {
        console.error("Error fetching public repositories:", err);
      }
    };

    fetchPublicRepos();
  }, []);

  // 🔍 SEARCH ONLY PUBLIC REPOS
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query === "") {
      setSearchResults(publicRepositories);
    } else {
      const filtered = publicRepositories.filter((repo) => {
        return (
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query)
        );
      });

      setSearchResults(filtered);
    }
  }, [searchQuery, publicRepositories]);

  return (
    <>
      <Navbar />

      <section id="dashboard">

        {/* 🔵 LEFT PANEL - SEARCH ONLY */}
        <aside>
          <h3>Explore</h3>

          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search public repositories..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <p style={{ fontSize: "12px", opacity: 0.6 }}>
            Search across all public repositories
          </p>
        </aside>

        {/* 🟢 MAIN FEED - PUBLIC REPOS */}
        <main>
          <h2>Public Repositories</h2>

          {searchResults.length > 0 ? (
            searchResults.map((repo) => (
              <Link
                to={`/repo/${repo._id}`}
                key={repo._id}
                className="repo-link"
              >
                <div className="suggested-repo-card">
                  <h4>{repo.name}</h4>
                  <p>{repo.description || "No description provided"}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No repositories found</p>
          )}
        </main>

        {/* 🔴 RIGHT PANEL - EVENTS */}
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>Tech Conference - Dec 15</li>
            <li>Developer Meetup - Dec 25</li>
            <li>React Summit - Jan 5</li>
          </ul>
        </aside>

      </section>
    </>
  );
};

export default Dashboard;