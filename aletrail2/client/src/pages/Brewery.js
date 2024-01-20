import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ADD_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import API from "../utils/API";
import AuthService from "../utils/auth";
import "../styles/Card.css";

export default function Brewery() {
  const [text, setText] = useState("");
  const [brewery, setBrewery] = useState({});
  const [userData, setUserData] = useState(null);
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      // Implement cache update logic if needed
    },
    onError: (error) => {
      console.error("GraphQL error:", error);
    },
  });
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { breweryId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AuthService.getUser();
        console.log("User data:", user); // Log user data

        if (user && user.data) {
          setUserData(user.data);
        } else {
          console.error("User data is not available.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user data before fetching brewery data
    fetchUserData();

    // Fetch brewery data on component mount
    fetchBrewery();
  }, [breweryId]);

  const fetchBrewery = async () => {
    try {
      console.log("Fetching brewery data...");
      const b = await API.searchById(breweryId);
      console.log("Fetched brewery data:", b);
      setBrewery(b);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching brewery:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "text") {
      setText(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoadingSubmit(true);

    // Fetch brewery data before submission if not loaded
    if (!brewery.id) {
      console.log("Fetching brewery data before submission...");
      await fetchBrewery();
      console.log("Fetched brewery data before submission:", brewery);
    }

    // Check if brewery is fully loaded with required properties
    if (brewery && brewery.id && brewery.name) {
      console.log("Brewery data is fully loaded:", brewery);

      if (userData && userData.id && userData.username) {
        try {
          console.log("Submitting form...");
          const user = AuthService.getUser();
          const { data } = await addComment({
            variables: {
              text,
              breweryId: brewery.id,
              breweryName: brewery.name,
              user: {
                id: user.id,
                username: user.username,
              },
            },
          });
          console.log("Form submitted. Response data:", data);
          setText("");
        } catch (error) {
          console.error("Mutation error:", error);
        } finally {
          setLoadingSubmit(false);
        }
      } else {
        console.error("User data is not fully loaded or available.");
        setLoadingSubmit(false);
      }
    } else {
      console.error("Brewery data is not fully loaded yet.");
      setLoadingSubmit(false);
    }
  };

  console.log("Rendering with brewery data:", brewery);

  return (
    <div>
      <div>
        <h1>{brewery.name}</h1>
        <div className="intro-card text-start">
          <h5>Phone: {brewery.phone}</h5>
          <h5>
            Website:{" "}
            <a className="text-info" href={brewery.website_url}>
              {brewery.website_url}
            </a>
          </h5>
          <h5>
            Address: {brewery.street}, {brewery.city}, {brewery.state}
          </h5>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="text-center brew-card p-4">
              <h5>
                Have you visited {brewery.name}? Let them know what you think!
              </h5>
              <div className="m-3">{/* Add Rating component */}</div>
              {!loading && (
                <form onSubmit={handleFormSubmit} className="card-body">
                  <div className="form-item row m-3">
                    <textarea
                      className="form-input"
                      placeholder="Leave a comment"
                      name="text"
                      value={text}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-item row m-3">
                    <button type="submit" disabled={loadingSubmit}>
                      {loadingSubmit ? "Submitting..." : "Submit Comment"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
