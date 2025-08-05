import { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";
import {useParams} from "react-router-dom";

const CourseContentPage = () => {
  const {courseId} = useParams();
  const { getCourseContent } = useAdmin();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!courseId) {
        console.error("❌ No courseId found in URL");
        return;
      }

      try {
        const data = await getCourseContent(courseId);
        setContent(data);
      } catch (err) {
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [courseId, getCourseContent]);

  if (loading) return <p>⏳ Loading course content...</p>;

return (
    <div>
      <h2>📘 Course Content</h2>
      {content && content.chapters && content.chapters.length > 0 ? (
        content.chapters.map((ch) => (
          <div key={ch.chapterId} className="mb-4">
            <h3 className="font-bold">{ch.ChapterTitle}</h3>
            {ch.chapterContent.length > 0 ? (
              ch.chapterContent.map((lec) => (
                <div key={lec.lectureId} 
                className="mb-4"> 
                <h4 className="font-medium">{lec.lectureTitle}</h4>
                <video
                controls
                width="100%"
                className="rounded-lg shadow"
                >
                  <source src={lec.lectureUrl} type="video/mp4"/>
                  your browser does not support the video tag.
                </video>
                </div>
              ))
            ) : (
              <p>No lectures found in this chapter.</p>
            )}
          </div>
        ))
      ) : (
        <p>No chapters found for this course.</p>
      )}
    </div>
  );
};

export default CourseContentPage;