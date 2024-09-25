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
  const [teamData, setTeamData] = useState(null);
  const [review, setReview] = useState(""); // State for review input
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeamById(id);
      setTeamData(data);
    };
    fetchData();
  }, [getTeamById, id]);

  // Calculate star rating based on totalScore
  const calculateStarRating = (totalScore) => {
    return Math.min(5, Math.round(totalScore / 5)); // Cap the star rating at 5
  };

  const starRating = teamData ? calculateStarRating(teamData.totalScore) : 0;

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
  className="team-details-container"
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#1e1e2f",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    color: "white",
    maxWidth: "900px",
    margin: "auto",
    transition: "transform 0.2s",
  }}
>
  {teamData && (
    <>
      <div
        className="team-image"
        style={{
          maxWidth: "300px",
          textAlign: "center",
          border: "1px solid #555",
          borderRadius: "10px",
          padding: "10px",
          backgroundColor: "#2c2c3e",
        }}
      >
        <img
          src={`${imageUrl}/${teamData.image}`}
          alt={teamData.name}
          style={{ width: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }}
        />
        <h2 style={{ marginTop: "10px", color: "#ffc107" }}>
          {teamData.name}
        </h2>
      </div>

      <div className="team-info" style={{ flex: 1 }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
          {teamData.name}
        </h1>

        <p style={{ marginBottom: "0.5rem" }}>
          <strong>Created on:</strong> {new Date(teamData.createdAt).toLocaleDateString()}
        </p>

        <p style={{ marginBottom: "0.5rem" }}>
          <strong>Type:</strong> {teamData.isSingle ? "Single" : teamData.isGroup ? "Group" : "N/A"}
        </p>

        <p style={{ marginBottom: "0.5rem" }}>
          <strong>Total Score:</strong> {teamData.totalScore}
        </p>

        <div className="rating" style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          {[1, 2, 3, 4, 5].map((starValue) => (
            <span
              key={starValue}
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                color: starRating >= starValue ? "gold" : "gray",
                transition: "color 0.2s",
              }}
              onMouseEnter={() => handleHover(starValue)}
              onMouseLeave={() => handleHover(null)}
              onClick={() => handleStarClick(starValue)}
            >
              ★
            </span>
          ))}
          <p style={{ marginLeft: "10px", fontSize: "1.2rem", color: "#ffc107" }}>
            {starRating}/5
          </p>
        </div>

        <div className="programs-section">
          <h3 style={{ marginBottom: "1rem", color: "#ffc107" }}>
            Programs:
          </h3>
          <ul style={{ paddingLeft: "20px" }}>
            {teamData.programs.map((program, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                <strong>Program ID:</strong> {program.programId._id.length > 5 ? `${program.programId._id.slice(0, 5)}*****` : program.programId._id} |{" "}
                <br />
                <strong style={{color:"yellow"}}>Program Name</strong> {program.programId.value} {" "}
                <br />
                <strong style={{color:"red"}}>Score:</strong> {program.score}
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="review-section" style={{ marginTop: "2rem" }}>
          <label htmlFor="review" style={{ display: "block", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
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
              border: "1px solid #555",
              backgroundColor: "#333",
              color: "#fff",
            }}
            aria-label="Review text area"
          ></textarea>

          <button
            onClick={submitReview}
            style={{
              marginTop: "1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Send"}
          </button>
        </div> */}
      </div>
    </>
  )}
</div>

  );
}

export default Details;
