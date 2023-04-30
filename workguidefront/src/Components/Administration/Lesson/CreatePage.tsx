import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getTest, getTestAnswers, getTheory } from "../../../Request/GetRequests";
import { createQuestionPage, createTheoryPage } from "../../../Request/PostRequests";
import { updateTest, updateTheory } from "../../../Request/PutRequests";
import Test from "../../../Types/Test";
import TestAnswer from "../../../Types/TestAnswer";
import TestValidAnswers from "../../../Types/TestValidAnswers";
import Theory from "../../../Types/Theory";
import Loading from "../../Common/Loading";
import NavigationBar from "../Common/NavigationBar";
import QuestionPageForm from "./QuestionPageForm";
import TheoryPageForm from "./TheoryPageForm";



const CreatePage = () => {
  const TEST = 'test', THEORY = 'theory';
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [theory, setTheory] = useState<Theory | null>(null);
  const [question, setQuestion] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
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
    } else {
      const res = await getTest(id);
      const answers = await getTestAnswers(id);
      let testAnswers = res.answers as TestAnswer[];
      let validAnswers = answers.answers as TestAnswer[];
      if(testAnswers) {
        if(validAnswers) {
          validAnswers.forEach(va => {
            let answer = testAnswers.find(a => a.content === va.content);
            if (answer) {
              answer.isValid = true;
            }
          });
        }
      }
      setType(TEST);
      setQuestion(res);
      setAnswers(testAnswers);
      setEdit(true);
    }

    setLoading(false);
  }

  const handleSaveTheory = async (content: string, files: File[]) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;
    await createTheoryPage(lessonId, pageNumber, content, files);
    navigate('../')
  }

  const handleEditTheory = async (content: string, _: File[]) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;
    const id: string = searchParams.get('id')!;

    await updateTheory(+pageNumber, content, lessonId, id);
    navigate('../')
  }

  const handleSaveQuestion = async (hasManyAnswers: boolean, content: string, answers: TestAnswer[]) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;

    await createQuestionPage(lessonId, +pageNumber, hasManyAnswers, content, answers);
    navigate('../')
  }

  const handleEditQuestion = async (hasManyAnswers: boolean, content: string, answers: TestAnswer[]) => {
    const lessonId: string = params?.id!;
    const pageNumber: string = params?.pageNumber!;
    const id: string = searchParams.get('id')!;

    await updateTest(lessonId, +pageNumber, hasManyAnswers, content, answers, id);
    navigate('../')
  }

  const renderSwitch = () => {
    switch (type) {
      case TEST:
        return <QuestionPageForm save={edit ? handleEditQuestion : handleSaveQuestion} question={question} answers={answers}/>;
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
        handleLoadPage(id, false);
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
            <MenuItem value={THEORY}>ТЕОРИЯ</MenuItem>
            <MenuItem value={TEST}>ВОПРОС</MenuItem>
          </Select>
        </FormControl>
        {renderSwitch()}
      </>}
    </>
  );
}

export default CreatePage;