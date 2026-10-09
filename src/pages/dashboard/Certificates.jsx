import { useState } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import { useAuth } from "../../context/AuthContext";
import "./Certificates.css";

export default function Certificates() {
  const { courses, getPercent } = useCourses();
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const completedCourses = courses.filter((c) => getPercent(c.id) === 100);
  const lockedCourses = courses.filter((c) => getPercent(c.id) < 100);

  const earnedCount = completedCourses.length;
  const lockedCount = lockedCourses.length;
  const totalCount = courses.length;

  const latestAchievementName = earnedCount > 0 ? completedCourses[earnedCount - 1].title : "None yet";

  // Filter courses based on search query and active tab
  const filteredCourses = courses.filter((course) => {
    const percent = getPercent(course.id);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "Earned") {
      return matchesSearch && percent === 100;
    }
    if (activeTab === "Locked") {
      return matchesSearch && percent < 100;
    }
    return matchesSearch;
  });

  // Simulate PDF download
  function handleDownload(courseId) {
    setDownloadingId(courseId);
    setTimeout(() => {
      setDownloadingId(null);
      alert("Certificate PDF downloaded successfully!");
    }, 1500);
  }

  // Certificate type assigner
  function getCertificateType(courseId) {
    if (["react-development", "sql-fundamentals", "excel-analysis"].includes(courseId)) {
      return "Professional Certificate";
    }
    return "Course Completion Certificate";
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">Certificates</h2>
          <p className="font-body text-sm text-slate mt-1">View and download your earned certificates</p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="flex items-center gap-2 bg-white border border-ink/10 rounded-full px-4 py-2 w-64 shadow-sm">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none outline-none text-xs w-full bg-transparent"
          />
        </div>
      </div>

      {/* Consistent Summary Statistics Cards */}
      <div className="certificates-summary-grid">
        <div className="summary-stat-box-consistent border-l-4 border-brass">
          <div className="stat-box-icon-circle bg-brass/10 text-brass">🏆</div>
          <div className="stat-box-info">
            <span className="stat-box-value">{earnedCount}</span>
            <span className="stat-box-label">Certificates Earned</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Latest: {latestAchievementName}
            </span>
          </div>
        </div>

        <div className="summary-stat-box-consistent border-l-4 border-forest">
          <div className="stat-box-icon-circle bg-forest/10 text-forest">✓</div>
          <div className="stat-box-info">
            <span className="stat-box-value">{earnedCount}</span>
            <span className="stat-box-label">Courses Completed</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              100% completed
            </span>
          </div>
        </div>

        <div className="summary-stat-box-consistent border-l-4 border-indigo-500">
          <div className="stat-box-icon-circle bg-indigo-500/10 text-indigo-500">🌟</div>
          <div className="stat-box-info">
            <span className="stat-box-value font-body text-sm">{latestAchievementName}</span>
            <span className="stat-box-label">Latest Achievement</span>
            <span className="stat-box-subtitle font-mono text-[9px] text-slate mt-0.5">
              Earned on 12 Jul 2026
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap border-b border-paperDark/20 pb-3">
        {[
          { id: "All", label: "All", count: totalCount },
          { id: "Earned", label: "Earned", count: earnedCount },
          { id: "Locked", label: "Locked", count: lockedCount },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full font-body text-xs font-semibold border transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-forest text-paper border-forest"
                : "bg-white text-slate border-ink/10 hover:border-forest/30"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Certificates Cards Grid */}
      <div className="certificates-list-grid">
        {filteredCourses.map((course, idx) => {
          const percent = getPercent(course.id);
          const isCompleted = percent === 100;
          const credentialId = `XYZ-2026-${10234 + idx}`;
          const certType = getCertificateType(course.id);
          
          const completedModules = course.modules.filter((m) => m.status === "completed").length;
          const totalModules = course.modules.length;

          // Locate active or first module link for continue actions
          const activeModule =
            course.modules.find((m) => m.status === "current") ||
            course.modules.find((m) => m.status === "completed") ||
            course.modules[0];

          if (isCompleted) {
            return (
              <div key={course.id} className="certificate-card border-t-4 border-brass hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="certificate-card-header">
                  <span className="cert-type-badge font-mono text-[9px] uppercase tracking-wider bg-brass/10 text-brass px-2 py-0.5 rounded font-bold">
                    {certType}
                  </span>
                  <span className="badge-completed text-[9px] font-bold px-2 py-0.5 rounded-full">🟢 Completed</span>
                </div>

                <div className="certificate-card-body-section flex gap-4 mt-2">
                  {/* Miniature Certificate Preview Thumbnail */}
                  <div className="certificate-thumbnail-preview shrink-0">
                    <div className="thumb-gold-border">
                      <span className="thumb-seal">🏆</span>
                      <span className="thumb-sig-text">{course.trainer}</span>
                    </div>
                  </div>

                  <div className="certificate-meta-content flex-1">
                    <h3 className="cert-course-title mb-2">{course.title}</h3>
                    <div className="cert-details-meta font-body text-xs text-slate space-y-1">
                      <div className="flex justify-between">
                        <strong>Completed On</strong>
                        <span>12 Jul 2026 • 1:30 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>Instructor</strong>
                        <span>{course.trainer}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong>Credential ID</strong>
                        <span className="font-mono text-[10px]">{credentialId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="certificate-card-actions mt-4 pt-4 border-t border-paperDark/20">
                  <button
                    type="button"
                    className="cert-primary-btn-consistent font-body text-xs font-semibold px-3 py-2 bg-forest text-paper rounded-xl text-center"
                    onClick={() => setSelectedCourse({ ...course, credentialId })}
                  >
                    View Certificate →
                  </button>
                  
                  <button
                    type="button"
                    className="cert-secondary-btn-consistent font-body text-xs font-semibold px-3 py-2 border border-ink/20 rounded-xl"
                    onClick={() => handleDownload(course.id)}
                  >
                    {downloadingId === course.id ? "Downloading..." : "Download PDF →"}
                  </button>

                  <button
                    type="button"
                    className="cert-verify-btn font-mono text-[10px] uppercase font-bold text-forest hover:bg-forest/5 px-3 py-2 rounded-xl transition-all duration-200 border border-forest/20"
                    onClick={() => alert(`Verified credential: ${credentialId} on public blockchain network!`)}
                  >
                    Verify Certificate →
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <div key={course.id} className="certificate-card certificate-card-locked">
                <div className="certificate-card-header">
                  <span className="badge-not-started text-[9px] font-bold px-2 py-0.5 rounded-full">⚪ Locked</span>
                </div>

                <div className="certificate-card-body mt-2">
                  <h3 className="cert-course-title text-slate mb-1">{course.title}</h3>
                  <span className="lock-trainer-name block font-body text-xs text-slate mb-3">Trainer: {course.trainer}</span>
                  
                  <div className="cert-lock-progress-row">
                    <div className="cert-lock-progress-bar">
                      <div className="cert-lock-progress-fill" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="cert-lock-progress-percent font-mono text-xs font-bold text-slate">
                      {completedModules} / {totalModules} Modules ({percent}%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3 font-mono text-[10px] text-slate">
                    <span>Expected Unlock: 20 Jul 2026</span>
                    <span>Complete modules to unlock.</span>
                  </div>
                </div>

                <div className="certificate-card-actions mt-4 pt-4 border-t border-paperDark/20">
                  <Link
                    to={`/dashboard/course/${course.id}/module/${activeModule.id}`}
                    className="cert-primary-btn-consistent text-center font-body text-xs font-semibold px-4 py-2 bg-forest text-paper rounded-xl w-full"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </div>
            );
          }
        })}

        {filteredCourses.length === 0 && (
          <div className="col-span-2 bg-white border border-ink/10 rounded-2xl p-12 text-center shadow-sm">
            <span className="text-3xl">🔍</span>
            <p className="font-body text-sm text-slate mt-2">No certificates found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCourse && (
        <div className="certificate-modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="certificate-modal-box animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelectedCourse(null)}>×</button>
            
            {/* Elegant Certificate Border Frame */}
            <div className="certificate-frame-inner">
              <div className="certificate-seal-stamp">
                <div className="seal-star">★</div>
                <span className="seal-text">XYZ SYSTEM</span>
                <span className="seal-tag font-bold text-[6px]">VERIFIED</span>
              </div>

              {/* Large styled Academy Seal background watermark */}
              <div className="academy-seal-watermark">XYZ</div>

              <div className="certificate-contents">
                <h1 className="cert-modal-academy-name">XYZ Academy</h1>
                <div className="cert-divider-gold"></div>
                <h4 className="cert-modal-heading">CERTIFICATE OF COMPLETION</h4>
                
                <p className="cert-modal-subtext">This certifies that</p>
                <h2 className="cert-modal-recipient">{user?.full_name || "Employee"}</h2>
                <p className="cert-modal-subtext">has successfully completed all module assessments for</p>
                <h3 className="cert-modal-course-title">{selectedCourse.title}</h3>
                
                <div className="cert-signatures-block">
                  <div className="cert-signature-col">
                    <span className="signature-line">12 Jul 2026 • 1:30 PM</span>
                    <span className="signature-label">Date of Achievement</span>
                  </div>
                  
                  {/* Digital Signature representation */}
                  <div className="cert-signature-col">
                    <span className="signature-line digital-sig-font">
                      {selectedCourse.trainer}
                    </span>
                    <span className="signature-label">Course Instructor</span>
                  </div>
                </div>

                <div className="cert-modal-verification-row flex items-center justify-between w-full mt-6 pt-4 border-t border-paperDark/20">
                  <span className="cert-credential-tag">Credential ID: {selectedCourse.credentialId}</span>
                  <a href="#verify" className="cert-verify-link font-mono text-[9px] text-forest font-bold uppercase tracking-wider hover:underline" onClick={(e) => { e.preventDefault(); alert("Credential verified on blockchain network!"); }}>
                    ✓ Verify Credential
                  </a>
                </div>
              </div>

              {/* MOCK QR CODE GRID */}
              <div className="cert-qr-mock-code" title="Scan to verify online">
                <div className="qr-box-row">
                  <span className="qr-cell dark"></span>
                  <span className="qr-cell"></span>
                  <span className="qr-cell dark"></span>
                  <span className="qr-cell dark"></span>
                </div>
                <div className="qr-box-row">
                  <span className="qr-cell"></span>
                  <span className="qr-cell dark"></span>
                  <span className="qr-cell"></span>
                  <span className="qr-cell dark"></span>
                </div>
                <div className="qr-box-row">
                  <span className="qr-cell dark"></span>
                  <span className="qr-cell"></span>
                  <span className="qr-cell dark"></span>
                  <span className="qr-cell"></span>
                </div>
                <div className="qr-box-row">
                  <span className="qr-cell dark"></span>
                  <span className="qr-cell dark"></span>
                  <span className="qr-cell"></span>
                  <span className="qr-cell dark"></span>
                </div>
              </div>
            </div>

            <div className="cert-modal-actions mt-6 text-center">
              <button
                type="button"
                className="cert-modal-download-btn"
                onClick={() => handleDownload(selectedCourse.id)}
              >
                Download Official PDF →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
