import React from "react";
import CourseType from "../../shared/types/course";
import { Stack } from "@mui/material";

const CourseMarks = ({ course }: { course: CourseType }) => {
  return (
    <Stack direction={"row"} id="courseMarks">
      <div id="courseName">{course.name}</div>
      <Stack id="marks">
        {course.marks.map((value) => (
          <div key={value.id}>
            {value.dateWhen}: {value.mark}
          </div>
        ))}
      </Stack>
      <div id="averMark">
        {course.marks.reduce((sum, m) => sum + m.mark, 0) / course.marks.length}
      </div>
    </Stack>
  );
};

export default CourseMarks;
