// frontend/src/components/CourseContent.js
import { useEffect, useState } from "react";
import { useShop } from "../../context/shopcontext";
import { useParams } from "react-router-dom";

const CourseContent = () => {
  const { id: courseId } = useParams(); // ✅ Get courseId from URL
  const { getCourseContent, fetchProgress,completeLecture,progressData } = useShop();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingLecture, setLoadingLecture] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchContent = async () => {
      if (!courseId) {
        console.error("❌ No courseId found in URL");
        return;
      }

      try {
        const data = await getCourseContent(courseId);
        setContent(data);

             if (user?._id) {
          await fetchProgress(courseId, user._id);
             }
      } 
      
      
      catch (err) {
        console.error("❌ Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [courseId, getCourseContent, fetchProgress]);

  const handleComplete = async (chapterId, lectureId) => {
    setLoadingLecture(true);
    try {
      if (user?._id) {
        await completeLecture(courseId, chapterId, lectureId, user._id);
      }
    } catch (err) {
      console.error("❌ Error completing lecture:", err);
    } finally {
      setLoadingLecture(false);
    }
  };

  if (loading) return <p>⏳ Loading course content...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📘 Course Content</h2>

      {/* ✅ Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progressData?.percentage || 0}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Completion: <strong>{progressData?.percentage || 0}%</strong>
      </p>


      {content && content.chapters && content.chapters.length > 0 ? (
        <div className="space-y-4">
          {content.chapters.map((ch) => (
            <details
              key={ch.chapterId}
              className="border rounded-md p-4 bg-white shadow"
            >
              <summary className="cursor-pointer font-semibold text-lg">
                {ch.ChapterTitle}
              </summary>

              {ch.chapterContent.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {ch.chapterContent.map((lec) => (
                    <div key={lec.lectureId} className="border p-3 rounded bg-gray-50">
                      <h4 className="font-medium">{lec.lectureTitle}</h4>
                      <video
                        controls
                        width="100%"
                        className="rounded-lg shadow mt-2"
                      >
                        <source src={lec.lectureUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                                            <button
                        onClick={() => handleComplete(ch.chapterId, lec.lectureId)}
                        className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        disabled={loadingLecture}
                      >
                        {loadingLecture ? "Marking..." : "✅ Mark Complete"}
                      </button>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">No lectures in this chapter.</p>
              )}
            </details>
          ))}
        </div>
      ) : (
        <p>No chapters available for this course.</p>
      )}
    </div>
  );
};

export default CourseContent;
