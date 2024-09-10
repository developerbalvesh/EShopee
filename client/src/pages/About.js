import React from "react";
import Layout from "../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHeadphones } from "react-icons/md";

const About = () => {
  return (
    <>
      <Layout title={"EShopee | About us"}>
        <div className="about animate__animated animate__fadeIn">
          <img src="/about-us.png" alt="" />
          <div>
            <h2>About us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates deleniti, velit repudiandae aperiam sint possimus
              laboriosam nulla? Dolor aliquid et ad animi distinctio nesciunt
              molestias. Id aliquid nobis voluptas vel?
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
