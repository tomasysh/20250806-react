export default function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="index.html">
            Start Bootstrap
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-lg-3 py-3 py-lg-4" href="about.html">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-lg-3 py-3 py-lg-4" href="post.html">
                  Sample Post
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link px-lg-3 py-3 py-lg-4"
                  href="contact.html"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Page Header*/}
      <header
        className="masthead"
        style={{ backgroundImage: 'url("assets/img/home-bg.jpg")' }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Clean Blog</h1>
                <span className="subheading">
                  A Blog Theme by Start Bootstrap
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content*/}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* Post preview*/}
            <div className="post-preview">
              <a href="post.html">
                <h2 className="post-title">
                  Man must explore, and this is exploration at its greatest
                </h2>
                <h3 className="post-subtitle">
                  Problems look mighty small from 150 miles up
                </h3>
              </a>
              <p className="post-meta">
                Posted by
                <a href="#!">Start Bootstrap</a>
                on September 24, 2023
              </p>
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            {/* Post preview*/}
            <div className="post-preview">
              <a href="post.html">
                <h2 className="post-title">
                  I believe every human has a finite number of heartbeats. I do
                  not intend to waste any of mine.
                </h2>
              </a>
              <p className="post-meta">
                Posted by
                <a href="#!">Start Bootstrap</a>
                on September 18, 2023
              </p>
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            {/* Post preview*/}
            <div className="post-preview">
              <a href="post.html">
                <h2 className="post-title">
                  Science has not yet mastered prophecy
                </h2>
                <h3 className="post-subtitle">
                  We predict too much for the next year and yet far too little
                  for the next ten.
                </h3>
              </a>
              <p className="post-meta">
                Posted by
                <a href="#!">Start Bootstrap</a>
                on August 24, 2023
              </p>
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            {/* Post preview*/}
            <div className="post-preview">
              <a href="post.html">
                <h2 className="post-title">Failure is not an option</h2>
                <h3 className="post-subtitle">
                  Many say exploration is part of our destiny, but it’s actually
                  our duty to future generations.
                </h3>
              </a>
              <p className="post-meta">
                Posted by
                <a href="#!">Start Bootstrap</a>
                on July 8, 2023
              </p>
            </div>
            {/* Divider*/}
            <hr className="my-4" />
            {/* Pager*/}
            <div className="d-flex justify-content-end mb-4">
              <a className="btn btn-primary text-uppercase" href="#!">
                Older Posts →
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer*/}
      <footer className="border-top">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <ul className="list-inline text-center">
                <li className="list-inline-item">
                  <a href="#!">
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                    </span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                    </span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-github fa-stack-1x fa-inverse" />
                    </span>
                  </a>
                </li>
              </ul>
              <div className="small text-center text-muted fst-italic">
                Copyright © Your Website 2023
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
