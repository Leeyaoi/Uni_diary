import React from "react";
import ClassType from "../../shared/types/class";
import weekDays from "../../shared/types/weekDays";
import { Stack } from "@mui/material";

const TeacherWeekDay = ({
  classes,
  day,
  handleClick,
}: {
  classes: ClassType[];
  day: number;
  handleClick: (selectedClass: ClassType) => void;
}) => {
  const renderClasses = (classes: ClassType[]) => {
    const divs = [];
    //five classes per day max
    for (let i = 1; i <= 5; i++) {
      const found = classes.filter((value) => value.number == i);
      //if empty class
      if (found.length == 0) {
        divs.push(<div className="class"></div>);
      } else if (found.length == 1) {
        const groupName =
          found[0].timetable.group.profession.name +
          "-" +
          (found[0].timetable.group.year % 100) +
          found[0].timetable.group.num;
        //if full group
        if (found[0].fullGroup) {
          divs.push(
            <div
              className="class"
              key={found[0].id}
              onClick={() => {
                handleClick(found[0]);
              }}
            >
              {found[0].course.name} {groupName} {found[0].hall}/
              {found[0].building}
            </div>
          );
          //if first half
        } else if (found[0].firstHalf) {
          divs.push(
            <div className="class">
              <div
                className="firstHalf"
                key={found[0].id}
                onClick={(e) => {
                  handleClick(found[0]);
                }}
              >
                {found[0].course.name} {groupName} {found[0].hall}/
                {found[0].building}
              </div>
            </div>
          );
          //if second half
        } else {
          divs.push(
            <div className="class">
              <div
                className="secondHalf"
                key={found[0].id}
                onClick={(e) => {
                  handleClick(found[0]);
                }}
              >
                {found[0].course.name} {groupName} {found[0].hall}/
                {found[0].building}
              </div>
            </div>
          );
        }
      }
    }
    return divs;
  };

  return (
    <div className="weekDay">
      <strong>{weekDays[day]}</strong>
      <Stack>{renderClasses(classes)}</Stack>
    </div>
  );
};

export default TeacherWeekDay;
