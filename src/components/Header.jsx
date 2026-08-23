export default function Header({
  headerHidden,
  navigate,
  menuGroups,
  pathname,
  searchOpen,
  setSearchOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchTerm,
  setSearchTerm,
  searchResults,
  utilityLinks,
}) {
  return (
    <header className={`site-header ${headerHidden ? "hidden" : ""}`}>
      <div className="main-nav">
        <button className="brand" type="button" onClick={() => navigate("/")} aria-label="Virya home">
          <img className="brand-logo" src="/viryaprivate.png" alt="" />
          <span>
            <strong>Virya</strong>
            <small>Private School</small>
          </span>
        </button>

        <nav className="primary-menu" aria-label="Primary navigation">
          {menuGroups.map((group) => (
            <button
              className={pathname === group.path ? "active" : ""}
              type="button"
              onClick={() => navigate(group.path)}
              key={group.title}
            >
              {group.title}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="nav-apply" type="button" onClick={() => navigate("/apply")}>Apply</button>
          <button
            className={`nav-search ${searchOpen ? "active" : ""}`}
            type="button"
            onClick={() => setSearchOpen((current) => !current)}
            aria-expanded={searchOpen}
            aria-controls="site-search"
          >
            Search
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-panel" id="site-search" role="search">
          <label>
            <span>What are you looking for?</span>
            <input
              type="search"
              placeholder="Search admissions, Grade 4, calendar, clubs, tuition..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoFocus
            />
          </label>
          <button className="search-close" type="button" onClick={() => setSearchOpen(false)}>Close Search</button>
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <button type="button" onClick={() => navigate(item.target)} key={`${item.type}-${item.title}`}>
                  <span>{item.type}</span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </button>
              ))
            ) : (
              <p>No matches yet. Try "Grade 4", "visit", "arts", or "tuition".</p>
            )}
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <nav aria-label="Mobile primary navigation">
            <strong>Explore Virya</strong>
            {menuGroups.map((group) => (
              <button type="button" onClick={() => navigate(group.path)} key={group.title}>
                {group.title}
              </button>
            ))}
          </nav>
          <nav aria-label="Mobile quick links">
            <strong>Quick Links</strong>
            {utilityLinks.map(([target, label]) => (
              <button type="button" onClick={() => navigate(target)} key={`mobile-${label}`}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
