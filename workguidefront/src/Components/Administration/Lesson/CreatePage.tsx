import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getTheory } from "../../../Request/GetRequests";
import { createTheoryPage } from "../../../Request/PostRequests";
import { updateTheory } from "../../../Request/PutRequests";
import Theory from "../../../Types/Theory";
import Loading from "../../Common/Loading";
import NavigationBar from "../Common/NavigationBar";
import TheoryPageForm from "./TheoryPageForm";



const CreatePage = () => {
  const TEST = 'test', THEORY = 'theory';
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [theory, setTheory] = useState<Theory | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const [type, setType] = useState<string>(THEORY);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleLoadPage = async (id: string, isTheory: boolean) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;

    if (isTheory) {
      const res = await getTheory(id);
      setType(THEORY);
      setTheory(res);
      setEdit(true);
    }

    setLoading(false);
  }

  const handleSaveTheory = async (content: string) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;
    await createTheoryPage(lessonId, +pageNumber, content);
    navigate('../')
  }

  const handleEditTheory = async (content: string) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;
    const id: string = searchParams.get('id')!;

    await updateTheory(+pageNumber, content, lessonId, id);
    navigate('../')
  }

  const renderSwitch = () => {
    switch (type) {
      case TEST:
        return <h4>Тест</h4>;
      default:
        return <TheoryPageForm save={edit ? handleEditTheory : handleSaveTheory} initialData={theory} />;
    }
  }

  useEffect(() => {
    const id: string | null = searchParams.get('id');
    if (id) {
      const type: string | null = searchParams.get('type');
      if (type === THEORY) {
        handleLoadPage(id, true);
      } else if (type === TEST) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [])

  return (
    <>
      <NavigationBar />
      {loading ? <Loading /> : <>
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
      </>}
    </>
  );
}

export default CreatePage;