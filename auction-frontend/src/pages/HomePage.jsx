/**
 * HomePage - Landing Page
 *
 * Main landing page with category navigation cards
 */

import { useNavigate } from "react-router-dom";
import SearchBar from "../components/shared/SearchBar";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "marketplace",
      name: "Marketplace",
      icon: "/marketplaceicon.png",
      path: "/marketplace",
    },
    {
      id: "property",
      name: "Property",
      icon: "/propertyicon.png",
      path: "/marketplace?category=Property",
    },
    {
      id: "motors",
      name: "Motors",
      icon: "/motorsicon.png",
      path: "/marketplace?category=Motors",
    },
    {
      id: "jobs",
      name: "Jobs",
      icon: "/jobsicon.png",
      path: "/marketplace?category=Jobs",
    },
    {
      id: "services",
      name: "Services",
      icon: "/servicesicon.png",
      path: "/marketplace?category=Services",
    },
    {
      id: "browse",
      name: "Browse all",
      icon: "/arrowicon.png",
      path: "/marketplace",
    },
  ];

  const handleSearch = (query) => {
    navigate(`/marketplace?q=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <main className="home-landing">
      <div className="container">
        {/* Hero Section */}
        <div className="home-landing__hero">
          <h1 className="home-landing__title">Welcome to Trade Me</h1>
          <p className="home-landing__subtitle">
            Buy and sell with New Zealand's most popular marketplace
          </p>
        </div>

        {/* Search Bar */}
        <div className="home-landing__search">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search all of Trade Me"
          />
        </div>

        {/* Category Cards */}
        <div className="home-landing__categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-card ${
                category.id === "browse" ? "category-card--browse" : ""
              }`}
              onClick={() => handleCategoryClick(category.path)}
            >
              <span className="category-card__icon">
                <img
                  src={category.icon}
                  alt={`${category.name} icon`}
                  width={40}
                  height={40}
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }} // optional fallback
                />
              </span>
              <span className="category-card__name">{category.name}</span>
              
            </button>
            
          ))}
        </div>

        {/* Cool Auctions Section */}
        <div className="home-landing__section">
          <div className="home-landing__section-header">
            <h2>Cool auctions</h2>
            <a href="/marketplace" className="home-landing__view-all">
              View all →
            </a>
          </div>
          <p className="home-landing__section-description">
            Check out these amazing deals from our marketplace
          </p>
        </div>
      </div>
    </main>
  );
}
