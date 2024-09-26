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

  // Calculate rank based on totalScore
  const calculateRank = (totalScore) => {
    if (totalScore >= 100) {
      return 1;
    } else if (totalScore >= 75) {
      return 2;
    } else if (totalScore >= 50) {
      return 3;
    } else if (totalScore >= 25) {
      return 4;
    } else {
      return 5;
    }
  };

  const starRating = teamData ? calculateStarRating(teamData.totalScore) : 0;
  const rank = teamData ? calculateRank(teamData.totalScore) : 0;

  console.log('teamData',teamData)

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
    gap: "24px",
    padding: "24px",
    backgroundColor: "#1e1e2f",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
    color: "#ffffff",
    maxWidth: "900px",
    margin: "40px auto",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "scale(1.02)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
    }
  }}
>
  {teamData && (
    <>
      <div
        className="team-image"
        style={{
          maxWidth: "300px",
          textAlign: "center",
          border: "1px solid #444",
          borderRadius: "10px",
          padding: "12px",
          backgroundColor: "#29293b",
          margin: "auto"
        }}
      >
        <img
          src={`${imageUrl}/${teamData.image}`}
          alt={teamData.name}
          style={{
            width: "100%",
            borderRadius: "8px",
            height: "220px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            ":hover": {
              transform: "scale(1.05)"
            }
          }}
        />
        <h2 style={{ marginTop: "12px", color: "#ffc107", fontWeight: "bold" }}>
          {teamData.name}
        </h2>
      </div>

      <div className="team-info" style={{ flex: 1, padding: "0 16px" }}>
        <h1
          style={{
            fontSize: "2.4rem",
            marginBottom: "1.2rem",
            textAlign: "center",
            fontWeight: "bold",
            color: "#ffc107",
            borderBottom: "2px solid #ffc107",
            paddingBottom: "10px"
          }}
        >
          {teamData.name}
        </h1>

        <p style={{ marginBottom: "0.7rem", fontSize: "1rem", color: "#ccc" }}>
          <strong style={{ color: "#ff9800" }}>Created on:</strong> {new Date(teamData.createdAt).toLocaleDateString()}
        </p>

        <p style={{ marginBottom: "0.7rem", fontSize: "1rem", color: "#ccc" }}>
          <strong style={{ color: "#ff9800" }}>Total Score:</strong> {teamData.totalScore}
        </p>

        <div className="rating" style={{ display: "flex", alignItems: "center", marginBottom: "1.2rem" }}>
          {[1, 2, 3, 4, 5].map((starValue) => (
            <span
              key={starValue}
              style={{
                fontSize: "1.6rem",
                cursor: "pointer",
                color: starRating >= starValue ? "gold" : "#444",
                transition: "color 0.3s ease"
              }}
            >
              ★
            </span>
          ))}
          <p style={{ marginLeft: "12px", fontSize: "1.3rem", color: "#ffc107" }}>{starRating}/5</p>
        </div>

        <div className="programs-section" style={{ marginTop: "24px" }}>
          <h3 style={{ marginBottom: "1rem", color: "#ffc107", borderBottom: "2px solid #ffc107", paddingBottom: "8px" }}>
            Programs:
          </h3>
          <ul style={{ paddingLeft: "20px", color: "#ccc" }}>
            {teamData.programs.map((program, index) => (
              <li key={index} style={{ marginBottom: "0.8rem", padding: "12px", backgroundColor: "#29293b", borderRadius: "8px" }}>
                <strong>Program ID:</strong> {program.programId._id.length > 5 ? `${program.programId._id.slice(0, 5)}*****` : program.programId._id}
                <br />
                <strong style={{ color: "yellow" }}>Program Name:</strong> {program.programId.value}
                <br />
                <strong style={{ color: "red" }}>Score:</strong> {program.score}
                <br />
                <strong style={{ color: "green" }}>Rank:</strong> {program.rank}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )}
</div>

  );
}

export default Details;

