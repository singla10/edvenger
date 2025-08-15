import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentDash = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock student data - in real app, this would come from API
  const studentData = {
    profile: {
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/api/placeholder/120/120",
      studentId: "STU2024001",
      joinDate: "January 15, 2024",
      level: "Intermediate",
      totalPoints: 2850,
      streak: 12,
    },
    stats: {
      totalCourses: 8,
      completedCourses: 3,
      inProgressCourses: 2,
      totalHours: 127,
      certificates: 3,
      averageScore: 88.5,
    },
    courses: {
      completed: [
        {
          id: 1,
          title: "Introduction to Python Programming",
          progress: 100,
          score: 92,
          completedDate: "2024-06-15",
          duration: "24 hours",
          category: "Programming",
        },
        {
          id: 2,
          title: "Data Structures & Algorithms",
          progress: 100,
          score: 88,
          completedDate: "2024-07-20",
          duration: "32 hours",
          category: "Computer Science",
        },
        {
          id: 3,
          title: "Web Development Basics",
          progress: 100,
          score: 95,
          completedDate: "2024-08-05",
          duration: "28 hours",
          category: "Web Development",
        },
      ],
      inProgress: [
        {
          id: 4,
          title: "Machine Learning Fundamentals",
          progress: 68,
          currentModule: "Neural Networks",
          timeSpent: "18 hours",
          estimatedCompletion: "2 weeks",
          category: "AI/ML",
        },
        {
          id: 5,
          title: "Advanced React Development",
          progress: 45,
          currentModule: "State Management",
          timeSpent: "12 hours",
          estimatedCompletion: "3 weeks",
          category: "Web Development",
        },
      ],
      enrolled: [
        {
          id: 6,
          title: "Cybersecurity Essentials",
          enrolledDate: "2024-08-01",
          startDate: "2024-08-15",
          category: "Security",
        },
        {
          id: 7,
          title: "Mobile App Development",
          enrolledDate: "2024-07-28",
          startDate: "2024-08-20",
          category: "Mobile Development",
        },
        {
          id: 8,
          title: "Cloud Computing with AWS",
          enrolledDate: "2024-08-03",
          startDate: "2024-08-25",
          category: "Cloud Computing",
        },
      ],
    },
    recentActivity: [
      {
        type: "completion",
        title: "Completed 'Functions in Python' module",
        date: "2 hours ago",
        icon: "✅",
      },
      {
        type: "quiz",
        title: "Scored 95% on JavaScript Quiz",
        date: "1 day ago",
        icon: "🏆",
      },
      {
        type: "enrollment",
        title: "Enrolled in Cybersecurity Essentials",
        date: "3 days ago",
        icon: "📚",
      },
      {
        type: "certificate",
        title: "Earned Web Development Certificate",
        date: "5 days ago",
        icon: "🎓",
      },
    ],
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ProgressCircle = ({ percentage, size = 60, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon, title, value, subtitle, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          <p className="text-gray-600 font-medium">{title}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const CourseCard = ({ course, type }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {course.title}
          </h3>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {course.category}
          </span>
        </div>
        {type === "inProgress" && (
          <ProgressCircle
            percentage={course.progress}
            size={50}
            strokeWidth={4}
          />
        )}
      </div>

      {type === "completed" && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Score:</span>
            <span className="font-semibold text-green-600">
              {course.score}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration:</span>
            <span className="font-semibold">{course.duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Completed:</span>
            <span className="font-semibold">{course.completedDate}</span>
          </div>
        </div>
      )}

      {type === "inProgress" && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Current Module:</span>
            <span className="font-semibold">{course.currentModule}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Time Spent:</span>
            <span className="font-semibold">{course.timeSpent}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Est. Completion:</span>
            <span className="font-semibold text-blue-600">
              {course.estimatedCompletion}
            </span>
          </div>
        </div>
      )}

      {type === "enrolled" && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Enrolled:</span>
            <span className="font-semibold">{course.enrolledDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Starts:</span>
            <span className="font-semibold text-green-600">
              {course.startDate}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl md:text-4xl font-bold text-blue-600">
                  {studentData.profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {studentData.profile.level[0]}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {studentData.profile.name}
              </h1>
              <p className="text-blue-100 mb-1">
                Student ID: {studentData.profile.studentId}
              </p>
              <p className="text-blue-100 mb-2">
                Level: {studentData.profile.level}
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">⭐</span>
                  <span>{studentData.profile.totalPoints} Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-300">🔥</span>
                  <span>{studentData.profile.streak} Day Streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "courses", label: "My Courses", icon: "📚" },
              { id: "progress", label: "Progress", icon: "📈" },
              { id: "profile", label: "Profile", icon: "👤" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon="📚"
                title="Total Courses"
                value={studentData.stats.totalCourses}
                color="bg-slate-100"
              />
              <StatCard
                icon="✅"
                title="Completed"
                value={studentData.stats.completedCourses}
                color="bg-emerald-100"
              />
              <StatCard
                icon="⏳"
                title="In Progress"
                value={studentData.stats.inProgressCourses}
                color="bg-amber-100"
              />
              <StatCard
                icon="🎓"
                title="Certificates"
                value={studentData.stats.certificates}
                color="bg-teal-100"
              />
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Learning Progress Chart */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Learning Progress
                </h2>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <ProgressCircle
                      percentage={75}
                      size={120}
                      strokeWidth={8}
                    />
                    <p className="mt-4 text-sm font-medium text-gray-600">
                      Overall Progress
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Completed: {studentData.stats.completedCourses}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        In Progress: {studentData.stats.inProgressCourses}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Enrolled: {studentData.courses.enrolled.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {studentData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-xl">{activity.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-8">
            {/* Courses in Progress */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Courses in Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentData.courses.inProgress.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    type="inProgress"
                  />
                ))}
              </div>
            </div>

            {/* Completed Courses */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Completed Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentData.courses.completed.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    type="completed"
                  />
                ))}
              </div>
            </div>

            {/* Enrolled Courses */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Upcoming Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentData.courses.enrolled.map((course) => (
                  <CourseCard key={course.id} course={course} type="enrolled" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon="⏱️"
                title="Total Hours"
                value={studentData.stats.totalHours}
                subtitle="Learning time"
                color="bg-indigo-100"
              />
              <StatCard
                icon="📊"
                title="Average Score"
                value={`${studentData.stats.averageScore}%`}
                subtitle="Across all courses"
                color="bg-emerald-100"
              />
              <StatCard
                icon="🏆"
                title="Achievements"
                value="12"
                subtitle="Badges earned"
                color="bg-amber-100"
              />
              <StatCard
                icon="📈"
                title="Improvement"
                value="+15%"
                subtitle="This month"
                color="bg-rose-100"
              />
            </div>

            {/* Detailed Progress */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Course Progress Details
              </h2>
              <div className="space-y-6">
                {studentData.courses.inProgress.map((course) => (
                  <div
                    key={course.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">
                        {course.title}
                      </h3>
                      <span className="text-sm font-semibold text-blue-600">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-slate-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Current: {course.currentModule}</span>
                      <span>Time: {course.timeSpent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={studentData.profile.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={studentData.profile.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={studentData.profile.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={studentData.profile.studentId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <input
                    type="text"
                    value={studentData.profile.joinDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Level
                  </label>
                  <input
                    type="text"
                    value={studentData.profile.level}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Account Settings
              </h2>
              <div className="space-y-4">
                <button className="w-full md:w-auto px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                  Edit Profile
                </button>
                <button className="w-full md:w-auto px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ml-0 md:ml-4">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back to Home */}
      <div className="text-center py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-800 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default StudentDash;
