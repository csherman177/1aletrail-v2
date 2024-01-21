import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ADD_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import API from "../utils/API";
import AuthService from "../utils/auth";
import "../styles/Card.css";
import jwtDecode from "jwt-decode";

export default function Brewery() {
  const [text, setText] = useState("");
  const [brewery, setBrewery] = useState({});
  const [userData, setUserData] = useState(null);
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    context: {
      headers: {
        Authorization: `Bearer ${AuthService.getToken()}`,
      },
    },
  });
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { breweryId } = useParams();

  const fetchUserData = async () => {
    try {
      const token = AuthService.getToken();
      console.log("Token:", token);

      if (!token) {
        console.error("Token is not present.");
        return;
      }

      const isTokenExpired = AuthService.isTokenExpired(token);
      console.log("Is token expired:", isTokenExpired);

      if (isTokenExpired) {
        console.error("Token is expired.");
        return;
      }

      const user = await AuthService.getUser();
      console.log("User data1:", user);
      setUserData(user);
      return user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const fetchBrewery = async () => {
    try {
      console.log("Fetching brewery data...");
      const b = await API.searchById(breweryId);
      console.log("Fetched brewery data:", b);
      setBrewery(b);
      return b;
    } catch (error) {
      console.error("Error fetching brewery:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Before data fetching - loading:", loading);

    const fetchData = async () => {
      try {
        const user = await fetchUserData();
        setUserData(user);

        const breweryData = await fetchBrewery();
        setBrewery(breweryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [breweryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "text") {
      setText(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      console.log("Data is still loading. Please wait.");
      return;
    }

    try {
      const user = await fetchUserData();

      if (user && user.data._id && user.data.username) {
        console.log("User Data2", user);

        if (brewery && brewery.id && brewery.name) {
          console.log("Brewery data is fully loaded:", brewery);

          try {
            console.log("Submitting form...");

            const authToken = AuthService.getToken();

            const variables = {
              text,
              breweryId: brewery.id,
              breweryName: brewery.name,
              userId: user.data._id,
            };

            console.log("Variables for addComment mutation:", variables);

            const response = await addComment({
              variables,
            });

            console.log("Form submitted. Response data:", response);

            if (response && response.data && response.data.addComment) {
              console.log(
                "addComment mutation response:",
                response.data.addComment
              );
            } else {
              console.error(
                "Mutation response does not contain 'addComment'.",
                response
              );
            }

            setText("");
          } catch (error) {
            console.error("Mutation error:", error);
            throw error;
          } finally {
            setLoadingSubmit(false);
            console.log(
              "After form submission - loadingSubmit:",
              loadingSubmit
            );
          }
        } else {
          console.error("Brewery data is not fully loaded yet.");
          setLoadingSubmit(false);
        }
      } else {
        console.error("User data is not fully loaded or available.");
        setLoadingSubmit(false);
      }

      console.log("Rendering with brewery data:", brewery);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

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
