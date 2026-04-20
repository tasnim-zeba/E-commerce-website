import React from 'react';
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"

function Footer() {
    return (
        <footer id="footer">
            <div class="leftFooter">
                <h4>Download Our App</h4>
                <p>Download App for Android and IOS mobile phone.</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>
            <div class="midFooter">
                <h1>Ecommerce</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2022 &copy; Lorin</p>
            </div>
            <div class="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.facebook.com/lorin.official.7" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.instagram.com/lorin.official/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.linkedin.com/in/lorin-zhang-9b1b6521b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </footer>
    );
}
export default Footer;