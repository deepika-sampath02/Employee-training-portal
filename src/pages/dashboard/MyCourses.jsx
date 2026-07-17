import { useState, useMemo } from "react";
import CourseTile from "../../components/CourseTile";
import { useCourses } from "../../context/CoursesContext";
import "./MyCourses.css";

const tabs = ["All", "In Progress", "Completed", "Not Started", "Recommended"];

export default function MyCourses() {
  const { courses, getPercent, getStatus } = useCourses();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const enriched = courses.map((c) => ({
    ...c,
    percent: getPercent(c.id),
    status: getStatus(c.id),
  }));

  const filtered = useMemo(() => {
    return enriched.filter((c) => {
      const matchesTab = activeTab === "All" || activeTab === "Recommended" || c.status === activeTab;
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, search, courses]);

  return (
    <div className="page-content">
      <div className="mycourses-header">
        <div>
          <h2 className="mycourses-title">My Courses</h2>
          <p className="mycourses-sub">All the courses assigned to you</p>
        </div>

        <div className="mycourses-controls">
          <div className="mycourses-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="mycourses-select" defaultValue="All Courses">
            <option>All Courses</option>
            <option>Assigned by Manager</option>
            <option>Self Enrolled</option>
          </select>
        </div>
      </div>

      <div className="mycourses-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={"mycourses-tab" + (activeTab === tab ? " mycourses-tab-active" : "")}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mycourses-empty">No courses match your filters.</p>
      ) : (
        <div className="mycourses-grid">
          {filtered.map((course) => (
            <CourseTile key={course.id} {...course} />
          ))}
        </div>
      )}
    </div>
  );
}
