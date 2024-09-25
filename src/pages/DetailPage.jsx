import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { CrudTeamContext } from "../context/teamContext";
import { imageUrl } from "../Constant/url";
import axios from "axios";
import { teamBaseUrl } from "../Constant/url.js";

function Details() {
  const { id } = useParams();
  const { getTeamById } = useContext(CrudTeamContext);
  const [teamData, setTeamData] = useState();

  const [review, setReview] = useState(""); // State for review input
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading

  useEffect(() => {
    const fechData = async () => {
      const fetchDataById = await getTeamById(id);
      setTeamData(fetchDataById);
    };

    fechData();
  }, [getTeamById, id]);

  // Calculate star rating based on score and ranking
  const calculateStarRating = (score, ranking) => {
    // Example logic to calculate stars out of 5 based on score and ranking
    const normalizedRanking = ranking > 10 ? 10 : ranking; // Cap ranking at 10 for this example
    const combinedScore = (score + normalizedRanking) / 2; // Average score and ranking
    return Math.round(combinedScore / 2); // Convert it into a 5-star rating
  };

  const starRating = teamData
    ? calculateStarRating(teamData.score, teamData.ranking)
    : 0;

  const submitReview = async () => {
    if (!review.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    setIsSubmitting(true); // Set loading state

    try {
      const response = await axios.post(`${teamBaseUrl}/submitReview`, {
        teamId: id,
        review, // Review input
      });

      if (response.status === 200) {
        alert("Review submitted successfully!");
        setReview(""); // Clear the input field
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit the review. Please try again later.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div
      className="movie-details mt-5 cardshadow"
      style={{ display: "flex", gap: "20px" }}
    >
      <div className="movie-image card shadow" style={{ maxWidth: "300px" }}>
        {teamData && (
          <img
            src={`${imageUrl}/${teamData.image}`}
            alt={teamData.name}
            style={{ width: "100%", borderRadius: "10px", height: "100px" }}
          />
        )}
      </div>

      <div className="movie-info" style={{ flex: 1 }}>
        {teamData && (
          <>
            <h1
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "crimson",
              }}
            >
              {teamData.name}
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              Jailer is a 2023 Indian Tamil-language action comedy film directed
              by Nelson Dilipkumar and produced by Kalanithi Maran under Sun
              Pictures.
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <strong>Release Date:</strong>{" "}
              {new Date(teamData.createdAt).toLocaleDateString()}
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <strong>Category:</strong>{" "}
              {teamData.isSingle ? "Single" : "Group"}
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <strong>Ranking:</strong> {teamData.ranking}
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <strong>Score:</strong> {teamData.score}
            </p>

            <div
              className="rating"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {[1, 2, 3, 4, 5].map((starValue) => (
                <span
                  key={starValue}
                  style={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: starRating >= starValue ? "gold" : "gray",
                  }}
                >
                  ★
                </span>
              ))}
              <b>
                <p
                  className="mt-3 ms-3 text-warning"
                  style={{
                    marginLeft: "10px",
                    fontSize: "1.2rem",
                    color: "#ffc107",
                  }}
                >
                  {starRating}/5
                </p>
              </b>
            </div>

            <div className="review" style={{ marginTop: "2rem" }}>
              <label
                htmlFor="review"
                style={{
                  display: "block",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                Write a review:
              </label>
              <textarea
                id="review"
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)} // Capture user input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  color: "#333",
                }}
              ></textarea>
            </div>

            <button
              onClick={submitReview} // Submit review on click
              style={{
                marginTop: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: isSubmitting ? "not-allowed" : "pointer", // Disable button while submitting
              }}
              disabled={isSubmitting} // Disable button when submitting
            >
              {isSubmitting ? "Submitting..." : "Send"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Details;
