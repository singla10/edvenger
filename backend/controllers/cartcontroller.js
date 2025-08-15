import User from "../models/User.js";
import Course from "../models/CourseModel.js";

export const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { courseId } = req.body;

    // Find user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add course to user's cart
    user.cart.push(courseId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Course added to cart",
      cart: user.cart
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};