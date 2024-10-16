import { Attendance } from "../dbModels/attendance";
import CreateAttendanceDto from "../DTOs/AttendanceDtos/CreateAttendanceDto";
import UpdateAttendanceDto from "../DTOs/AttendanceDtos/UpdateAttendanceDto";
import { UpdateAdminValidator } from "../validators/AdminValidators/UpdateAdminValidator";
import { CreateAttendanceValidator } from "../validators/AttendanceValidators/CreateAttendanceValidator";
import GenericController from "./genericController";

const attendanceController = new GenericController<
  CreateAttendanceDto,
  UpdateAttendanceDto
>(
  Attendance,
  CreateAttendanceValidator,
  UpdateAdminValidator
).GenerateController();

export default attendanceController;
