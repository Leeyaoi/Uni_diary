import { Attendance } from "../dbModels/attendance";
import CreateAttendanceDto from "../DTOs/AttendanceDtos/CreateAttendanceDto";
import UpdateAttendanceDto from "../DTOs/AttendanceDtos/UpdateAttendanceDto";
import GenericController from "./genericController";

const attendanceController = new GenericController<
  CreateAttendanceDto,
  UpdateAttendanceDto
>(Attendance).GenerateController();

export default attendanceController;
