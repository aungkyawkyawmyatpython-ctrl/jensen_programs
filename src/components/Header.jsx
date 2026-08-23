import { useEffect, useRef } from "react";

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
  const menuButtonRef = useRef(null);
  const searchButtonRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

  useEffect(() => {
    if (mobileMenuOpen) firstMobileLinkRef.current?.focus();
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen && !searchOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;

      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (searchOpen) {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen, searchOpen, setMobileMenuOpen, setSearchOpen]);

  const toggleSearch = () => {
    setMobileMenuOpen(false);
    setSearchOpen((current) => !current);
  };

  const toggleMobileMenu = () => {
    setSearchOpen(false);
    setMobileMenuOpen((current) => !current);
  };

  return (
    <header className={`site-header ${headerHidden ? "hidden" : ""}`}>
      <div className="main-nav">
        <button className="brand" type="button" onClick={() => navigate("/")} aria-label="VIRYA Private School home">
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
              aria-current={pathname === group.path ? "page" : undefined}
              key={group.title}
            >
              {group.title}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className={`nav-apply ${pathname === "/apply" ? "active" : ""}`}
            type="button"
            onClick={() => navigate("/apply")}
            aria-current={pathname === "/apply" ? "page" : undefined}
          >
            Apply
          </button>
          <button
            className={`nav-search ${searchOpen ? "active" : ""}`}
            type="button"
            onClick={toggleSearch}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            aria-label={`${searchOpen ? "Close" : "Open"} site search`}
            ref={searchButtonRef}
          >
            Search
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={`${mobileMenuOpen ? "Close" : "Open"} navigation menu`}
            ref={menuButtonRef}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-panel" id="site-search" role="search">
          <label>
            <span>What are you looking for?</span>
            <input
              type="search"
              placeholder="Search academics, admissions, Grade 4, faculty..."
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
              <p>No matches yet. Try "Grade 4", "admissions", "faculty", or "gallery".</p>
            )}
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <nav aria-label="Mobile primary navigation">
            <strong>Explore Virya</strong>
            {menuGroups.map((group, index) => (
              <button
                className={pathname === group.path ? "active" : ""}
                type="button"
                onClick={() => navigate(group.path)}
                aria-current={pathname === group.path ? "page" : undefined}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                key={group.title}
              >
                {group.title}
              </button>
            ))}
          </nav>
          <nav aria-label="Quick menu">
            <strong>Quick Menu</strong>
            {utilityLinks.map(([target, label]) => (
              <button
                className={pathname === target ? "active" : ""}
                type="button"
                onClick={() => navigate(target)}
                aria-current={pathname === target ? "page" : undefined}
                key={`quick-${label}`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
