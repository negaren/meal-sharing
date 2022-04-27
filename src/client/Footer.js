import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className='"footer-left"'>
            {/* <div className="footer-container">
                <p>hi</p>
            </div> */}
            <div className="footer-left">
          <image src="img/logo.png" />
				<p className="footer-links">
					<a href="#" className="footer-links">Home</a>
					|
					<a href="#" className="footer-links">Blog</a>
					|
					<a href="#" className="footer-links">About</a>
					|
					<a href="#" className="footer-links">Contact</a>
				</p>

				<p className="footer-company-name">© 2019 Negar HYF Solutions :p </p>
			</div>

			<div className="footer-center">
				<div>
					<i className="fa fa-map-marker"></i>
					  <p><span>Copenhagen, Denmark</span>
						</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+45 XX XX XX XX</p>
				</div>
				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:negar.en@gmail.com" className="footer-links">negar.en@gmail.com</a></p>
				</div>
			</div>
			<div className="footer-right">
				<p className="footer-company-about">
					<span>About the company: </span>
					we offer training and skill building courses across Technology, Design, Management, Science and Humanities.</p>
				<div className="footer-icons">
					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-instagram"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-youtube"></i></a>
				</div>
			</div>
        </footer>
    )
}

export default Footer