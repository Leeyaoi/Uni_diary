import { Router } from "express";
import adminController from "./controllers/adminController";
import attendanceController from "./controllers/attendanceController";
import classController from "./controllers/classController";
import courseController from "./controllers/courseController";
import facultyController from "./controllers/facultyController";
import userController from "./controllers/userController";
import groupCourseController from "./controllers/groupCourseController";
import groupController from "./controllers/groupController";
import markController from "./controllers/markController";
import professionController from "./controllers/professionControllers";
import studentController from "./controllers/studentController";
import teacherCourseController from "./controllers/teacherCourseController";
import teacherController from "./controllers/teacherController";
import timetableController from "./controllers/timetableController";

const router = Router();

router.use("/admin", adminController);
router.use("/attendance", attendanceController);
router.use("/class", classController);
router.use("/course", courseController);
router.use("/faculty", facultyController);
router.use("/groupCourse", groupCourseController);
router.use("/group", groupController);
router.use("/mark", markController);
router.use("/profession", professionController);
router.use("/student", studentController);
router.use("/teacherCourse", teacherCourseController);
router.use("/teacher", teacherController);
router.use("/timetable", timetableController);
router.use("/user", userController);

export default router;
