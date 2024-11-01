import {
  Container,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import "./ProfessionPage.scss";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { facultyActions } from "../../shared/stores/facultySlice";

const ProfessionPage = () => {
  const dispatch = useAppDispatch();
  const faculties = useAppSelector((state) => state.faculty.faculties);

  useEffect(() => {
    dispatch(facultyActions.fetchFaculty());
  }, []);

  const [faculty, setFaculty] = useState("");

  const handleFacultyChange = (event: SelectChangeEvent) => {
    setFaculty(event.target.value);
  };

  const renderFaculties = () => {
    const items: any[] = [];
    for (let i in faculties) {
      let value = faculties[i];
      if (value == null) {
        continue;
      }
      items.push(
        <MenuItem
          key={`${value.id}`}
          value={value.id}
        >{`${value.name}`}</MenuItem>
      );
    }
    return items;
  };

  return (
    <Container className="container">
      <Header />
      <div id="content">
        <div id="profession">
          <div id="facultySelect">
            <p>Факультет:</p>
            <FormControl fullWidth variant="standard">
              <Select
                className="text-input"
                value={faculty}
                label="Age"
                onChange={handleFacultyChange}
              >
                {renderFaculties()}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default ProfessionPage;
