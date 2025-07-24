// import { useEffect, useState } from "react";
// import { useAdmin } from "../context/AdminContext";
// import AddCourses from "../components/AddCourses";

// const Courses = () => {
//   const { getAllCourses } = useAdmin();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("list");

//   const dummyCourses = [
//     {
//       _id: "1",
//       title: "Dummy AI for Juniors",
//       description: "Intro to AI for school students.",
//       categoryId: "Junior",
//       levelNumber: 1,
//       price: 1499,
//       status: "active",
//     },
//     {
//       _id: "2",
//       title: "Dummy Robotics Mastery",
//       description: "Learn robotics with Arduino and sensors.",
//       categoryId: "Explorer",
//       levelNumber: 2,
//       price: 1999,
//       status: "draft",
//     },
//   ];

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const data = await getAllCourses();
//         setCourses(data);
//       } catch (err) {
//         console.error("❌ Failed to fetch courses. Showing dummy data instead.");
//         setCourses(dummyCourses);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [getAllCourses]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-6 space-y-4">
//         <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
//         <button
//           className={`w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${
//             activeTab === "list" ? "bg-blue-200 font-semibold" : ""
//           }`}
//           onClick={() => setActiveTab("list")}
//         >
//           📚 View Courses
//         </button>
//         <button
//           className={`w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${
//             activeTab === "add" ? "bg-blue-200 font-semibold" : ""
//           }`}
//           onClick={() => setActiveTab("add")}
//         >
//           ➕ Add Course
//         </button>
//         <button
//           className={`w-full text-left px-4 py-2 rounded hover:bg-blue-100 ${
//             activeTab === "delete" ? "bg-blue-200 font-semibold" : ""
//           }`}
//           onClick={() => setActiveTab("delete")}
//         >
//           ❌ Delete Course
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {activeTab === "list" && (
//           <>
//             <h1 className="text-2xl font-bold mb-6">All Courses</h1>

//             {loading ? (
//               <p className="text-center">⏳ Loading courses...</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {courses.map((course) => (
//                   <div key={course._id} className="bg-white p-4 rounded shadow">
//                     <h3 className="text-lg font-semibold">{course.title}</h3>
//                     <p className="text-sm text-gray-600 mb-1">{course.description}</p>
//                     <p><strong>Category:</strong> {course.categoryId}</p>
//                     <p><strong>Level:</strong> {course.levelNumber}</p>
//                     <p><strong>Price:</strong> ₹{course.price}</p>
//                     <p><strong>Status:</strong> <span className="capitalize">{course.status}</span></p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {activeTab === "add" && (
//           <>
//             <h1 className="text-2xl font-bold mb-6">Add New Course</h1>
//             <AddCourses />
//           </>
//         )}

//         {activeTab === "delete" && (
//           <div className="text-gray-600">
//             <h1 className="text-2xl font-bold mb-4">Delete Course</h1>
//             <p className="text-sm">Delete functionality will be implemented soon.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Courses;
