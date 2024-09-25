import axios from "axios";
import React, { useEffect, useState } from "react";

import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { teamBaseUrl } from "../Constant/url";

const TickerText = styled.div`
  display: inline-block;
  margin-right: 1.4rem;
  span {
    color: #089981;
  }
  font-size: 18px;
  font-weight: 650;
`;

export default function ProgramMove() {
  const [currencyPairs, setCurrencyPairs] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = (
          await axios.get(`${teamBaseUrl}/getAllPrograms`)
        ).data;

        setCurrencyPairs(
        //   Object.entries(response).map(([currency, price]) => ({
        //     currency,
        //     price,
        //   }))
        response
        );
      } catch (error) {
        console.error("Error fetching currency Data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-2">
      <Marquee
        style={{ backgroundColor: "black" }}
        className="overlay"
        gradientColor="rgba(248, 251, 253, 1), rgba(248, 251, 253, 0);"
        pauseOnClick
      >
        {currencyPairs &&
          currencyPairs.map((pair, index) => (
            <TickerText>
              <span>
                <span style={{ color: "red" }}>PROGRAM/ </span>
                {pair.value}:
              </span>
              <span style={{ color: "white" }}> {pair.label}</span>
            </TickerText>
          ))}
      </Marquee>
    </div>
  );
}
