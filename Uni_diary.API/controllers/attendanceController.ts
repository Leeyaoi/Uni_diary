import { Attendance } from "../dbModels/attendance";
import CreateAttendanceDto from "../DTOs/AttendanceDtos/CreateAttendanceDto";
import UpdateAttendanceDto from "../DTOs/AttendanceDtos/UpdateAttendanceDto";
import GenericRepository from "../repositories/GenericRepository";
import { UpdateAdminValidator } from "../validators/AdminValidators/UpdateAdminValidator";
import { CreateAttendanceValidator } from "../validators/AttendanceValidators/CreateAttendanceValidator";
import GenericController from "./genericController";

const repo = new GenericRepository(Attendance);

const attendanceController = new GenericController<
  CreateAttendanceDto,
  UpdateAttendanceDto
>(CreateAttendanceValidator, UpdateAdminValidator, repo).GenerateController();

export default attendanceController;
