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

const AttendancePdf = () => {
  const groupId = store.getState().class.selectedClass.timetable.group.id;
  const courseId = store.getState().class.selectedClass.course.id;
  const courseName = store.getState().class.selectedClass.course.name;
  const group = store.getState().class.selectedClass.timetable.group;
  const AttendedStudents = store.getState().attendance.AttendedStudents;

  useEffect(() => {
    store.dispatch(
      attendanceActions.getAttendanceForTeacher({ groupId, courseId })
    );
  }, []);

  const MyPdf = () => {
    const date = new Date();
    return (
      <Document>
        <Page size={[595, 990]} style={styles.page}>
          <Text>
            Отчет о посещаемости группы {group.profession.name}-
            {group.year % 100}
            {group.num} на предмете {courseName}* за {date.getDate()}.
            {date.getMonth()}.{date.getFullYear()}
          </Text>
          <View style={styles.header}>
            <Text style={styles.col1}>Студент</Text>
            <Text style={styles.col2}>Пропуски лекций</Text>
            <Text style={styles.col3}>Пропуски практических занятий</Text>
          </View>
          {AttendedStudents
            ? AttendedStudents.map((value) => (
                <View key={value.id} style={styles.borderedView}>
                  <Text style={styles.col1}>
                    {value.name} {value.surname}
                  </Text>
                  <Text style={styles.col2}>
                    {value.attendances.filter((x) => x.lection).length * 2}
                  </Text>
                  <Text style={styles.col3}>
                    {value.attendances.filter((x) => !x.lection).length * 2}
                  </Text>
                </View>
              ))
            : ""}
          <Text>
            * если студента нет в списке - значит, что он ни разу не пропускал
            этот предмет
          </Text>
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

export default AttendancePdf;
