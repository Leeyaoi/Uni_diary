import {
  View,
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import React, { useEffect } from "react";
import { store } from "../../../shared/stores/store";
//import WeekDayPdf from "./WeekDayPdf";
import { groupActions } from "../../../shared/stores/groupSlice";
import TeacherWeekDayPdf from "./TeacherWeekDayPdf";

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
  },
  borderedView: {
    border: "2px solid black", // Adding a border
    marginBottom: 5,
    fontFamily: "Times New Roman",
    fontSize: 12,
  },
  classView: {
    display: "flex",
    position: "relative",
    border: "2px solid black", // Adding a border
    height: "1cm",
    margin: 0,
    marginLeft: -2,
    marginRight: -2,
    marginBottom: -2,
    fontFamily: "Times New Roman",
    fontSize: 11,
  },
  partialClassView: {
    border: "1px solid black", // Adding a border
    height: "0.5cm",
    textAlign: "center",
    margin: -1,
    marginTop: 0,
    fontFamily: "Times New Roman",
    fontSize: 11,
    borderTop: "none",
  },
  dayName: {
    fontFamily: "Times New Roman",
    textAlign: "center",
    fontSize: 12,
  },
  onlyClass: {
    height: "0.9cm",
    fontFamily: "Times New Roman",
    textAlign: "center",
    verticalAlign: "sub",
    fontSize: 12,
  },
  firstHalf: {
    width: "50%",
    borderRight: "1px solid black",
  },
  secondHalf: {
    width: "50%",
    border: "none",
    borderLeft: "1px solid black",
    position: "absolute",
    top: -1,
    right: 3,
  },
});

const TeacherTimetablePdf = () => {
  const classes = [
    store.getState().class.upTeachersClasses,
    store.getState().class.bottomTeachersClasses,
  ];

  const MyPdf = () => {
    return (
      <Document>
        <Page size={[595, 990]} style={styles.page}>
          <View>
            {classes.length > 1 && classes[0]
              ? classes[0].map((value, index) => (
                  <TeacherWeekDayPdf
                    classes={[classes[0][index], classes[1][index]]}
                    styles={styles}
                    day={index}
                    key={index}
                  />
                ))
              : ""}
          </View>
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

export default TeacherTimetablePdf;
