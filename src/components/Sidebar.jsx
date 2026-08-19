function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        ✦ <span>Forma AI</span>
      </div>

      <nav>

        <div className="menu-item">
          🏠 Dashboard
        </div>

        <div className="menu-item active">
          ＋ New Claim
        </div>

        <div className="menu-item">
          📄 My Claims
        </div>

        <div className="menu-item">
          🕒 Drafts
        </div>

        <div className="menu-item">
          ▦ Templates
        </div>

        <div className="menu-item">
          ✨ AI Assistant
        </div>

        <div className="menu-item">
          📊 Insights
        </div>

        <div className="menu-item">
          ⚙ Settings
        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;