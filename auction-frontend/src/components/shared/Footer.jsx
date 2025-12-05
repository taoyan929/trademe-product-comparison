/**
 * Footer Component
 *
 * Main footer with multi-column navigation and copyright info.
 * Based on Trade Me design - DO NOT modify without team discussion.
 */

import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Main Navigation Section */}
      <div className="footer__nav">
        <div className="container">
          <div className="footer__nav-grid">
            
            {/* Marketplace Column */}
            <div className="footer__column">
              <h3 className="footer__heading">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="footer__icon">
                  <path d="M14 4H12C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4H2C0.9 4 0 4.9 0 6V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6C16 4.9 15.1 4 14 4ZM6 8C6 8.55 5.55 9 5 9C4.45 9 4 8.55 4 8V6H6V8ZM8 2C9.1 2 10 2.9 10 4H6C6 2.9 6.9 2 8 2ZM12 8C12 8.55 11.55 9 11 9C10.45 9 10 8.55 10 8V6H12V8Z"/>
                </svg>
                Marketplace
              </h3>
              <ul className="footer__links">
                <li><Link to="/marketplace">Latest deals</Link></li>
                <li><Link to="/stores">Stores</Link></li>
                <li><Link to="/closing-soon">Closing soon</Link></li>
                <li><Link to="/reserve">$1 reserve</Link></li>
                <li><Link to="/home-living">Home & Living</Link></li>
              </ul>
            </div>

            {/* Property Column */}
            <div className="footer__column">
              <h3 className="footer__heading">
                <svg width="16" height="16" viewBox="0 0 24 22" fill="currentColor" className="footer__icon">
                  <path d="M0 10.9212C0 11.4234 0.390137 11.7269 0.873206 11.7269C1.17129 11.7269 1.40756 11.5805 1.61315 11.3711L11.6405 2.07105C11.7532 1.95589 11.8768 1.91394 12.0101 1.91394C12.1337 1.91394 12.2468 1.95589 12.3695 2.07105L22.3868 11.3711C22.6025 11.5805 22.8388 11.7269 23.1268 11.7269C23.6094 11.7269 24 11.4234 24 10.9212C24 10.6074 23.8869 10.4088 23.6918 10.2307L20.1368 6.93579V0.752988C20.1368 0.292804 19.8492 0 19.3973 0H18.0515C17.6096 0 17.3015 0.292804 17.3015 0.752988V4.30993L13.2327 0.522672C12.8732 0.177646 12.4313 0.0107124 12 0.0107124C11.5682 0.0107124 11.1369 0.178092 10.7669 0.523119L0.308164 10.2307C0.123178 10.4088 0 10.6074 0 10.9212Z"/>
                </svg>
                Property
              </h3>
              <ul className="footer__links">
                <li><Link to="/property">International property</Link></li>
                <li><Link to="/property/news">News & guides</Link></li>
                <li><Link to="/property/sold">Sold Properties</Link></li>
                <li><Link to="/property/onehub">OneHub for agents</Link></li>
                <li><Link to="/property/agents">Find a Real Estate Agent</Link></li>
              </ul>
            </div>

            {/* Motors Column */}
            <div className="footer__column">
              <h3 className="footer__heading">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="footer__icon">
                  <path d="M13.764 0C14.3211 1.8928e-05 14.8671 0.155134 15.341 0.447969C15.8148 0.740804 16.1978 1.15979 16.447 1.658L17.833 4.429C18.077 4.329 18.317 4.221 18.553 4.105C18.7904 3.98645 19.0651 3.96705 19.3168 4.05106C19.5685 4.13508 19.7764 4.31563 19.895 4.553C20.0136 4.79037 20.033 5.06511 19.9489 5.31678C19.8649 5.56846 19.6844 5.77645 19.447 5.895L18.722 6.207L19.683 8.13C19.8916 8.54695 20.0001 9.00678 20 9.473V12C20 12.4221 19.9109 12.8394 19.7386 13.2247C19.5663 13.61 19.3146 13.9546 19 14.236V15.5C19 15.8978 18.842 16.2794 18.5607 16.5607C18.2794 16.842 17.8978 17 17.5 17C17.1022 17 16.7206 16.842 16.4393 16.5607C16.158 16.2794 16 15.8978 16 15.5V15H4V15.5C4 15.8978 3.84196 16.2794 3.56066 16.5607C3.27936 16.842 2.89782 17 2.5 17C2.10218 17 1.72064 16.842 1.43934 16.5607C1.15804 16.2794 1 15.8978 1 15.5V14.236C0.386 13.686 0 12.888 0 12V9.472C0.000186879 9.00646 0.108716 8.54735 0.317 8.131L1.27 6.223L0.555 5.896C0.318832 5.77591 0.13931 5.56782 0.0551326 5.3166C-0.0290444 5.06538 -0.011135 4.79114 0.105 4.553C0.163659 4.43543 0.244912 4.33057 0.344116 4.24442C0.443321 4.15826 0.558531 4.0925 0.683161 4.0509C0.807792 4.00929 0.939401 3.99266 1.07046 4.00194C1.20153 4.01122 1.32948 4.04624 1.447 4.105C1.68367 4.22167 1.92367 4.32967 2.167 4.429L3.553 1.659C3.80205 1.16061 4.18497 0.741412 4.65885 0.448394C5.13273 0.155376 5.67884 0.000111784 6.236 0H13.764Z"/>
                </svg>
                Motors
              </h3>
              <ul className="footer__links">
                <li><Link to="/motors">Browse all cars</Link></li>
                <li><Link to="/motors/vehicles">Other vehicles</Link></li>
                <li><Link to="/motors/buying">Buying & Selling</Link></li>
                <li><Link to="/motors/news">Dealer news & info</Link></li>
                <li><Link to="/motors/sell">Sell my car</Link></li>
              </ul>
            </div>

            {/* Jobs Column */}
            <div className="footer__column">
              <h3 className="footer__heading">
                <svg width="16" height="16" viewBox="0 0 24 21" fill="currentColor" className="footer__icon">
                  <path d="M21.6 3.59998H2.4C1.76348 3.59998 1.15303 3.85283 0.702944 4.30292C0.252856 4.75301 0 5.36346 0 5.99998V9.59998C0 10.2365 0.252856 10.8469 0.702944 11.297C1.15303 11.7471 1.76348 12 2.4 12H7.2V10.8C7.2 10.4817 7.32643 10.1765 7.55147 9.95145C7.77652 9.7264 8.08174 9.59998 8.4 9.59998C8.71826 9.59998 9.02348 9.7264 9.24853 9.95145C9.47357 10.1765 9.6 10.4817 9.6 10.8V12H14.4V10.8C14.4 10.4817 14.5264 10.1765 14.7515 9.95145C14.9765 9.7264 15.2817 9.59998 15.6 9.59998C15.9183 9.59998 16.2235 9.7264 16.4485 9.95145C16.6736 10.1765 16.8 10.4817 16.8 10.8V12H21.6C22.2365 12 22.847 11.7471 23.2971 11.297C23.7471 10.8469 24 10.2365 24 9.59998V5.99998C24 5.36346 23.7471 4.75301 23.2971 4.30292C22.847 3.85283 22.2365 3.59998 21.6 3.59998Z"/>
                </svg>
                Jobs
              </h3>
              <ul className="footer__links">
                <li><Link to="/jobs">Browse categories</Link></li>
                <li><Link to="/jobs/advice">Careers advice</Link></li>
                <li><Link to="/jobs/jobsmart">JobSmart</Link></li>
                <li><Link to="/jobs/advertisers">Advertisers advice</Link></li>
                <li><Link to="/jobs/salary">Salary guide</Link></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="footer__column">
              <h3 className="footer__heading">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="footer__icon">
                  <path d="M18.75 5.6123C18.75 5.1823 18.694 4.7633 18.589 4.3663C18.497 4.0173 18.067 3.9343 17.813 4.1893L16.09 5.9123C15.9258 6.07645 15.731 6.20667 15.5165 6.2955C15.302 6.38434 15.0721 6.43007 14.84 6.43007C14.6079 6.43007 14.378 6.38434 14.1635 6.2955C13.949 6.20667 13.7542 6.07645 13.59 5.9123C13.4258 5.74815 13.2956 5.55327 13.2068 5.3388C13.118 5.12432 13.0722 4.89445 13.0722 4.6623C13.0722 4.43015 13.118 4.20028 13.2068 3.98581C13.2956 3.77133 13.4258 3.57645 13.59 3.4123L15.313 1.6903C15.568 1.4353 15.485 1.0053 15.136 0.913301C14.2804 0.685721 13.3789 0.696192 12.5288 0.943582C11.6787 1.19097 10.9123 1.66588 10.3124 2.31703C9.71251 2.96819 9.30189 3.77084 9.12488 4.63832C8.94787 5.50581 9.01118 6.40517 9.308 7.2393C9.379 7.4393 9.339 7.6633 9.19 7.8123L1.05 15.9523C0.65 16.3523 0.65 17.0013 1.05 17.4003L2.102 18.4523C2.502 18.8523 3.149 18.8523 3.549 18.4523L11.689 10.3123C11.839 10.1623 12.063 10.1223 12.262 10.1933C12.9954 10.454 13.7807 10.5348 14.5518 10.4288C15.323 10.3228 16.0573 10.0331 16.6932 9.58419C17.329 9.13524 17.8477 8.54012 18.2057 7.84893C18.5636 7.15773 18.7503 6.39068 18.75 5.6123Z"/>
                </svg>
                Services
              </h3>
              <ul className="footer__links">
                <li><Link to="/services/trades">Trades</Link></li>
                <li><Link to="/services/domestic">Domestic services</Link></li>
                <li><Link to="/services/events">Events & entertainment</Link></li>
                <li><Link to="/services/health">Health & wellbeing</Link></li>
                <li><Link to="/services/list">List my services</Link></li>
              </ul>
            </div>

            {/* Community Column */}
            <div className="footer__column">
              <h3 className="footer__heading">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="footer__icon">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M8 4v4l3 3" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                Community
              </h3>
              <ul className="footer__links">
                <li><Link to="/community/help">Help</Link></li>
                <li><Link to="/community/announcements">Announcements</Link></li>
                <li><Link to="/community/trust">Trust & safety</Link></li>
                <li><Link to="/community/seller">Seller information</Link></li>
                <li><Link to="/community/help-center">Help center community</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Partner Links Section */}
      <div className="footer__partners">
        <div className="container">
          <div className="footer__partners-grid">
            <a href="https://www.trademe.co.nz/insurance" className="footer__partner-link">Trade Me Insurance</a>
            <a href="https://homes.co.nz" className="footer__partner-link">homes.co.nz</a>
            <a href="https://www.motorweb.co.nz" className="footer__partner-link">MotorWeb</a>
            <a href="https://www.holidayhouses.co.nz" className="footer__partner-link">Holiday Houses</a>
            <a href="https://www.findsomeone.co.nz" className="footer__partner-link">FindSomeone</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">© 2025 Trade Me Limited</p>
            
            <nav className="footer__bottom-links">
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/advertise">Advertise</Link>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms & conditions</Link>
              <Link to="/contact">Contact Us</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}