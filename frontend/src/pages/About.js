import React, { useRef, useEffect, useState } from "react";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState({});

  const observeSection = (sectionId) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible((prev) => ({
          ...prev,
          [sectionId]: entry.isIntersecting,
        }));
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  };

  useEffect(() => {
    const observers = [
      observeSection("hero"),
      observeSection("mission"),
      observeSection("team"),
      observeSection("values"),
      observeSection("stats"),
    ];

    return () => observers.forEach((cleanup) => cleanup && cleanup());
  }, []);

  return (
    <main className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 transition-all duration-1000 ${
          isVisible.hero
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-green-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* STEM Icons Floating */}
        <div className="absolute top-16 right-20 text-white/10 animate-bounce">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-20 text-white/10 animate-bounce delay-300">
          <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H5V22H11V16H13V22H19V16H21V13C21,11.89 20.11,11 19,11H13V8H15V2H9M11,4H13V6H11V4Z" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-10 text-white/10 animate-bounce delay-700">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>🌟 About StemElix</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">Empowering Tomorrow's</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  STEM Innovators
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                We're revolutionizing STEM education through interactive
                learning, cutting-edge technology, and hands-on experiences that
                inspire the next generation of scientists, engineers, and
                innovators.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold mb-2">Innovation First</h3>
                <p className="text-slate-300 text-sm">
                  Cutting-edge learning experiences that prepare students for
                  tomorrow's challenges
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-lg font-semibold mb-2">Global Impact</h3>
                <p className="text-slate-300 text-sm">
                  Reaching students worldwide with accessible, engaging STEM
                  education
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="text-lg font-semibold mb-2">
                  Hands-On Learning
                </h3>
                <p className="text-slate-300 text-sm">
                  Real-world applications and interactive experiments that make
                  learning stick
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        id="mission"
        className={`py-20 px-6 lg:px-8 bg-white transition-all duration-1000 delay-200 ${
          isVisible.mission
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🎯 Our Purpose</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Transforming STEM Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We believe that every student deserves access to world-class STEM
              education that's engaging, accessible, and prepares them for the
              future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Our Mission
                  </h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To make STEM education accessible, engaging, and effective for
                  students worldwide through innovative technology, interactive
                  learning experiences, and expert instruction that bridges the
                  gap between theory and real-world application.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Our Vision
                  </h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  A world where every student has the opportunity to explore,
                  create, and innovate in STEM fields, equipped with the skills
                  and confidence to solve tomorrow's challenges and drive
                  technological advancement.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: "🔬",
                  title: "Innovation",
                  desc: "Pioneering new methods of learning",
                },
                {
                  icon: "🌟",
                  title: "Excellence",
                  desc: "Striving for the highest quality",
                },
                {
                  icon: "🤝",
                  title: "Collaboration",
                  desc: "Building together, learning together",
                },
                {
                  icon: "🌍",
                  title: "Accessibility",
                  desc: "Education for everyone, everywhere",
                },
                {
                  icon: "🚀",
                  title: "Growth",
                  desc: "Continuous improvement and evolution",
                },
                {
                  icon: "💡",
                  title: "Creativity",
                  desc: "Fostering imagination and innovation",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className={`py-20 px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50 transition-all duration-1000 delay-400 ${
          isVisible.team
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>👥 Our Team</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Meet the Innovators
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A diverse team of educators, engineers, designers, and researchers
              united by our passion for transforming STEM education.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Chief Learning Officer",
                icon: "🔬",
                bg: "from-blue-400 to-purple-500",
              },
              {
                name: "Alex Rodriguez",
                role: "Head of Engineering",
                icon: "⚙️",
                bg: "from-purple-400 to-pink-500",
              },
              {
                name: "Maya Patel",
                role: "UX Design Lead",
                icon: "🎨",
                bg: "from-pink-400 to-orange-500",
              },
              {
                name: "Dr. James Wilson",
                role: "Research Director",
                icon: "🧬",
                bg: "from-orange-400 to-red-500",
              },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${member.bg} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    {member.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 text-sm text-center">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "50+", label: "Team Members", icon: "👥" },
              { number: "15+", label: "Countries", icon: "🌍" },
              {
                number: "100+",
                label: "Years Combined Experience",
                icon: "📚",
              },
              { number: "24/7", label: "Student Support", icon: "🚀" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {stat.number}
                </div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Statistics */}
      <section
        id="stats"
        className={`py-20 px-6 lg:px-8 bg-white transition-all duration-1000 delay-600 ${
          isVisible.stats
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>📊 Our Impact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Making a Difference
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we're transforming STEM education and empowering students
              worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                number: "200K+",
                label: "Students Enrolled",
                icon: "🎓",
                color: "blue",
              },
              {
                number: "120+",
                label: "Courses Available",
                icon: "📚",
                color: "purple",
              },
              {
                number: "98%",
                label: "Student Satisfaction",
                icon: "⭐",
                color: "green",
              },
              {
                number: "50+",
                label: "Partner Schools",
                icon: "🏫",
                color: "orange",
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div
                  className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-3xl p-8 border border-${stat.color}-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div
                    className={`text-4xl font-bold text-${stat.color}-600 mb-2`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievement Highlights */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Award-Winning Platform",
                description:
                  "Recognized as 'Best STEM Education Platform' by EdTech Awards 2024",
                icon: "🏆",
                color:
                  "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200",
              },
              {
                title: "Global Reach",
                description:
                  "Students from over 50 countries actively learning on our platform",
                icon: "🌎",
                color:
                  "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200",
              },
              {
                title: "Research-Backed",
                description:
                  "Our methods are proven to increase STEM engagement by 300%",
                icon: "📈",
                color:
                  "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className={`${achievement.color} rounded-3xl p-8 border hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {achievement.title}
                </h3>
                <p className="text-slate-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              STEM Journey?
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already exploring the exciting
            world of Science, Technology, Engineering, and Mathematics with
            StemElix.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300">
              <span>Start Learning Today</span>
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <button className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              <svg
                className="mr-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Promise */}
      <section className="bg-zinc-50 py-20 px-6 md:px-24">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 border border-zinc-200 bg-white rounded-md shadow-sm">
            <h4 className="text-xl font-semibold text-zinc-800 mb-2">
              🚀 Our Mission
            </h4>
            <p className="text-zinc-600 text-base">
              Make STEM accessible, relatable, and exciting for every learner —
              from first-grade to high school.
            </p>
          </div>
          <div className="p-6 border border-zinc-200 bg-white rounded-md shadow-sm">
            <h4 className="text-xl font-semibold text-zinc-800 mb-2">
              🔍 Our Vision
            </h4>
            <p className="text-zinc-600 text-base">
              Equip students with the mindset and skills needed to thrive in a
              world driven by innovation.
            </p>
          </div>
          <div className="p-6 border border-zinc-200 bg-white rounded-md shadow-sm">
            <h4 className="text-xl font-semibold text-zinc-800 mb-2">
              🤝 Our Promise
            </h4>
            <p className="text-zinc-600 text-base">
              Always keep learning joyful, student-centric, and grounded in
              real-world impact.
            </p>
          </div>
        </div>
      </section>

      {/* Culture and Inclusion
      <section className="bg-sky-100 py-20 px-6 md:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
          Our mission to build a{" "}
          <span className="bg-purple-200 px-2 rounded">diverse</span> and{" "}
          <span className="bg-yellow-200 px-2 rounded">inclusive</span>{" "}
          community
        </h2>
        <p className="text-lg text-zinc-700 max-w-2xl mx-auto">
          At StemElix, we foster a culture where everyone — regardless of
          background, location, or learning style — feels like they belong and
          can thrive.
        </p>
        <div className="mt-8">
          <a
            href="/inclusion"
            className="inline-flex items-center gap-2 text-white bg-zinc-900 px-6 py-3 rounded-full font-medium hover:bg-zinc-700 transition"
          >
            Learn more →
          </a>
        </div>
      </section> */}
    </main>
  );
};

export default AboutUsPage;
