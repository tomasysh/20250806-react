"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image || "/images/default_avatar.jpg";

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setAuthProviders();
  }, [session]);

  return (
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
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto py-4 py-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link px-lg-3 py-3 py-lg-4" href="post.html">
                Sample Post
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">
                Contact
              </a>
            </li>
          </ul>
          {session && (
            <>
              <Image src={profileImage} alt="" width={40} height={40}></Image>
            </>
          )}
          {!session ? (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="login-button"
              >
                {provider.name} 登入 / 註冊
              </button>
            ))
          ) : (
            <button onClick={() => signOut()} className="logout-button">
              登出
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
