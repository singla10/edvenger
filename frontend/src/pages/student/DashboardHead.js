import "../../Styles/Dashboard.css";

const DashboardHeader = () => {
  const name = localStorage.getItem("studentName") || "Student";

  return (
    <header className="dashboard-header">
      <h2>Hello {name},</h2>
      <p>What would you like to explore today?</p>

      <div className="topic-tags">
        <span>🧠 Artificial Intelligence</span>
        <span>💻 Coding</span>
        <span>🔬 Science Projects</span>
      </div>

      <input type="text" placeholder="Search or ask anything..." className="search-input" />
    </header>
  );
};

export default DashboardHeader;
