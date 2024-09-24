import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Details() {

  

  return (
    <div className="movie-details mt-5 cardshadow">
      <div className="movie-image card shadow ">
        <img src={'https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg'} alt="Movie Poster" />
      </div>
      <div className="moviee-info">

        <h1>Jailer</h1>

        <p>Jailer is a 2023 Indian Tamil-language action comedy film directed by Nelson Dilipkumar and produced by Kalanithi Maran under Sun Pictures.</p>

        <p><strong>Release Date:</strong> 09-12-2023</p>

        <p><strong>Genre:</strong> Action</p>

        <div className="rating">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <span
              key={starValue}
              style={{ cursor: 'pointer', color: 'gray' }} // Static stars, no click functionality
            >
              ★
            </span>
          ))}
          <b><p className='mt-3 ms-3 text-warning'>0</p></b>
        </div>

        <div className="review">
          <label htmlFor="review">Write a review:</label>
          <textarea
            id="review"
            rows="4"
            value=""
            readOnly // Static textarea, no input functionality
          ></textarea>
        </div>

        <Button variant="primary" disabled>
          Send
        </Button>
      </div>
    </div>
  );
}

export default Details;
