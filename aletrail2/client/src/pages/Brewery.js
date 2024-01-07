import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import { ADD_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import API from "../utils/API";
import AuthService from "../utils/auth";
import "../styles/Card.css";

export default function Brewery() {
  // Fetch single brewery
  const { breweryId } = useParams();

  console.log(breweryId);

  const [brewery, setBrewery] = useState({});

  const fetchBrewery = async () => {
    try {
      const b = await API.searchById(breweryId);
      setBrewery(b);
    } catch (error) {
      console.error("Error fetching brewery:", error);
    }
  };
  console.log("brewery ID before effect");

  useEffect(() => {
    fetchBrewery();
  }, [breweryId]);

  console.log("brewery ID after effect");

  // POST new comment
  const [text, setText] = useState("");
  console.log("text state initialized:", text);

  const [addComment] = useMutation(ADD_COMMENT);
  console.log("useMutation hook initialized:", addComment);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Before GraphQL Request");
    console.log("text:", text);

    // Check if brewery is defined before accessing its properties
    if (brewery && brewery.id && brewery.name) {
      console.log("brewery.id:", brewery.id);
      console.log("brewery.name:", brewery.name);

      try {
        const { data } = await addComment({
          variables: {
            text,
            breweryId: brewery.id,
            breweryName: brewery.name,
          },
        });
        console.log("After GraphQL Request");
        console.log("Response data:", data);

        setText(""); // Clear the input field after successful submission
      } catch (error) {
        console.error("Mutation error:", error);

        // Log more details about the error
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach((graphQLError) => {
            console.error("GraphQL Error:", graphQLError);
          });
        }

        if (error.networkError) {
          console.error("Network Error:", error.networkError);
        }

        if (error.message) {
          console.error("Error Message:", error.message);
        }
      }
    } else {
      console.error("Brewery data is not fully loaded yet.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "text") {
      setText(value);
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
          <div className="text-center brew-card p-4">
            <h5>
              Have you visited {brewery.name}? Let them know what you think!
            </h5>
            <div className="m-3">
              <Rating
                start={0}
                stop={5}
                step={1}
                initialRating={0}
                readonly={false}
                direction={"ltr"}
                fractions={2}
              />
            </div>
            <form onSubmit={handleFormSubmit} className="card-body">
              <div className="form-item row m-3">
                <textarea
                  className="form-input"
                  placeholder="Leave a comment"
                  name="text"
                  type="textarea"
                  value={text}
                  onChange={handleChange}
                />
              </div>
              <div className="form-item row">
                <input
                  className="form-input"
                  name="breweryId"
                  type="text"
                  value={brewery.id}
                  hidden
                />
              </div>
              <div className="form-item row">
                <input
                  className="form-input"
                  name="breweryName"
                  type="text"
                  value={brewery.name}
                  hidden
                />
              </div>
              <button
                className="form-btn"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
