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
    width: "5cm",
    border: "none",
    borderRight: "2px solid black",
    fontFamily: "Times New Roman",
  },
  col2: {
    padding: 5,
    width: "10cm",
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

const StudentAttendancePdf = () => {
  const studentsAttendance = store.getState().attendance.studentsAttendance;
  const user = store.getState().user.currentUser;

  const MyPdf = () => {
    const date = new Date();
    return (
      <Document>
        <Page size={[595, 990]} style={styles.page}>
          <Text>
            Отчет о посещаемости студента с фамилией {user?.surname} за{" "}
            {date.getDate()}.{date.getMonth()}.{date.getFullYear()}
          </Text>
          <View style={styles.header}>
            <Text style={styles.col1}>Предмет</Text>
            <Text style={styles.col2}>Даты пропусков</Text>
            <Text style={styles.col3}>Общее количество часов</Text>
          </View>
          {Array.isArray(studentsAttendance)
            ? studentsAttendance.map((value) => (
                <View
                  id="courseMarks"
                  key={value.id}
                  style={styles.borderedView}
                >
                  <Text style={styles.col1}>{value.course.name}</Text>
                  <Text style={styles.col2}>
                    {Array.isArray(value.course.attendances)
                      ? value.course.attendances.map((a) => <>{a.dateWhen}</>)
                      : ""}
                  </Text>
                  <Text style={styles.col3}>
                    {Array.isArray(value.course.attendances)
                      ? value.course.attendances.length * 2
                      : ""}
                  </Text>
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

export default StudentAttendancePdf;
