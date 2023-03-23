import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheoryPage } from "../../../Request/PostRequests";
import NavigationBar from "../Common/NavigationBar";
import TheoryPageForm from "./TheoryPageForm";


const CreatePage = () => {
  const TEST = 'test', THEORY = 'theory';
  const params = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState<string>(THEORY);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleSaveTheory = async (content: string) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;

    await createTheoryPage(lessonId, +pageNumber, content);
    navigate('../')
  }

  const renderSwitch = () => {
    switch (type) {
      case TEST:
        return <h4>Тест</h4>;
      default:
        return <TheoryPageForm save={handleSaveTheory} />;
    }
  }

  return (
    <>
      <NavigationBar />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={handleTypeChange}
        >
          <MenuItem value={THEORY}>THEORY</MenuItem>
          <MenuItem value={TEST}>TEST</MenuItem>
        </Select>
      </FormControl>
      {renderSwitch()}
    </>
  );
}

export default CreatePage;