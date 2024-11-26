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
import WeekDayPdf from "./WeekDayPdf";
import { groupActions } from "../../../shared/stores/groupSlice";

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

const TimetablePdf = () => {
  const timetables = [
    store.getState().timetable.upTimetables,
    store.getState().timetable.bottomTimetables,
  ];

  const group = store.getState().group.fetchedGroup;

  useEffect(() => {
    if (timetables[0]) {
      store.dispatch(groupActions.getGroupById(timetables[0][0].group.id));
    }
  }, [timetables]);

  const MyPdf = () => {
    return (
      <Document>
        <Page size={[595, 990]} style={styles.page}>
          <Text
            style={[styles.dayName, { textAlign: "left", marginBottom: 10 }]}
          >
            Расписание группы{" "}
            {group && group.profession
              ? group.profession.name + "-" + (group.year % 100) + group.num
              : ""}
          </Text>
          <View>
            {timetables.length > 1 && timetables[1]
              ? timetables[1].map((value, index) => (
                  <WeekDayPdf
                    timetables={[timetables[0][index], timetables[1][index]]}
                    styles={styles}
                    key={timetables[0][index].id}
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

export default TimetablePdf;
