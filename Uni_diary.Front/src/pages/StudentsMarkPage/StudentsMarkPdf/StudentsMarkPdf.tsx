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
  marksBorderedView: {
    padding: 5,
    border: "2px solid black", // Adding a border
    fontFamily: "Times New Roman",
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
    margin: -2,
    marginBottom: 0,
    borderBottom: "none",
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
  col2Header: {
    padding: 5,
    width: "10cm",
    border: "none",
    borderRight: "2px solid black",
    fontFamily: "Times New Roman",
  },
  col2: {
    padding: 0,
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

const StudentsMarkPdf = () => {
  const studentsMarks = store.getState().mark.studentsMarks;
  const user = store.getState().user.currentUser;

  const MyPdf = () => {
    const date = new Date();
    return (
      <Document>
        <Page size={[595, 990]} style={styles.page}>
          <Text>
            Отчет об успеваемости студента с фамилией {user?.surname} за{" "}
            {date.getDate()}.{date.getMonth()}.{date.getFullYear()}
          </Text>
          <View style={styles.header}>
            <Text style={styles.col1}>Предмет</Text>
            <Text style={styles.col2Header}>Оценки</Text>
            <Text style={styles.col3}>Среднее</Text>
          </View>
          {Array.isArray(studentsMarks)
            ? studentsMarks.map((value) => (
                <View
                  id="courseMarks"
                  key={value.id}
                  style={styles.borderedView}
                >
                  <Text style={styles.col1}>{value.course.name}</Text>
                  <View style={styles.col2}>
                    {Array.isArray(value.course.marks)
                      ? value.course.marks.map((a) => (
                          <View key={a.id} style={styles.marksBorderedView}>
                            <Text>
                              {a.dateWhen}: {a.mark}
                            </Text>
                          </View>
                        ))
                      : ""}
                  </View>
                  <Text style={styles.col3}>
                    {Array.isArray(value.course.marks) &&
                    value.course.marks.length
                      ? value.course.marks.reduce((sum, m) => sum + m.mark, 0) /
                        value.course.marks.length
                      : 0}
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

export default StudentsMarkPdf;
