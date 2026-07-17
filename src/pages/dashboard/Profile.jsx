import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../context/CoursesContext";
import { 
  FiMail, 
  FiChevronRight, 
  FiArrowRight, 
  FiUser, 
  FiCalendar, 
  FiClock, 
  FiCheck,
  FiStar,
  FiBookOpen,
  FiGlobe,
  FiCamera,
  FiLock,
  FiLogOut,
  FiBell,
  FiBriefcase,
  FiUsers
} from "react-icons/fi";

const TrophyIcon = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
  </svg>
);

const FlameIcon = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
import deepikaProfile from "../../assets/deepika_profile.png";
import aravindAvatar from "../../assets/aravind_avatar.png";
import priyaAvatar from "../../assets/priya_avatar.png";
import "./Profile.css";

const PythonIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M51.8 12.5C40.5 12.5 31.4 21.6 31.4 32.9V43H52.5V46H21.2C9.9 46 .8 55.1 .8 66.4c0 11.3 9.1 20.4 20.4 20.4H33V76.5c0-5.7 4.6-10.3 10.3-10.3H64c5.7 0 10.3-4.6 10.3-10.3V32.9c0-11.3-9.1-20.4-20.4-20.4H51.8z" fill="#306998" />
    <path d="M58.2 97.5C69.5 97.5 78.6 88.4 78.6 77.1V67H57.5V64H88.8c11.3 0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4H77v10.3c0 5.7-4.6 10.3-10.3 10.3H46c-5.7 0-10.3 4.6-10.3 10.3v32.9c0 11.3 9.1 20.4 20.4 20.4h12.1z" fill="#FFE873" />
    <circle cx="43.5" cy="23.5" r="3.5" fill="#F8F9FA" />
    <circle cx="66.5" cy="86.5" r="3.5" fill="#1E293B" />
  </svg>
);

