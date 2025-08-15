import { razorpayinstance } from "../config/razorpay.js";
import Course from "../models/CourseModel.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
          const options = {
            amount: course.price * 100, // Amount in paise
            currency: "INR",
            receipt: courseId.toString(),
            
          } 
          const order = await razorpayinstance.orders.create(options);
          return res.status(200).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "failed to create razorpay order" });
    }
};

export const verifyPayment = async (req, res) => {
 try{
    const {courseId, userId, razorpay_order_id} = req.body;
    const orderInfo = await razorpayinstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status === `paid`) {
        // Enroll user in the course
        const user = await User.findById(userId);
         if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

        if(!user.enrolledCourses.includes(courseId)) {
            await user.enrolledCourses.push(courseId);
            await user.save();
        }

        // coure with stud.
         const course = await Course.findById(courseId);
         if (!course) {
            return res.status(404).json({ message: "Course not found" });
         }

         if(!course.enrolledStudents.includes(userId)) {
            await course.enrolledStudents.push(userId);
            await course.save();
         }

          //  to send lectures in response:
         course.CourseContent.forEach(chapter => console.log(chapter.chapterContent));


       return res.status(200).json({ 
        message: "Payment verified successfully and enrollment successful",
        course
     });
    }
    else{
        return res.status(400).json({ message: `Payment verification failed ${orderInfo.status}` });
    }
 } catch (error) {
     console.error("Error verifying payment:", error);
     res.status(500).json({ message: "failed to verify razorpay payment" });
     
 }
};

// import crypto from "crypto";

// export const verifyPayment = (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     // Generate signature using your secret
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//     console.log("Expected Signature:", expectedSignature);
//     console.log("Razorpay Signature:", razorpay_signature);

//     if (expectedSignature === razorpay_signature) {
//         // Payment is verified
//         return res.status(200).json({ success: true, message: "Payment verified successfully" });
//     } else {
//         // Payment verification failed
//         return res.status(400).json({ success: false, message: "Payment verification failed" });
//     }
// };