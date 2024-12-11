import {
  View,
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  Font,
  Text,
} from "@react-pdf/renderer";
import React, { useEffect } from "react";
import { store } from "../../../shared/stores/store";
import { attendanceActions } from "../../../shared/stores/attendanceSlice";
import { MarkActions } from "../../../shared/stores/markSlice";
import { groupActions } from "../../../shared/stores/groupSlice";
import { CourseActions } from "../../../shared/stores/courseSlice";
import MarkType from "../../../shared/types/mark";

Font.register({
  family: "Times New Roman",
  src: "../../../assets/fonts/times new roman.ttf", // Path to your font file
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontSize: 12,
    height: "40cm",
    fontFamily: "Times New Roman",
  },
  borderedView: {
    border: "2px solid black", // Adding a border
    fontFamily: "Times New Roman",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    marginTop: -2,
  },
  header: {
    border: "2px solid black", // Adding a border
    fontFamily: "Times New Roman",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
  },
  col1: {
    padding: 5,
    width: "10cm",
    border: "none",
    borderRight: "2px solid black",
    fontFamily: "Times New Roman",
  },
  col2: {
    padding: 5,
    width: "5cm",
    border: "none",
    borderRight: "2px solid black",
    fontFamily: "Times New Roman",
  },
  col3: {
    padding: 5,
    width: "5cm",
    border: "none",
    fontFamily: "Times New Roman",
  },
});

const MarksPdf = () => {
  const MyPdf = () => {
    const selectedGroupCourse =
      store.getState().groupCourse.selectedGroupCourse;
    const studentsWithMarks = store.getState().mark.studentsWithMarks;
    const group = store.getState().group.fetchedGroup;
    const course = store.getState().course.fetchedCourse;
    const date = new Date();

    useEffect(() => {
      store.dispatch(groupActions.getGroupById(selectedGroupCourse.groupId));
      store.dispatch(CourseActions.getCourseById(selectedGroupCourse.courseId));
      store.dispatch(MarkActions.getMarkByCourse(selectedGroupCourse));
    }, []);

    const getAverage = (marks: MarkType[]) => {
      if (marks.length == 0) return 0;
      let k = 0;
      marks.forEach((m) => (k += m.mark));
      return k / marks.length;
    };

    return (
      <Document>
        <Page size={[595, 990]} style={styles.page}>
          <Text>
            Отчет об отметках за {date.getDate()}.{date.getMonth()}.
            {date.getFullYear()}
            {group && group.profession
              ? `${group.profession.name}-${group.year % 100}${group.num}`
              : ""}{" "}
            по предмету {course ? course.name : ""}
          </Text>
          <View style={styles.header}>
            <Text style={styles.col1}>Студент</Text>
            <Text style={styles.col2}>Отметки</Text>
            <Text style={styles.col3}>Среднее</Text>
          </View>
          {studentsWithMarks
            ? studentsWithMarks.map((value) => (
                <View key={value.id} style={styles.borderedView}>
                  <Text style={styles.col1}>
                    {value.name} {value.surname}
                  </Text>
                  <Text style={styles.col2}>
                    {value.marks.map((m, i) => (
                      <Text key={i}>{m.mark}</Text>
                    ))}
                  </Text>
                  <Text style={styles.col3}>{getAverage(value.marks)}</Text>
                </View>
              ))
            : ""}
        </Page>
      </Document>
    );
  };

  return (
    <PDFViewer style={{ height: "99vh", width: "99vw" }}>
      <MyPdf />
    </PDFViewer>
  );
};

export default MarksPdf;
