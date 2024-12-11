import { Stack } from "@mui/material";
import React from "react";
import TimetableType from "../../shared/types/timetable";
import weekDays from "../../shared/types/weekDays";
import ClassType from "../../shared/types/class";

const WeekDay = ({
  timetable,
  handleOpenCreate,
  handleOpenEdit,
}: {
  timetable: TimetableType;
  handleOpenCreate: (timetableId: string, number: number) => void;
  handleOpenEdit: (
    timetableId: string,
    number: number,
    classId: string
  ) => void;
}) => {
  const renderClasses = (classes: ClassType[]) => {
    const divs = [];
    for (let i = 1; i <= 5; i++) {
      const found = classes.filter((value) => value.number == i);
      if (found.length == 0) {
        divs.push(
          <div
            key={i}
            className="class"
            onClick={() => {
              handleOpenCreate(timetable.id, i);
            }}
          ></div>
        );
      } else if (found.length == 1) {
        if (found[0].fullGroup) {
          divs.push(
            <div
              key={found[0].id}
              className="class"
              onClick={() => {
                handleOpenEdit(timetable.id, i, found[0].id ?? "");
              }}
            >
              {found[0].course.name} {found[0].teacher.surname} {found[0].hall}/
              {found[0].building} {found[0].lection ? "(лек.)" : ""}
            </div>
          );
        } else if (found[0].firstHalf) {
          divs.push(
            <div
              className="class"
              key={found[0].id}
              onClick={() => {
                handleOpenCreate(timetable.id, i);
              }}
            >
              <div
                className="firstHalf"
                key={found[0].id + "-1"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit(timetable.id, i, found[0].id ?? "");
                }}
              >
                {found[0].course.name} {found[0].teacher.surname}{" "}
                {found[0].hall}/{found[0].building}{" "}
                {found[0].lection ? "(лек.)" : ""}
              </div>
            </div>
          );
        } else {
          divs.push(
            <div
              className="class"
              key={found[0].id}
              onClick={() => {
                handleOpenCreate(timetable.id, i);
              }}
            >
              <div
                className="secondHalf"
                key={found[0].id + "-2"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit(timetable.id, i, found[0].id ?? "");
                }}
              >
                {found[0].course.name} {found[0].teacher.surname}{" "}
                {found[0].hall}/{found[0].building}{" "}
                {found[0].lection ? "(лек.)" : ""}
              </div>
            </div>
          );
        }
      } else {
        let firstHalf = found[0];
        let secondHalf = found[1];
        if (found[1].firstHalf) {
          firstHalf = found[1];
          secondHalf = found[0];
        }
        divs.push(
          <div className="class" key={found[0].id}>
            <div
              className="firstHalf"
              key={found[0].id + "-1"}
              onClick={() => {
                handleOpenEdit(timetable.id, i, firstHalf.id ?? "");
              }}
            >
              {firstHalf.course.name} {firstHalf.teacher.surname}{" "}
              {firstHalf.hall}/{firstHalf.building}{" "}
              {found[0].lection ? "(лек.)" : ""}
            </div>
            <div
              className="secondHalf"
              key={found[0].id + "-2"}
              onClick={() => {
                handleOpenEdit(timetable.id, i, secondHalf.id ?? "");
              }}
            >
              {secondHalf.course.name} {secondHalf.teacher.surname}{" "}
              {secondHalf.hall}/{secondHalf.building}{" "}
              {found[0].lection ? "(лек.)" : ""}
            </div>
          </div>
        );
      }
    }
    return divs;
  };

  return (
    <div className="weekDay">
      <strong>{weekDays[(timetable.day % 7) - 1]}</strong>
      <Stack>{renderClasses(timetable.classes)}</Stack>
    </div>
  );
};

export default WeekDay;