export default function Profile() {
  const { courses, getPercent } = useCourses();
  const fileInputRef = useRef(null);

  // States
  const [isEditMode, setIsEditMode] = useState(false);
  const [avatar, setAvatar] = useState(deepikaProfile);
  const [profileData, setProfileData] = useState({
    fullName: "Deepika S.",
    role: "Software Developer",
    email: "deepika@example.com",
    employeeId: "EMP1023",
    department: "Software Development",
    manager: "Mr. Aravind",
    managerEmail: "aravind@example.com",
    coordinator: "Ms. Priya",
    coordinatorEmail: "priya@example.com",
    memberSince: "Jan 2026",
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "English (US)",
  });

  function handleAvatarClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setIsEditMode(false);
  }

  function handleToggleSetting(key) {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function handleLanguageChange(e) {
    setSettings((prev) => ({
      ...prev,
      language: e.target.value,
    }));
  }

  // Circular progress SVG configurations
  const courseProgressPercent = 40;
  const courseRadius = 24;
  const courseCircumference = 2 * Math.PI * courseRadius;
  const courseDashoffset = courseCircumference - (courseProgressPercent / 100) * courseCircumference;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="profile-page-title">Profile</h2>
          <p className="profile-page-subtitle">Manage your personal details, achievements, and account settings</p>
        </div>
      </div>

      {/* 3-Column Balanced Main Layout Grid */}
      <div className="profile-layout-grid-3col">
        
        {/* ================= COLUMN 1 (LEFT): Profile Summary & Reporting Structure ================= */}
        <div className="flex flex-col gap-6">
          
          {/* Profile Card */}
          <div className="profile-panel profile-summary-card text-center hover:shadow-md transition-all duration-300">
            <div className="profile-avatar-wrapper relative inline-block">
              <img src={avatar} alt="Profile Avatar" className="profile-avatar-img" />
              {/* Online Green indicator dot */}
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-forest border-2 border-white"></span>
              
              <div className="avatar-edit-overlay" onClick={handleAvatarClick} title="Upload New Photo">
                <FiCamera size={20} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <h3 className="profile-display-name mt-3">{profileData.fullName}</h3>
            <span className="profile-role-badge-text block text-xs font-semibold text-slate mt-1">{profileData.role}</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold mt-2.5 mx-auto">
              <FiCheck size={12} className="text-green-600" />
              Active Employee
            </div>
            
            <div className="profile-summary-meta-grid mt-4 pt-4 border-t border-paperDark/20 text-left space-y-3 font-body text-xs text-slate">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate font-medium">
                  <FiCalendar className="text-slate" size={15} /> Employee ID
                </span>
                <strong className="text-ink font-semibold">{profileData.employeeId}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate font-medium">
                  <FiClock className="text-slate" size={15} /> Member Since
                </span>
                <strong className="text-ink font-semibold">{profileData.memberSince}</strong>
              </div>
            </div>

            <button
              type="button"
              className="profile-edit-toggle-btn mt-5 w-full text-center py-2.5 border border-gray-200 rounded-xl font-body text-xs font-bold hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "Cancel Changes" : "Edit Profile →"}
            </button>
          </div>

          {/* Reporting Structure Card */}
          <div className="profile-panel">
            <h4 className="profile-section-title flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600">
                <FiUsers size={16} />
              </div>
              Reporting Structure
            </h4>
            <div className="space-y-4">
              {/* Manager info box */}
              <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={aravindAvatar} alt="Mr. Aravind" className="h-10 w-10 rounded-full object-cover shrink-0" />
                  <div className="text-left">
                    <span className="block text-[9px] text-slate font-bold uppercase tracking-wider">Reporting Manager</span>
                    <strong className="block font-body text-xs font-bold text-ink">{profileData.manager}</strong>
                    <span className="block text-[10px] text-slate mt-0.5">Software Engineering Director</span>
                    <span className="flex items-center gap-1 text-[10px] text-slate/75 mt-1">
                      <FiMail size={10} /> {profileData.managerEmail}
                    </span>
                  </div>
                </div>
                <a href={`mailto:${profileData.managerEmail}`} className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate hover:text-forest transition-colors shadow-sm" title="Email Manager">
                  <FiMail size={14} />
                </a>
              </div>

              {/* Coordinator info box */}
              <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={priyaAvatar} alt="Ms. Priya" className="h-10 w-10 rounded-full object-cover shrink-0" />
                  <div className="text-left">
                    <span className="block text-[9px] text-slate font-bold uppercase tracking-wider">Learning Coordinator</span>
                    <strong className="block font-body text-xs font-bold text-ink">{profileData.coordinator}</strong>
                    <span className="block text-[10px] text-slate mt-0.5">Human Resources Specialist</span>
                    <span className="flex items-center gap-1 text-[10px] text-slate/75 mt-1">
                      <FiMail size={10} /> {profileData.coordinatorEmail}
                    </span>
                  </div>
                </div>
                <a href={`mailto:${profileData.coordinatorEmail}`} className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate hover:text-forest transition-colors shadow-sm" title="Email Coordinator">
                  <FiMail size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ================= COLUMN 2 (MIDDLE): Learning Snapshot & Achievements ================= */}
        <div className="flex flex-col gap-6">
          
          {/* Learning Snapshot Card */}
          <div className="profile-panel profile-snapshot-card">
            <h4 className="profile-section-title flex items-center gap-2">
              <span className="text-xl">📊</span> Learning Snapshot
            </h4>
            <div className="flex flex-row items-center justify-between gap-4 mt-2">
              <div className="grid grid-cols-2 gap-3 flex-1">
                {/* Current Course */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50 shrink-0">
                    <PythonIcon />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Current Course</span>
                    <span className="block text-xs font-bold text-ink mt-0.5 leading-tight">Python</span>
                  </div>
                </div>

                {/* Current Module */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                    <FiBookOpen size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Current Module</span>
                    <span className="block text-xs font-bold text-ink mt-0.5 leading-tight">Module 3 - Loops</span>
                  </div>
                </div>

                {/* Next Deadline */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-600 shrink-0">
                    <FiCalendar size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Next Deadline</span>
                    <span className="block text-xs font-bold text-red-600 mt-0.5 leading-tight">20 Jul 2026</span>
                  </div>
                </div>

                {/* Learning Streak */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-50 text-orange-600 shrink-0">
                    <FlameIcon size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Learning Streak</span>
                    <span className="block text-xs font-bold text-orange-600 mt-0.5 leading-tight">7 Days</span>
                  </div>
                </div>
              </div>

              {/* Circular SVG progress ring */}
              <div className="flex flex-col items-center shrink-0 p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm w-28 self-stretch justify-center">
                <div className="relative flex items-center justify-center h-14 w-14">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r={courseRadius}
                      className="text-gray-100 stroke-current"
                      strokeWidth="3.5"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r={courseRadius}
                      className="text-forest stroke-current"
                      strokeWidth="3.5"
                      fill="transparent"
                      strokeDasharray={courseCircumference}
                      strokeDashoffset={courseDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-body text-xs font-bold text-ink">{courseProgressPercent}%</span>
                </div>
                <span className="text-[10px] text-slate font-bold mt-2">Course Progress</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-paperDark/20 flex justify-end">
              <Link to="/dashboard/course/python-fundamentals/module/m3" className="flex items-center gap-1.5 font-body text-xs font-bold px-4 py-2 bg-forest hover:bg-forestDeep text-white rounded-xl transition-colors shadow-sm">
                Resume Learning <FiArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Achievements small grid cards */}
          <div className="profile-panel">
            <h4 className="profile-section-title flex items-center gap-2">
              <span className="text-xl">🏆</span> Achievements
            </h4>
            <div className="grid grid-cols-2 gap-3 mt-2">
              
              {/* SQL Fundamentals */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-50 text-yellow-600 border border-yellow-100 shrink-0">
                  <TrophyIcon size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-ink">SQL Fundamentals</span>
                  <span className="text-[10px] text-slate font-semibold mt-0.5">Completed</span>
                  <span className="text-[9px] text-slate/85 font-medium">12 Jul 2026</span>
                </div>
              </div>

              {/* Presentation Skills */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-50 text-yellow-600 border border-yellow-100 shrink-0">
                  <TrophyIcon size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-ink">Presentation Skills</span>
                  <span className="text-[10px] text-slate font-semibold mt-0.5">Completed</span>
                  <span className="text-[9px] text-slate/85 font-medium">02 Jul 2026</span>
                </div>
              </div>

              {/* Perfect Quiz Score */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-50 text-amber-500 border border-amber-100 shrink-0">
                  <FiStar size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-ink">Perfect Quiz Score</span>
                  <span className="text-[10px] text-slate font-semibold mt-0.5">100% SQL Joins</span>
                </div>
              </div>

              {/* 7-Day Streak */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-500 border border-red-100 shrink-0">
                  <FlameIcon size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-ink">7-Day Streak</span>
                  <span className="text-[10px] text-slate font-semibold mt-0.5">Active study weekly</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= COLUMN 3 (RIGHT): Personal Information & Recent Activity ================= */}
        <div className="flex flex-col gap-6">
          
          {/* Personal Information card list */}
          <div className="profile-panel">
            <h4 className="profile-section-title flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600">
                <FiUser size={16} />
              </div>
              Personal Information
            </h4>
            
            {isEditMode ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-3">
                  <div className="form-group flex flex-col text-left">
                    <label className="text-[10px] uppercase font-bold text-slate">Full Name</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      required
                      className="border border-gray-200 rounded-xl p-2.5 text-xs focus:border-brass focus:ring-1 focus:ring-brass"
                    />
                  </div>
                  <div className="form-group flex flex-col text-left">
                    <label className="text-[10px] uppercase font-bold text-slate">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                      className="border border-gray-200 rounded-xl p-2.5 text-xs focus:border-brass focus:ring-1 focus:ring-brass"
                    />
                  </div>
                  <div className="form-group flex flex-col text-left">
                    <label className="text-[10px] uppercase font-bold text-slate">Department</label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      className="border border-gray-200 rounded-xl p-2.5 text-xs focus:border-brass focus:ring-1 focus:ring-brass"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full text-center py-2.5 bg-forest hover:bg-forestDeep text-white rounded-xl font-body text-xs font-bold transition-colors shadow-sm">
                  Save Personal Info
                </button>
              </form>
            ) : (
              <div className="space-y-3 mt-2">
                
                {/* Full Name Row */}
                <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-forest/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                      <FiUser size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Full Name</span>
                      <strong className="text-xs font-semibold text-ink">{profileData.fullName}</strong>
                    </div>
                  </div>
                  <FiChevronRight className="text-slate/60" size={16} />
                </div>

                {/* Email Address Row */}
                <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-forest/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                      <FiMail size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Email Address</span>
                      <strong className="text-xs font-semibold text-ink">{profileData.email}</strong>
                    </div>
                  </div>
                  <FiChevronRight className="text-slate/60" size={16} />
                </div>

                {/* Employee ID Row */}
                <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-forest/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-orange-50 text-orange-600 shrink-0">
                      <FiBriefcase size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Employee ID</span>
                      <strong className="text-xs font-semibold text-ink">{profileData.employeeId}</strong>
                    </div>
                  </div>
                  <FiChevronRight className="text-slate/60" size={16} />
                </div>

                {/* Department Row */}
                <div className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-forest/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                      <FiUsers size={16} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[9px] uppercase font-bold text-slate tracking-wider">Department</span>
                      <strong className="text-xs font-semibold text-ink">{profileData.department}</strong>
                    </div>
                  </div>
                  <FiChevronRight className="text-slate/60" size={16} />
                </div>

              </div>
            )}
          </div>

          {/* Recent Activity timeline */}
          <div className="profile-panel">
            <h4 className="profile-section-title flex items-center gap-2">
              <span className="text-xl">⏱</span> Recent Activity
            </h4>
            
            <div className="relative pl-6 space-y-6 border-l border-gray-100 ml-3.5 mt-4">
              {/* Item 1 */}
              <div className="relative text-left">
                <span className="absolute -left-[33px] top-0.5 bg-forest text-white rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-sm">
                  <FiCheck size={10} />
                </span>
                <div className="flex flex-col">
                  <strong className="font-body text-xs font-bold text-ink">Completed SQL Fundamentals</strong>
                  <span className="font-mono text-[9px] text-slate mt-0.5">12 Jul 2026 • 1:30 PM</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative text-left">
                <span className="absolute -left-[33px] top-0.5 bg-forest text-white rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-sm">
                  <FiCheck size={10} />
                </span>
                <div className="flex flex-col">
                  <strong className="font-body text-xs font-bold text-ink">Downloaded Certificate</strong>
                  <span className="font-mono text-[9px] text-slate mt-0.5">12 Jul 2026 • 1:45 PM</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative text-left">
                <span className="absolute -left-[33px] top-0.5 bg-forest text-white rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-sm">
                  <FiCheck size={10} />
                </span>
                <div className="flex flex-col">
                  <strong className="font-body text-xs font-bold text-ink">Submitted Assignment</strong>
                  <span className="font-mono text-[9px] text-slate mt-0.5">10 Jul 2026 • 3:40 PM</span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="relative text-left">
                <span className="absolute -left-[33px] top-0.5 bg-forest text-white rounded-full h-[18px] w-[18px] flex items-center justify-center shadow-sm">
                  <FiCheck size={10} />
                </span>
                <div className="flex flex-col">
                  <strong className="font-body text-xs font-bold text-ink">Started React Course</strong>
                  <span className="font-mono text-[9px] text-slate mt-0.5">08 Jul 2026 • 10:15 AM</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-paperDark/20 flex justify-end">
              <a href="#activity" onClick={(e) => { e.preventDefault(); alert("Opening all user logs..."); }} className="flex items-center gap-1 font-body text-xs font-bold text-ink hover:underline">
                View All Activity <FiChevronRight size={14} />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ================= FULL-WIDTH BOTTOM ROW: Account Settings Grid ================= */}
      <div className="profile-panel">
        <h4 className="profile-section-title">Account Settings</h4>
        <div className="grid grid-cols-5 gap-4 mt-2">
          
          {/* Card 1: Email Notifications */}
          <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm min-h-[160px] text-left">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-50 text-yellow-600">
                  <FiBell size={16} />
                </div>
                <span className="font-bold text-xs text-ink">Email Notifications</span>
              </div>
              <p className="text-[10px] text-slate mt-2 leading-relaxed">
                Receive updates about assignments and quizzes due dates.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 w-full">
              <span className="font-mono text-[9px] font-bold uppercase bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                Enabled
              </span>
              <label className="toggle-switch scale-90">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggleSetting("notifications")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* Card 2: Preferred Language */}
          <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm min-h-[160px] text-left">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                  <FiGlobe size={16} />
                </div>
                <span className="font-bold text-xs text-ink">Preferred Language</span>
              </div>
              <p className="text-[10px] text-slate mt-2 leading-relaxed">
                Select primary language translation.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 w-full">
              <span className="font-mono text-[9px] font-bold uppercase bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">
                Updated
              </span>
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className="text-[10px] font-semibold py-0.5 px-1 border border-gray-200 rounded bg-white outline-none"
              >
                <option value="English (US)">English (US)</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>

          {/* Card 3: Update Profile Picture */}
          <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-pointer hover:border-forest/25 min-h-[160px] text-left" onClick={handleAvatarClick}>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-50 text-purple-600">
                  <FiCamera size={16} />
                </div>
                <span className="font-bold text-xs text-ink">Update Profile Picture</span>
              </div>
              <p className="text-[10px] text-slate mt-2 leading-relaxed">
                Upload custom image files or photo representation.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 w-full">
              <span className="font-mono text-[9px] font-bold uppercase bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                Enabled
              </span>
              <span className="text-slate font-bold text-sm">→</span>
            </div>
          </div>

          {/* Card 4: Change Password */}
          <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-pointer hover:border-forest/25 min-h-[160px] text-left" onClick={() => alert("Redirecting to password reset...")}>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-50 text-yellow-600">
                  <FiLock size={16} />
                </div>
                <span className="font-bold text-xs text-ink">Change Password</span>
              </div>
              <p className="text-[10px] text-slate mt-2 leading-relaxed">
                Update your login authentication passphrase.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 w-full">
              <span className="text-[9px] text-slate font-semibold leading-tight">Last changed:<br />2 Jul 2026</span>
              <span className="text-slate font-bold text-sm">→</span>
            </div>
          </div>

          {/* Card 5: Logout */}
          <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-pointer hover:border-red-200 min-h-[160px] text-left" onClick={() => { if(confirm("Are you sure you want to logout?")) window.location.href="/"; }}>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-600">
                  <FiLogOut size={16} />
                </div>
                <span className="font-bold text-xs text-red-600">Logout</span>
              </div>
              <p className="text-[10px] text-slate mt-2 leading-relaxed">
                Sign out from the Academy Portal.
              </p>
            </div>
            <div className="flex items-center justify-end mt-4 pt-2 border-t border-gray-100 w-full">
              <span className="text-red-600 font-bold text-sm">→</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}