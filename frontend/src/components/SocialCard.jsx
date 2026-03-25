import React from "react";
import styled from "styled-components";

function SocialCard() {
  return (
    <StyledWrapper>
      <div className="card">
        <ul>
          <li className="iso-pro">
            <span />
            <span />
            <span />
            <a href="mailto:mouadhhjeljeli@gmail.com" aria-label="Email">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M502.3 190.8 327.4 338c-15.2 12.8-37.5 12.8-52.7 0L9.7 190.8C3.9 186 0 178.9 0 171.2V112c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v59.2c0 7.7-3.9 14.8-9.7 19.6zM0 214.8l166.4 140.1L12.5 487.4C4.5 480.2 0 469.9 0 459V214.8zm196.8 165.9 47 39.6c7.3 6.1 15.7 9.2 24.2 9.2s16.9-3.1 24.2-9.2l47-39.6L499.5 487.4c-8 7.2-18.3 11.6-29.5 11.6H42c-11.2 0-21.5-4.4-29.5-11.6L196.8 380.7zM345.6 354.9 512 214.8V459c0 10.9-4.5 21.2-12.5 28.4L345.6 354.9z" />
              </svg>
            </a>
            <div className="text">Email</div>
          </li>
          <li className="iso-pro">
            <span />
            <span />
            <span />
            <a href="https://www.facebook.com/m0u4dhh" aria-label="Facebook">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <div className="text">Facebook</div>
          </li>
          <li className="iso-pro">
            <span />
            <span />
            <span />
            <a href="https://www.github.com/Mmouadh" aria-label="GitHub">
              <svg
                viewBox="0 0 496 512"
                xmlns="http://www.w3.org/2000/svg"
                className="svg"
              >
                <path d="M248 8C111 8 0 119 0 256c0 109.8 71.2 202.9 170 235.8 12.4 2.3 16.9-5.4 16.9-12 0-5.9-.2-21.5-.3-42.2-69.2 15-83.8-33.4-83.8-33.4-11.3-28.7-27.6-36.4-27.6-36.4-22.6-15.5 1.7-15.2 1.7-15.2 25 1.8 38.2 25.7 38.2 25.7 22.2 38 58.3 27 72.5 20.7 2.2-16.1 8.7-27 15.8-33.2-55.2-6.3-113.3-27.6-113.3-122.8 0-27.1 9.7-49.3 25.6-66.7-2.6-6.3-11.1-31.6 2.4-65.9 0 0 20.9-6.7 68.5 25.5 19.9-5.5 41.3-8.2 62.5-8.3 21.2.1 42.6 2.8 62.5 8.3 47.6-32.2 68.5-25.5 68.5-25.5 13.5 34.3 5 59.6 2.4 65.9 15.9 17.4 25.6 39.6 25.6 66.7 0 95.4-58.2 116.5-113.6 122.7 8.9 7.7 16.9 22.9 16.9 46.1 0 33.3-.3 60.1-.3 68.3 0 6.7 4.5 14.4 17 12C424.8 458.9 496 365.8 496 256 496 119 385 8 248 8z" />
              </svg>
            </a>
            <div className="text">GitHub</div>
          </li>
          <li className="iso-pro">
            <span />
            <span />
            <span />
            <a href="https://www.linkedin.com/in/mouadh-jeljeli/" aria-label="LinkedIn">
              <svg
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
                className="svg"
              >
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8A53.79 53.79 0 0 1 53.79 0a53.79 53.79 0 0 1 0 107.6zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </a>
            <div className="text">LinkedIn</div>
          </li>
        </ul>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    max-width: fit-content;
    display: flex;
    justify-content: center;
  }

  .card ul {
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .card ul li {
    cursor: pointer;
    position: relative;
  }

  .svg {
    transition: all 0.3s;
    padding: 1rem;
    height: 60px;
    width: 60px;
    border-radius: 100%;
    color: rgb(255, 174, 0);
    fill: currentColor;
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.3),
      inset 0 0 5px rgba(255, 255, 255, 0.5),
      0 5px 5px rgba(0, 0, 0, 0.164);
  }

  .text {
    opacity: 0;
    border-radius: 5px;
    padding: 5px;
    transition: all 0.3s;
    color: rgb(255, 174, 0);
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    z-index: 9999;
    box-shadow:
      -5px 0 1px rgba(153, 153, 153, 0.2),
      -10px 0 1px rgba(153, 153, 153, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.3),
      inset 0 0 5px rgba(255, 255, 255, 0.5),
      0 5px 5px rgba(0, 0, 0, 0.082);
  }

  .iso-pro {
    transition: 0.5s;
  }

  .iso-pro:hover a > .svg {
    transform: translate(15px, -15px);
    border-radius: 100%;
  }

  .iso-pro:hover .text {
    opacity: 1;
    transform: translate(25px, -2px) skew(-5deg);
  }

  .iso-pro:hover .svg {
    transform: translate(5px, -5px);
  }

  .iso-pro span {
    opacity: 0;
    position: absolute;
    color: #1877f2;
    border-color: #1877f2;
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.3),
      inset 0 0 5px rgba(255, 255, 255, 0.5),
      0 5px 5px rgba(0, 0, 0, 0.164);
    border-radius: 50%;
    transition: all 0.3s;
    height: 60px;
    width: 60px;
  }

  .iso-pro:hover span {
    opacity: 1;
  }

  .iso-pro:hover span:nth-child(1) {
    opacity: 0.2;
  }

  .iso-pro:hover span:nth-child(2) {
    opacity: 0.4;
    transform: translate(5px, -5px);
  }

  .iso-pro:hover span:nth-child(3) {
    opacity: 0.6;
    transform: translate(10px, -10px);
  }
`;

export default SocialCard;
