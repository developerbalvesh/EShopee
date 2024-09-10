import React from "react";
import Layout from "../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHeadphones } from "react-icons/md";

const Contact = () => {
  return (
    <>
      <Layout title={"EShopee | Contact us"}>
        <div className="contact  animate__animated animate__fadeIn">
          <img src="/shopping-contact.png" alt="" />
          <div className="contact-detail">
            <h2>Contact Us</h2>
            <p>
              any query and info about product feel free to call anytime we 24x7
              available
            </p>
            <ul>
              <li>
                <MdEmail /> : www.help@eshopee.com
              </li>
              <li>
                <FaPhoneAlt /> : +91 2345678910
              </li>
              <li>
                <MdHeadphones /> : 1400-1250-4520
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
