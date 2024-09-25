import React from "react";
import "./Banner.css";
import { CardText, CardTitle, Col, Container, Row } from "react-bootstrap";
import { keyframes, styled } from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  MDBCardTitle,
  MDBCardText,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { useEffect } from "react";

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningImage = styled.img`
  display: block;
  margin: auto;
  width: 150px; /* Adjust the size as needed */
  height: 150px;
  animation: ${spinAnimation} 3s linear infinite; /* Adjust the animation duration as needed */
`;

export default function Banner() {
  useEffect(() => {
    AOS.init({
      // Global settings:
      duration:1000,
      once: false, // whether animation should happen only once - while scrolling down
      // You can also pass other settings according to the AOS documentation
    });
  }, []);
  return (
    <>
      <Container>
        <Row className="mt-7">
          <Col>
            <div className="landing-hero">
              {/* <div style={{ opacity: ".7" }}>
                <SpinningImage
                  src={'/logo.jpg'}
                  className="img-fluid rotating-btc"
                  alt="logo"
                />
              </div> */}
              <div className="offset-md-2 col-md-8 text-center mt-5">
                <h2 className="mb-4">A trusted and secure cryptocurrency exchange.</h2>
                <p>
                  Crypto is the most advanced UI kit for making the Blockchain
                  platform. This kit comes with 4 different exchange page,
                  market, wallet and many more
                </p>
                <div className="input-group">
                  <input
                    class="search__input"
                    type="text"
                    placeholder="Please enter the name of the broker for inquiries"
                    aria-label="Please enter the name of the broker for inquiries"
                    aria-describedby="button-addon2"
                  />
                </div>

                {/* <div className='currency-slot'>
                                    <div className="p-2 rounded-md bg-blue-900 ">
                                        <span className='currency-icon'><i class="fa-solid fa-dollar-sign"></i> </span>
                                    </div>
                                    <div className="p-2 rounded-md bg-blue-900   ">
                                        <span className='currency-icon'><i class="fa-solid fa-euro-sign"></i> </span>
                                    </div>
                                    <div className="p-2 rounded-md bg-blue-900   ">
                                        <span className='currency-icon'><i class="fa-solid fa-indian-rupee-sign"></i> </span>
                                    </div>

                                    <div className="p-2 rounded-md bg-blue-900  ">
                                        <span className='currency-icon'><i class="fa-solid fa-dollar-sign"></i> </span>
                                    </div>
                                </div> */}
              </div>
            </div>

            <section className="pddg_sec ">
              <Container>
                <Row>
                  {/* <Col lg={6} md={6}>
                                        <div className='left'>
                                            <h2 className='head'>Learn all about the Stock Market</h2>
                                            <p className='desc'>
                                                With our jargon-free and expert-led Courses, Webinars, Events and self-help Videos
                                            </p>
                                        </div>
                                    </Col> */}

                  <Col lg={6} md={6} >
                    <div className="left h-100"  data-aos="fade-right">
                      <MDBCard 
                        style={{
                          padding:49,
                          borderRadius: "8px",
                        }}
                        border="none"
                      >
                        <MDBCardImage
                          fluid
                          src={`/logo.jpg`}
                          style={{
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        />
                        <MDBCardBody >
                          <a href="#">
                            {" "}
                            <MDBCardTitle className="head">
                              Learn all about the Stock Market
                            </MDBCardTitle>
                          </a>
                          <MDBCardText className="desc">
                            Online sessions on Risk Management, Options Trading,
                            Technical Analysis and more
                          </MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                  </Col>

                  <Col className="right">
                    <div className="media-object" data-aos="fade-left">
                      <MDBCard
                        border="none"
                        style={{
                         
                          borderRadius: "8px",
                        }}
                      >
                        <Row>
                          <Col sm={6} lg={5}>
                            <MDBCardImage
                              style={{
                                width:"100%",
                                borderEndStartRadius: "8px",
                              }}
                              src={`/logo.jpg`}
                              fluid
                            />
                          </Col>
                          <Col sm={6} lg={7} className="media-body">
                            <a href="/education-Educate-yourself">
                              <CardTitle className="w">Education Center</CardTitle>
                            </a>
                            <CardText>
                              Learn the fundamentals of trading and gain a
                              deeper understanding of how the stock market
                              operates through our educational resources
                            </CardText>
                          </Col>
                        </Row>
                      </MDBCard>
                    </div>

                    <div className="media-object" data-aos="fade-left">
                      <MDBCard className="h-100"
                        border="none"
                        style={{
                          
                          borderRadius: "8px",
                        }}
                      >
                        <Row style={{paddingBottom: 24}}>
                          <Col sm={6} >
                            <MDBCardImage
                              fluid
                              src={`/logo.jpg`}
                              style={{ borderEndStartRadius: "8px" }}
                            />
                          </Col>
                          <Col sm={6} className="media-body">
                            <a href="/news">
                              <CardTitle>
                                Stay Informed: Latest News in Trading and Stock
                                Markets
                              </CardTitle>
                            </a>
                            <CardText>
                              {" "}
                              The million-dollar question in online trading
                              boils down to no more than 'Which should I pick?'
                            </CardText>
                          </Col>
                        </Row>
                      </MDBCard>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}
