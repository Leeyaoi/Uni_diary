import React from "react";
import weekDays from "../../../shared/types/weekDays";
import TimetableType from "../../../shared/types/timetable";
import ClassType from "../../../shared/types/class";
import { View, Text } from "@react-pdf/renderer";

// Helper function to render a single class
const renderClass = (classes: ClassType[], styles: any, only: boolean) => {
  if (classes.length === 0) {
    return null;
  }

  return (
    <View>
      {classes.map((cls, index) => (
        <Text
          key={cls.id}
          style={[
            only ? styles.onlyClass : styles.partialClassView,
            !cls.fullGroup
              ? cls.firstHalf
                ? styles.firstHalf
                : styles.secondHalf
              : "",
          ]}
        >
          {cls.course.name} {cls.teacher.surname} {cls.hall}/{cls.building}
        </Text>
      ))}
    </View>
  );
};

// Function to render all classes for each timetable
const renderClasses = (timetables: TimetableType[], styles: any) => {
  const divs = [];

  for (let i = 1; i <= 5; i++) {
    const found1 = timetables[0].classes.filter((cls) => cls.number === i);
    const found2 = timetables[1].classes.filter((cls) => cls.number === i);

    if (!same(found1, found2)) {
      divs.push(
        <View key={`${i}-classes`} style={styles.classView}>
          <View key={`${i}-class-up`} style={styles.partialClassView}>
            {found1.length > 0 && renderClass(found1, styles, false)}
          </View>
          <View key={`${i}-class-down`} style={styles.partialClassView}>
            {found2.length > 0 && renderClass(found2, styles, false)}
          </View>
        </View>
      );
    } else {
      divs.push(
        <View key={`${i}-class`} style={styles.classView}>
          <View style={styles.onlyClass}>
            {found1.length > 0 && renderClass(found1, styles, true)}
          </View>
        </View>
      );
    }
  }

  return divs;
};

const same = (found1: ClassType[], found2: ClassType[]): boolean => {
  if (found1.length != found2.length) {
    return false;
  }
  if ((found1.length = 1)) {
    if (found1[0] == null || found2[0] == null) {
      return true;
    }
    return (
      `${found1[0].course.name} ${found1[0].teacher.surname} ${found1[0].hall}/${found1[0].building} ${found1[0].fullGroup} ${found1[0].firstHalf}` ==
      `${found2[0].course.name} ${found2[0].teacher.surname} ${found2[0].hall}/${found2[0].building} ${found2[0].fullGroup} ${found2[0].firstHalf}`
    );
  } else {
    return same([found1[0]], [found2[0]]) && same([found1[1]], [found2[1]]);
  }
};

// Main component to render weekday content for PDF
const WeekDayPdf = ({
  timetables,
  styles,
}: {
  timetables: TimetableType[];
  styles: any;
}) => {
  const dayName = weekDays[(timetables[0].day % 7) - 1];

  return (
    <View style={styles.borderedView}>
      <Text style={styles.dayName} key={`${dayName}-name`}>
        {dayName}
      </Text>
      <View key={timetables[0].day}>{renderClasses(timetables, styles)}</View>
    </View>
  );
};

export default WeekDayPdf;
