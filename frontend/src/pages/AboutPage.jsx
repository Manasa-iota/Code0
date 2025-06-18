import React from "react";
import Footer from "../components/home/Footer";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <main className="relative">
        <div className="hero min-h-[70vh] bg-base-100">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-7xl font-bold">About</h1>
              <h1 className="text-7xl font-bold">
                <span className="logo">
                  <span className="text-primary">Code</span>0
                </span>
              </h1>
              <p className="py-6 text-base-content/80 text-md">
                Code0 is a modern coding platform built to help developers
                practice, learn, and grow. From beginner to pro, we’ve got tools for everyone.
              </p>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Developers</div>
                  <div className="stat-value text-primary">100+</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Problems</div>
                  <div className="stat-value text-secondary">50+</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Countries</div>
                  <div className="stat-value">10+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="card lg:card-side bg-base-200 shadow-xl flex items-center gap-18">
              <figure className="lg:w-1/2">
                <img
                  src="./LandingPage.png"
                  alt="Team collaborating on project"
                  className="rounded-lg h-full object-cover"
                />
              </figure>
              <div className="card-body lg:w-1/2">
                <h2 className="card-title text-3xl">About This Project</h2>
                <p className="my-4 text-base-content/80 text-lg">
                  Code0 was developed as a hands-on learning project to combine
                  frontend, backend, and DevOps into a unified platform for coding practice.
                </p>
                <p className="my-4 text-base-content/80 text-lg">
                  From building code execution features to integrating OAuth and problem playlists,
                  Code0 is a testament to full-stack engineering in action.
                </p>
                <div className="card bg-primary text-primary-content mt-6">
                  <div className="card-body">
                    <h3 className="card-title">Our Mission</h3>
                    <p>
                      To empower developers through accessible, high-quality
                      coding practice tools and community features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-base-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
              <div className="card bg-base-200 hover:shadow-xl transition-all">
                <div className="card-body items-center text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="card-title">Developer-First</h3>
                  <p>We build for learners and developers at every level.</p>
                </div>
              </div>
              <div className="card bg-base-200 hover:shadow-xl transition-all">
                <div className="card-body items-center text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="card-title">Accessible Learning</h3>
                  <p>Learning to code should be free and open to all.</p>
                </div>
              </div>
              <div className="card bg-base-200 hover:shadow-xl transition-all">
                <div className="card-body items-center text-center">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="card-title">Innovation</h3>
                  <p>We aim to continuously improve and adopt new tech fast.</p>
                </div>
              </div>
              <div className="card bg-base-200 hover:shadow-xl transition-all">
                <div className="card-body items-center text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="card-title">Quality Practice</h3>
                  <p>Every problem and feature is designed for real-world prep.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-base-200">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center">
            <h2 className="card-title text-3xl text-center py-3 pb-5">Who's Behind It?</h2>
            <div className="card lg:card-side bg-base-200 shadow-xl flex items-center gap-18">
              <figure className="lg:w-1/3">
                <img
                  src="./profile.jpg"
                  alt="Manasa"
                  className="rounded-lg h-full object-cover"
                />
              </figure>
              <div className="card-body lg:w-1/2">
                <p className="my-4 text-base-content/80 text-xl">
                  Hi, I’m Manasa – a passionate developer who built Code0 from scratch
                  as a way to combine design, performance, and education into one powerful platform.
                </p>
                <p className="my-4 text-xl text-base-content/80">
                  I’m constantly exploring new tools, building backend systems, and delivering intuitive user experiences.
                  This project reflects my commitment to open-source learning and full-stack craftsmanship.
                </p>
                <div className="flex items-center gap-5 mt-6">
                  <a
                    target="_blank"
                    href="https://github.com/manasa-iota"
                    rel="noreferrer"
                  >
                    <Github />
                  </a>
                  <a target="_blank" href="https://x.com/" rel="noreferrer">
                    <Twitter />
                  </a>
                  <a target="_blank" href="https://linkedin.com/" rel="noreferrer">
                    <Linkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                  <input type="radio" name="faq-accordion" defaultChecked />
                  <div className="collapse-title text-xl font-medium">
                    What is Code0?
                  </div>
                  <div className="collapse-content">
                    <p>
                      Code0 is a modern full-stack coding practice platform featuring real-time judging,
                      playlists, theming, and advanced problem filters.
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                  <input type="radio" name="faq-accordion" />
                  <div className="collapse-title text-xl font-medium">
                    What tech stack is used?
                  </div>
                  <div className="collapse-content">
                    <p>
                      React, TailwindCSS, Node.js, Express, PostgreSQL, Prisma, Redis, Judge0, Docker, and more.
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                  <input type="radio" name="faq-accordion" />
                  <div className="collapse-title text-xl font-medium">
                    Can I contribute to Code0?
                  </div>
                  <div className="collapse-content">
                    <p>
                      Yes! Visit the{" "}
                      <a
                        className="text-primary underline"
                        href="https://github.com/manasa-iota/code0"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub repo
                      </a>{" "}
                      to raise issues or contribute new features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero min-h-[50vh] bg-primary text-primary-content">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h2 className="text-4xl font-bold">Ready to Start Coding?</h2>
              <p className="py-6">
                Join developers around the world using Code0 to sharpen their problem-solving skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/problems" className="btn btn-lg">
                  Start Practicing
                </Link>
                <Link to="/problems" className="btn btn-lg btn-outline">
                  Browse Problems
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
