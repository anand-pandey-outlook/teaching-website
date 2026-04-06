import Head from "next/head";
import Script from "next/script";

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Utkarsh Home Tuition — Expert Tuition at Your Doorstep</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Baloo+2:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </Head>

  
  <div className="scroll-progress" id="scrollProgress"></div>

  
  <div className="toast-container" id="toastContainer"></div>

  
  <div className="popup-overlay" id="leadPopup">
    <div className="popup-card">
      <button className="popup-close" id="popupClose"><i className="fas fa-times"></i></button>
      <div className="popup-icon"><i className="fas fa-graduation-cap"></i></div>
      <h3>Get a FREE Demo Class!</h3>
      <p>Join 500+ students already learning with Utkarsh. No commitment needed.</p>
      <form className="popup-form" id="popupForm">
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Student's Name *" required />
        </div>
        <div className="input-group">
          <i className="fas fa-phone"></i>
          <input type="tel" placeholder="WhatsApp Number *" required pattern="[0-9]{10}" maxLength="10" />
        </div>
        <div className="input-group">
          <i className="fas fa-book"></i>
          <select required defaultValue="">
            <option value="" disabled>Select Class</option>
            <option>Class 1-5</option>
            <option>Class 6-8</option>
            <option>Class 9-10</option>
            <option>Class 11-12</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-full ripple">
          <i className="fab fa-whatsapp"></i> Book Free Demo Now
        </button>
      </form>
      <p className="popup-note"><i className="fas fa-shield-alt"></i> We never spam. Your number is safe with us.</p>
    </div>
  </div>

  <div className="popup-overlay thanks-overlay" id="thanksPopup">
    <div className="popup-card thanks-card">
      <button className="popup-close" id="thanksPopupClose"><i className="fas fa-times"></i></button>
      <div className="popup-icon thanks-icon"><i className="fas fa-check-circle"></i></div>
      <h3 id="thanksPopupTitle">Thank You!</h3>
      <p id="thanksPopupText">Your enquiry has been received successfully.</p>
      <button type="button" className="btn btn-primary btn-full ripple" id="thanksPopupOkBtn">
        <i className="fas fa-thumbs-up"></i> Great, Thanks
      </button>
    </div>
  </div>

  
  <nav className="navbar" id="navbar">
    <div className="container nav-inner">
      <a href="#home" className="logo">
        <span className="logo-icon"><i className="fas fa-graduation-cap"></i></span>
        <div>
          <span className="logo-main">Utkarsh</span>
          <span className="logo-sub">Home Tuition</span>
        </div>
      </a>
      <ul className="nav-links" id="navLinks">
        <li><a href="#home" className="nav-link">Home</a></li>
        <li className="dropdown">
          <a href="#classes" className="nav-link">Classes <i className="fas fa-chevron-down"></i></a>
          <div className="dropdown-menu">
            <a href="#classes"><i className="fas fa-user"></i> Individual Tuition</a>
            <a href="#classes"><i className="fas fa-users"></i> Group Tuition</a>
            <div className="divider"></div>
            <a href="#classes"><i className="fas fa-laptop"></i> Online Classes</a>
            <a href="#classes"><i className="fas fa-chalkboard-teacher"></i> Offline / Home Visit</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="#store" className="nav-link">Study Store <i className="fas fa-chevron-down"></i></a>
          <div className="dropdown-menu">
            <a href="#store"><i className="fas fa-book-open"></i> Notes</a>
            <a href="#store"><i className="fas fa-file-alt"></i> Study Material</a>
            <a href="#store"><i className="fas fa-clipboard-list"></i> Test Series</a>
          </div>
        </li>
        <li><a href="#why" className="nav-link">About</a></li>
        <li><a href="#contact" className="nav-link">Contact</a></li>
      </ul>
      <div className="nav-actions">
        <a href="tel:+919128296275" className="btn btn-ghost"><i className="fas fa-phone-alt"></i> Call Now</a>
        <button className="btn btn-primary ripple" onClick={() => window.openPopup && window.openPopup()}>Book Free Demo</button>
      </div>
      <button className="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  
  <section className="hero" id="home">
    <div className="hero-particles" id="heroParticles"></div>
    <div className="container hero-inner">
      <div className="hero-content" data-aos="fade-right">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Now Enrolling &mdash; Batch Starts Soon!</span>
        </div>
        <h1>
          Expert Tuition<br />
          <span className="typewriter-wrap">
            <span className="typewriter" id="typewriter"></span><span className="cursor-blink">|</span>
          </span>
        </h1>
        <p className="hero-sub">
          Quality education from Class 1&ndash;12. Individual &amp; Group, Online &amp; Offline.<br />
          CBSE &middot; ICSE &middot; State Board &mdash; all subjects covered.
        </p>
        <div className="hero-pills">
          <span><i className="fas fa-check-circle"></i> Verified Teachers</span>
          <span><i className="fas fa-check-circle"></i> Affordable Fees</span>
          <span><i className="fas fa-check-circle"></i> Hindi &amp; English Medium</span>
        </div>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg ripple" onClick={() => window.openPopup && window.openPopup()}>
            <i className="fas fa-rocket"></i> Book FREE Demo
          </button>
          <a href="#classes" className="btn btn-glass btn-lg">
            <i className="fas fa-compass"></i> Explore Classes
          </a>
        </div>
        <div className="hero-trust">
          <div className="trust-avatars">
            <span className="avatar">RS</span>
            <span className="avatar">AK</span>
            <span className="avatar">PG</span>
            <span className="avatar">MV</span>
          </div>
          <span>500+ students trust us</span>
        </div>
      </div>

      <div className="hero-right" data-aos="fade-left">
        <div className="hero-card glass-card">
          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-num-wrap"><span className="counter hstat-num" data-target="500">0</span><span className="hstat-plus">+</span></div>
              <span className="hstat-label">Students</span>
            </div>
            <div className="hstat-divider"></div>
            <div className="hstat">
              <div className="hstat-num-wrap"><span className="counter hstat-num" data-target="50">0</span><span className="hstat-plus">+</span></div>
              <span className="hstat-label">Teachers</span>
            </div>
            <div className="hstat-divider"></div>
            <div className="hstat">
              <div className="hstat-num-wrap"><span className="counter hstat-num" data-target="10">0</span><span className="hstat-plus">+</span></div>
              <span className="hstat-label">Yrs Exp.</span>
            </div>
          </div>
          <div className="subject-grid">
            <div className="sub-chip"><i className="fas fa-square-root-alt"></i> Maths</div>
            <div className="sub-chip"><i className="fas fa-flask"></i> Science</div>
            <div className="sub-chip"><i className="fas fa-book"></i> English</div>
            <div className="sub-chip"><i className="fas fa-language"></i> Hindi</div>
            <div className="sub-chip"><i className="fas fa-globe-asia"></i> SST</div>
            <div className="sub-chip"><i className="fas fa-laptop-code"></i> Computer</div>
          </div>
          <div className="rating-bar">
            <div className="stars">
              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              <i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
            </div>
            <span>4.8 / 5 from 200+ reviews</span>
          </div>
          <form className="hero-mini-form" id="heroMiniForm">
            <p className="mini-form-label"><i className="fas fa-bolt"></i> Quick Enquiry</p>
            <div className="mini-form-row">
              <input type="tel" placeholder="WhatsApp Number" maxLength="10" required />
              <button type="submit" className="btn btn-primary ripple">Go <i className="fas fa-arrow-right"></i></button>
            </div>
          </form>
        </div>
        <div className="float-badge float-badge-1"><i className="fas fa-shield-alt"></i> Background Verified</div>
        <div className="float-badge float-badge-2"><i className="fab fa-whatsapp"></i> Doubt on WhatsApp</div>
      </div>
    </div>
    <div className="hero-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,50 C300,100 900,0 1440,60 L1440,100 L0,100 Z" fill="var(--bg)"/>
      </svg>
    </div>
  </section>

  
  <section className="section" id="classes">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <span className="section-badge">Our Classes</span>
        <h2>Choose What Works for <span className="highlight">You</span></h2>
        <p>Flexible formats designed around every student's needs &amp; budget</p>
      </div>
      <div className="mode-tabs" data-aos="fade-up">
        <button className="mode-tab active" data-mode="all">All</button>
        <button className="mode-tab" data-mode="individual">Individual</button>
        <button className="mode-tab" data-mode="group">Group</button>
        <button className="mode-tab" data-mode="online">Online</button>
        <button className="mode-tab" data-mode="offline">Offline</button>
      </div>
      <div className="classes-grid" id="classesGrid">
        <a href="#enroll" className="class-card" data-mode="individual" data-aos="fade-up" data-aos-delay="0">
          <div className="card-glow card-glow-indigo"></div>
          <div className="card-icon-wrap indigo-icon"><i className="fas fa-user-graduate"></i></div>
          <h3>Individual Tuition</h3>
          <p>One-on-one sessions tailored completely to your child's pace and syllabus.</p>
          <ul className="card-features">
            <li><i className="fas fa-check"></i> Personalised lesson plan</li>
            <li><i className="fas fa-check"></i> Flexible timing</li>
            <li><i className="fas fa-check"></i> 100% dedicated attention</li>
          </ul>
          <div className="card-footer-row">
            <span className="card-price">From <strong>&#8377;800</strong>/mo</span>
            <span className="card-arrow"><i className="fas fa-arrow-right"></i></span>
          </div>
        </a>
        <a href="#enroll" className="class-card card-featured" data-mode="group" data-aos="fade-up" data-aos-delay="80">
          <div className="featured-ribbon">Best Value</div>
          <div className="card-glow card-glow-saffron"></div>
          <div className="card-icon-wrap saffron-icon"><i className="fas fa-users"></i></div>
          <h3>Group Tuition</h3>
          <p>Small batch (4&ndash;8 students) &mdash; collaborative, affordable &amp; competitive.</p>
          <ul className="card-features">
            <li><i className="fas fa-check"></i> Peer learning</li>
            <li><i className="fas fa-check"></i> Budget-friendly fees</li>
            <li><i className="fas fa-check"></i> Healthy competition</li>
          </ul>
          <div className="card-footer-row">
            <span className="card-price">From <strong>&#8377;300</strong>/mo</span>
            <span className="card-arrow"><i className="fas fa-arrow-right"></i></span>
          </div>
        </a>
        <a href="#enroll" className="class-card" data-mode="online" data-aos="fade-up" data-aos-delay="160">
          <div className="card-glow card-glow-blue"></div>
          <div className="card-icon-wrap blue-icon"><i className="fas fa-laptop"></i></div>
          <h3>Online Classes</h3>
          <p>Live interactive sessions from home &mdash; available across India.</p>
          <ul className="card-features">
            <li><i className="fas fa-check"></i> Live video sessions</li>
            <li><i className="fas fa-check"></i> Recorded lectures</li>
            <li><i className="fas fa-check"></i> Pan-India access</li>
          </ul>
          <div className="card-footer-row">
            <span className="card-price">From <strong>&#8377;500</strong>/mo</span>
            <span className="card-arrow"><i className="fas fa-arrow-right"></i></span>
          </div>
        </a>
        <a href="#enroll" className="class-card" data-mode="offline" data-aos="fade-up" data-aos-delay="240">
          <div className="card-glow card-glow-green"></div>
          <div className="card-icon-wrap green-icon"><i className="fas fa-chalkboard-teacher"></i></div>
          <h3>Home Visit / Offline</h3>
          <p>Teacher visits your home &mdash; traditional face-to-face learning.</p>
          <ul className="card-features">
            <li><i className="fas fa-check"></i> Teacher at your door</li>
            <li><i className="fas fa-check"></i> No travel needed</li>
            <li><i className="fas fa-check"></i> Best retention</li>
          </ul>
          <div className="card-footer-row">
            <span className="card-price">From <strong>&#8377;1000</strong>/mo</span>
            <span className="card-arrow"><i className="fas fa-arrow-right"></i></span>
          </div>
        </a>
      </div>
    </div>
  </section>

  
  <section className="section store-section" id="store">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <span className="section-badge">Study Store</span>
        <h2>Everything You Need to <span className="highlight">Excel</span></h2>
        <p>Buy only what you need &mdash; PDFs delivered on WhatsApp instantly</p>
      </div>
      <div className="store-grid">
        <div className="store-card" data-aos="fade-up" data-aos-delay="0">
          <div className="store-icon-wrap notes-icon"><i className="fas fa-book-open"></i></div>
          <h3>Notes</h3>
          <p>Chapter-wise concise notes for Class 6&ndash;12, CBSE / ICSE / State Board.</p>
          <div className="store-tags">
            <span><i className="fas fa-file-pdf"></i> PDF</span>
            <span><i className="fas fa-mobile-alt"></i> Mobile Friendly</span>
            <span><i className="fas fa-infinity"></i> Lifetime Access</span>
          </div>
          <div className="store-pricing">
            <div className="price-pill">&#8377;49 <small>/ chapter</small></div>
            <div className="price-pill price-full">&#8377;299 <small>full subject</small></div>
          </div>
          <a href="#store" className="btn btn-primary btn-full ripple">Browse Notes</a>
        </div>
        <div className="store-card store-featured" data-aos="fade-up" data-aos-delay="100">
          <div className="store-crown"><i className="fas fa-crown"></i> Most Popular</div>
          <div className="store-icon-wrap material-icon"><i className="fas fa-file-alt"></i></div>
          <h3>Study Material</h3>
          <p>Workbooks, solved examples, PYQs, shortcuts &amp; tips by expert teachers.</p>
          <div className="store-tags">
            <span><i className="fas fa-tasks"></i> Solved Examples</span>
            <span><i className="fas fa-history"></i> PYQs</span>
            <span><i className="fas fa-lightbulb"></i> Tricks &amp; Tips</span>
          </div>
          <div className="store-pricing">
            <div className="price-pill">&#8377;149 <small>/ subject</small></div>
            <div className="price-pill price-full">&#8377;799 <small>full bundle</small></div>
          </div>
          <a href="#store" className="btn btn-white btn-full ripple">Get Materials</a>
        </div>
        <div className="store-card" data-aos="fade-up" data-aos-delay="200">
          <div className="store-icon-wrap test-icon"><i className="fas fa-clipboard-list"></i></div>
          <h3>Test Series</h3>
          <p>Weekly, monthly &amp; full mock tests with analytics and leaderboard.</p>
          <div className="store-tags">
            <span><i className="fas fa-chart-bar"></i> Analytics</span>
            <span><i className="fas fa-redo"></i> Reattempt</span>
            <span><i className="fas fa-trophy"></i> Leaderboard</span>
          </div>
          <div className="store-pricing">
            <div className="price-pill">&#8377;99 <small>/ 5 tests</small></div>
            <div className="price-pill price-full">&#8377;499 <small>full series</small></div>
          </div>
          <a href="#store" className="btn btn-primary btn-full ripple">Start Practice</a>
        </div>
      </div>
      <div className="payment-strip" data-aos="fade-up">
        <span><i className="fas fa-lock"></i> 100% Secure Payments via</span>
        <div className="pay-icons">
          <span className="pay-badge">UPI</span>
          <span className="pay-badge">Paytm</span>
          <span className="pay-badge">Google Pay</span>
          <span className="pay-badge">PhonePe</span>
          <span className="pay-badge">Net Banking</span>
        </div>
      </div>
    </div>
  </section>

  
  <section className="section why-section" id="why">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <span className="section-badge">Why Utkarsh?</span>
        <h2>What Makes Us <span className="highlight">Different</span></h2>
      </div>
      <div className="why-grid">
        <div className="why-card" data-aos="zoom-in" data-aos-delay="0"><div className="why-icon"><i className="fas fa-user-tie"></i></div><h4>Verified Teachers</h4><p>Background-checked, B.Ed or subject-qualified, demo-tested before onboarding.</p></div>
        <div className="why-card" data-aos="zoom-in" data-aos-delay="60"><div className="why-icon"><i className="fas fa-rupee-sign"></i></div><h4>Affordable Fees</h4><p>Transparent pricing, zero hidden charges. EMI options available.</p></div>
        <div className="why-card" data-aos="zoom-in" data-aos-delay="120"><div className="why-icon"><i className="fas fa-clock"></i></div><h4>Flexible Timings</h4><p>Morning, evening, weekends &mdash; schedule as per your convenience.</p></div>
        <div className="why-card" data-aos="zoom-in" data-aos-delay="180"><div className="why-icon"><i className="fas fa-chart-line"></i></div><h4>Progress Reports</h4><p>Monthly performance reports shared with parents via WhatsApp.</p></div>
        <div className="why-card" data-aos="zoom-in" data-aos-delay="240"><div className="why-icon"><i className="fas fa-language"></i></div><h4>Hindi &amp; English Medium</h4><p>Teaching in Hindi and English as per student comfort.</p></div>
        <div className="why-card" data-aos="zoom-in" data-aos-delay="300"><div className="why-icon"><i className="fas fa-headset"></i></div><h4>7-Day Doubt Support</h4><p>WhatsApp doubt support available daily &mdash; even between classes.</p></div>
      </div>
    </div>
  </section>

  
  <section className="section testi-section">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <span className="section-badge">Reviews</span>
        <h2>Parents &amp; Students <span className="highlight">Love Us</span></h2>
      </div>
      <div className="testi-slider">
        <div className="testi-track" id="testiTrack">
          <div className="testi-card">
            <div className="testi-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
            <p>"Mere bete ka result bahut improve hua! Teacher bahut patient hain. Highly recommended for all parents!"</p>
            <div className="testi-author"><span className="t-av" style={{ background: "var(--indigo)" }}>RS</span><div><strong>Rekha Sharma</strong><small>Parent &middot; Class 8, Delhi</small></div></div>
          </div>
          <div className="testi-card testi-highlight">
            <div className="testi-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
            <p>"Got 94% in boards! The test series was a game changer. Notes were very concise and easy to revise. Best decision!"</p>
            <div className="testi-author"><span className="t-av" style={{ background: "var(--saffron)" }}>AK</span><div><strong>Arjun Kumar</strong><small>Student &middot; Class 12, UP</small></div></div>
          </div>
          <div className="testi-card">
            <div className="testi-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i></div>
            <p>"Online classes were super smooth. My daughter's confidence in Maths improved a lot. Fees are very reasonable!"</p>
            <div className="testi-author"><span className="t-av" style={{ background: "var(--green)" }}>PG</span><div><strong>Priya Gupta</strong><small>Parent &middot; Class 10, Lucknow</small></div></div>
          </div>
          <div className="testi-card">
            <div className="testi-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
            <p>"Teacher explains in Hindi which makes it easy for my son to understand. Very dedicated. 10/10!"</p>
            <div className="testi-author"><span className="t-av" style={{ background: "var(--blue)" }}>MV</span><div><strong>Manoj Verma</strong><small>Parent &middot; Class 9, Kanpur</small></div></div>
          </div>
        </div>
        <div className="testi-nav">
          <button className="testi-btn" id="testiPrev"><i className="fas fa-chevron-left"></i></button>
          <div className="testi-dots" id="testiDots"></div>
          <button className="testi-btn" id="testiNext"><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </section>

  
  <section className="section lead-section" id="enroll">
    <div className="container">
      <div className="lead-wrapper" data-aos="fade-up">
        <div className="lead-left">
          <span className="section-badge">Free Demo</span>
          <h2>Book Your FREE<br /><span className="highlight">Demo Class Today!</span></h2>
          <p>Fill the form &mdash; our team will call within 30 minutes to schedule your demo.</p>
          <ul className="lead-perks">
            <li><i className="fas fa-check-circle"></i> No payment needed for demo</li>
            <li><i className="fas fa-check-circle"></i> Choose your preferred time &amp; subject</li>
            <li><i className="fas fa-check-circle"></i> Get matched with the right teacher</li>
            <li><i className="fas fa-check-circle"></i> Decide after demo &mdash; zero pressure</li>
          </ul>
          <div className="lead-contact-quick">
            <a href="tel:+919128296275" className="quick-link"><i className="fas fa-phone-alt"></i> +91 91282 96275</a>
            <a href="https://wa.me/919128296275" className="quick-link whatsapp-link" target="_blank"><i className="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          </div>
        </div>
        <div className="lead-right">
          <div className="lead-form-card">
            <h4 id="leadFormTitle"><i className="fas fa-graduation-cap"></i> Enrolment Form</h4>
            <div className="lead-form-switch" id="leadFormSwitch">
              <button type="button" className="form-switch-btn active" data-form-type="student">Register as Student</button>
              <button type="button" className="form-switch-btn" data-form-type="teacher">Register as Teacher</button>
            </div>

            <div className="form-panel active" id="studentFormPanel">
              <form className="lead-form" id="leadForm">
                <div className="form-group">
                  <label>Student's Full Name *</label>
                  <div className="input-wrap"><i className="fas fa-user"></i><input type="text" name="name" placeholder="e.g. Rahul Sharma" required /></div>
                  <span className="field-error" id="err-name"></span>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Class *</label>
                  <div className="input-wrap"><i className="fas fa-layer-group"></i>
                    <select name="class" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Class 1</option><option>Class 2</option><option>Class 3</option>
                      <option>Class 4</option><option>Class 5</option><option>Class 6</option>
                      <option>Class 7</option><option>Class 8</option><option>Class 9</option>
                      <option>Class 10</option><option>Class 11</option><option>Class 12</option>
                    </select>
                  </div>
                  <span className="field-error" id="err-class"></span>
                </div>
                <div className="form-group">
                  <label>Board *</label>
                  <div className="input-wrap"><i className="fas fa-school"></i>
                    <select name="board" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>CBSE</option><option>ICSE</option><option>State Board</option><option>Other</option>
                    </select>
                  </div>
                  <span className="field-error" id="err-board"></span>
                </div>
              </div>
                <div className="form-group">
                  <label>Subject(s) Needed *</label>
                  <div className="subject-checkboxes">
                    <label className="check-pill"><input type="checkbox" name="subject" value="Maths" /> Maths</label>
                    <label className="check-pill"><input type="checkbox" name="subject" value="Science" /> Science</label>
                    <label className="check-pill"><input type="checkbox" name="subject" value="English" /> English</label>
                    <label className="check-pill"><input type="checkbox" name="subject" value="Hindi" /> Hindi</label>
                    <label className="check-pill"><input type="checkbox" name="subject" value="SST" /> SST</label>
                    <label className="check-pill"><input type="checkbox" name="subject" value="Computer" /> Computer</label>
                  </div>
                  <span className="field-error" id="err-subject"></span>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Mode *</label>
                  <div className="input-wrap"><i className="fas fa-sliders-h"></i>
                    <select name="mode" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Individual &mdash; Online</option>
                      <option>Individual &mdash; Offline</option>
                      <option>Group &mdash; Online</option>
                      <option>Group &mdash; Offline</option>
                    </select>
                  </div>
                  <span className="field-error" id="err-mode"></span>
                </div>
                <div className="form-group">
                  <label>Preferred Time *</label>
                  <div className="input-wrap"><i className="fas fa-clock"></i>
                    <select name="time" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Morning (7-10 AM)</option>
                      <option>Afternoon (12-3 PM)</option>
                      <option>Evening (4-7 PM)</option>
                      <option>Night (7-9 PM)</option>
                    </select>
                  </div>
                  <span className="field-error" id="err-time"></span>
                </div>
              </div>
                <div className="form-group">
                  <label>Parent's WhatsApp Number *</label>
                  <div className="input-wrap"><i className="fab fa-whatsapp"></i><input type="tel" name="phone" placeholder="10-digit mobile number" maxLength="10" required pattern="[0-9]{10}" /></div>
                  <span className="field-error" id="err-phone"></span>
                </div>
                <div className="form-group">
                  <label>City / Area</label>
                  <div className="input-wrap"><i className="fas fa-map-marker-alt"></i><input type="text" name="city" placeholder="e.g. Lucknow, Gomti Nagar" /></div>
                </div>
                <div className="form-group">
                  <label>Additional Message</label>
                  <div className="input-wrap textarea-wrap"><i className="fas fa-comment-alt"></i><textarea name="message" rows="3" placeholder="Any specific requirements or questions..."></textarea></div>
                </div>
                <button type="submit" className="btn btn-primary btn-full btn-xl ripple" id="submitBtn">
                  <i className="fab fa-whatsapp"></i> Book FREE Demo on WhatsApp
                </button>
                <p className="form-note"><i className="fas fa-shield-alt"></i> 100% confidential. We'll call within 30 mins.</p>
              </form>
            </div>

            <div className="form-panel" id="teacherFormPanel">
              <form className="lead-form" id="teacherForm">
                <div className="form-group">
                  <label>Teacher's Full Name *</label>
                  <div className="input-wrap"><i className="fas fa-user-tie"></i><input type="text" name="name" placeholder="e.g. Anjali Singh" required /></div>
                  <span className="field-error" id="teacher-err-name"></span>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Highest Qualification *</label>
                    <div className="input-wrap"><i className="fas fa-graduation-cap"></i><input type="text" name="qualification" placeholder="e.g. M.Sc Maths, B.Ed" required /></div>
                  </div>
                  <div className="form-group">
                    <label>Teaching Experience *</label>
                    <div className="input-wrap"><i className="fas fa-briefcase"></i>
                      <select name="experience" required defaultValue="">
                        <option value="" disabled>Select</option>
                        <option>0-1 years</option>
                        <option>1-3 years</option>
                        <option>3-5 years</option>
                        <option>5+ years</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Subjects You Can Teach *</label>
                  <div className="subject-checkboxes">
                    <label className="check-pill teacher-check-pill"><input type="checkbox" name="subject" value="Maths" /> Maths</label>
                    <label className="check-pill teacher-check-pill"><input type="checkbox" name="subject" value="Science" /> Science</label>
                    <label className="check-pill teacher-check-pill"><input type="checkbox" name="subject" value="English" /> English</label>
                    <label className="check-pill teacher-check-pill"><input type="checkbox" name="subject" value="Hindi" /> Hindi</label>
                    <label className="check-pill teacher-check-pill"><input type="checkbox" name="subject" value="SST" /> SST</label>
                    <label className="check-pill teacher-check-pill"><input type="checkbox" name="subject" value="Computer" /> Computer</label>
                  </div>
                  <span className="field-error" id="teacher-err-subject"></span>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Preferred Mode *</label>
                    <div className="input-wrap"><i className="fas fa-sliders-h"></i>
                      <select name="mode" required defaultValue="">
                        <option value="" disabled>Select</option>
                        <option>Offline (Home Visit)</option>
                        <option>Online</option>
                        <option>Both Online & Offline</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Available Time Slot *</label>
                    <div className="input-wrap"><i className="fas fa-clock"></i>
                      <select name="time" required defaultValue="">
                        <option value="" disabled>Select</option>
                        <option>Morning (6-10 AM)</option>
                        <option>Afternoon (11 AM-4 PM)</option>
                        <option>Evening (4-8 PM)</option>
                        <option>Flexible</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>WhatsApp Number *</label>
                  <div className="input-wrap"><i className="fab fa-whatsapp"></i><input type="tel" name="phone" placeholder="10-digit mobile number" maxLength="10" required pattern="[0-9]{10}" /></div>
                  <span className="field-error" id="teacher-err-phone"></span>
                </div>
                <div className="form-group">
                  <label>City / Area *</label>
                  <div className="input-wrap"><i className="fas fa-map-marker-alt"></i><input type="text" name="city" placeholder="e.g. Delhi, Rohini" required /></div>
                </div>
                <div className="form-group">
                  <label>Additional Message</label>
                  <div className="input-wrap textarea-wrap"><i className="fas fa-comment-alt"></i><textarea name="message" rows="3" placeholder="Mention classes, boards, or preferred localities..."></textarea></div>
                </div>
                <button type="submit" className="btn btn-primary btn-full btn-xl ripple" id="teacherSubmitBtn">
                  <i className="fab fa-whatsapp"></i> Apply as Teacher on WhatsApp
                </button>
                <p className="form-note"><i className="fas fa-user-check"></i> We verify every profile before onboarding.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section className="section faq-section" id="faq">
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <span className="section-badge">FAQ</span>
        <h2>Common <span className="highlight">Questions</span></h2>
      </div>
      <div className="faq-list" data-aos="fade-up">
        <div className="faq-item">
          <button className="faq-q">How do I book a demo class? <i className="fas fa-chevron-down faq-icon"></i></button>
          <div className="faq-a"><p>Simply fill the enrolment form above or click "Book Free Demo". Our team will call you within 30 minutes to schedule a convenient slot.</p></div>
        </div>
        <div className="faq-item">
          <button className="faq-q">What is the difference between Individual and Group tuition? <i className="fas fa-chevron-down faq-icon"></i></button>
          <div className="faq-a"><p>Individual tuition is 1-on-1 with full teacher attention and custom pace. Group tuition has 4&ndash;8 students in a batch &mdash; more affordable with a competitive peer environment.</p></div>
        </div>
        <div className="faq-item">
          <button className="faq-q">Is online tuition as effective as offline? <i className="fas fa-chevron-down faq-icon"></i></button>
          <div className="faq-a"><p>Yes! Our online sessions are live and interactive via Zoom/Google Meet. Students get recorded sessions too. Many students have achieved 90%+ marks with our online mode.</p></div>
        </div>
        <div className="faq-item">
          <button className="faq-q">Can I buy study materials without enrolling in classes? <i className="fas fa-chevron-down faq-icon"></i></button>
          <div className="faq-a"><p>Absolutely. Notes, Study Material and Test Series are available for individual purchase in our Study Store. No class enrollment required.</p></div>
        </div>
        <div className="faq-item">
          <button className="faq-q">What payment methods are accepted? <i className="fas fa-chevron-down faq-icon"></i></button>
          <div className="faq-a"><p>We accept UPI, Paytm, Google Pay, PhonePe, and bank transfer. Monthly and quarterly payment options available. No hidden fees.</p></div>
        </div>
        <div className="faq-item">
          <button className="faq-q">What if I am not satisfied with the teacher? <i className="fas fa-chevron-down faq-icon"></i></button>
          <div className="faq-a"><p>We offer a free teacher replacement &mdash; no questions asked. Your satisfaction and your child's learning is our top priority.</p></div>
        </div>
      </div>
    </div>
  </section>

  
  <section className="section contact-section" id="contact">
    <div className="container contact-grid">
      <div className="contact-info" data-aos="fade-right">
        <span className="section-badge">Contact Us</span>
        <h2>Let's Get <span className="highlight">Connected</span></h2>
        <div className="contact-items">
          <div className="ci"><div className="ci-icon"><i className="fas fa-phone-alt"></i></div><div><strong>Call / WhatsApp</strong><a href="tel:+919128296275">+91 91282 96275</a></div></div>
          <div className="ci"><div className="ci-icon ci-wa"><i className="fab fa-whatsapp"></i></div><div><strong>WhatsApp Chat</strong><a href="https://wa.me/919128296275" target="_blank">Message Us Now</a></div></div>
          <div className="ci"><div className="ci-icon ci-loc"><i className="fas fa-map-marker-alt"></i></div><div><strong>Service Area</strong><span>Delhi NCR, Lucknow &amp; Online &mdash; Pan India</span></div></div>
          <div className="ci"><div className="ci-icon ci-time"><i className="fas fa-clock"></i></div><div><strong>Available</strong><span>Mon&ndash;Sat: 7 AM &ndash; 9 PM</span></div></div>
        </div>
        <div className="social-row">
          <a href="#" className="social-btn yt"><i className="fab fa-youtube"></i></a>
          <a href="#" className="social-btn ig"><i className="fab fa-instagram"></i></a>
          <a href="#" className="social-btn fb"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-btn tg"><i className="fab fa-telegram-plane"></i></a>
        </div>
      </div>
      <div className="contact-form-card" data-aos="fade-left">
        <h4><i className="fas fa-envelope"></i> Send a Quick Message</h4>
        <form className="contact-form" id="contactForm">
          <div className="input-wrap"><i className="fas fa-user"></i><input type="text" placeholder="Your Name *" required /></div>
          <div className="input-wrap"><i className="fas fa-phone"></i><input type="tel" placeholder="Phone / WhatsApp *" maxLength="10" required /></div>
          <div className="input-wrap"><i className="fas fa-comment-alt"></i><textarea rows="4" placeholder="Your message or question..."></textarea></div>
          <button type="submit" className="btn btn-primary btn-full ripple"><i className="fab fa-whatsapp"></i> Send on WhatsApp</button>
        </form>
      </div>
    </div>
  </section>

  
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-brand">
        <div className="logo">
          <span className="logo-icon"><i className="fas fa-graduation-cap"></i></span>
          <div><span className="logo-main">Utkarsh Home Tuition</span><span className="footer-tag">Shiksha se Utkarsh tak</span></div>
        </div>
        <p>Quality home tuition for Class 1&ndash;12. Helping students achieve their full potential since 2015.</p>
        <div className="social-row">
          <a href="#" className="social-btn-sm"><i className="fab fa-youtube"></i></a>
          <a href="#" className="social-btn-sm"><i className="fab fa-instagram"></i></a>
          <a href="#" className="social-btn-sm"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-btn-sm"><i className="fab fa-telegram-plane"></i></a>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-col"><h5>Classes</h5><a href="#classes">Individual Tuition</a><a href="#classes">Group Tuition</a><a href="#classes">Online Classes</a><a href="#classes">Offline / Home Visit</a></div>
        <div className="footer-col"><h5>Study Store</h5><a href="#store">Notes</a><a href="#store">Study Material</a><a href="#store">Test Series</a></div>
        <div className="footer-col"><h5>Quick Links</h5><a href="#why">About Us</a><a href="#faq">FAQ</a><a href="#contact">Contact</a><a href="#">Privacy Policy</a><a href="#">Refund Policy</a></div>
      </div>
    </div>
    <div className="footer-bottom"><p>&copy; 2026 Utkarsh Home Tuition &middot; Made with <i className="fas fa-heart"></i> in India</p></div>
  </footer>

  
  <a href="https://wa.me/919128296275?text=Hi!%20I%20want%20to%20know%20more%20about%20Utkarsh%20Home%20Tuition." className="wa-float" target="_blank" aria-label="Chat on WhatsApp">
    <i className="fab fa-whatsapp"></i>
    <span className="wa-tooltip">Chat with us!</span>
    <span className="wa-pulse"></span>
  </a>

  
  <button className="back-top" id="backTop" aria-label="Back to top"><i className="fas fa-arrow-up"></i></button>

  
  <div className="sticky-cta" id="stickyCta">
    <button className="btn btn-primary btn-full ripple" onClick={() => window.openPopup && window.openPopup()}>
      <i className="fas fa-graduation-cap"></i> Book FREE Demo Class
    </button>
  </div>

      <Script src="/main.js" strategy="afterInteractive" />
    </>
  );
}
