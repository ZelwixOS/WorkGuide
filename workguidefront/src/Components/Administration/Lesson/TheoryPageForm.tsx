import { Component } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import Theory from '../../../Types/Theory';
import { X } from 'react-bootstrap-icons';
import CustomFile from '../../../Types/CustomFile';
import { createTheoryFile } from '../../../Request/PostRequests';
import { deleteTheoryFile } from '../../../Request/DeleteRequests';


type MyProps = { initialData: Theory | null, save: (content: string, files: File[]) => void };


class TheoryPageForm extends Component<MyProps, {}> {
  createState = (text: string) => {
    const blocks = convertFromHTML(text);
    return EditorState.createWithContent(ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap));
  };

  state = {
    editorState: this.createState(this.props.initialData ? this.props.initialData.content : ''),
    files: [],
    initialFiles: this.props.initialData ? (this.props.initialData.files ? this.props.initialData.files : []) : [],
    isEdit: this.props.initialData !== null
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };

  onOpenFileChoose = () => document.getElementById('files')?.click();

  onFilesAdd = async (e: any) => {

    let files: File[] = this.state.files;
    let initialFiles: CustomFile[] = this.state.initialFiles;
    const isEdit = this.state.isEdit;
    for (var i = 0; i < e.target.files.length; i++) {
      let fileExist = files.find(f => f.name === e.target.files[i].name) !== undefined || initialFiles.find(f => f.name === e.target.files[i].name) !== undefined;
      if (!fileExist) {
        if(isEdit) {
          let res: CustomFile = await createTheoryFile(this.props.initialData!.id, e.target.files[i]);
          initialFiles.push(res);
        } else {
          files.push(e.target.files[i]);
        }
      }
    }

    this.setState({
      files,
      initialFiles
    });
  };

  onFileDelete = (file: File) => {
    let files: File[] = this.state.files;
    const index = files.indexOf(file);
    if (index > -1) {
      files.splice(index, 1);
    }
    this.setState({
      files
    });
  }

  onEditFileDelete = async (file: CustomFile) => {
    await deleteTheoryFile(file.id);

    let initialFiles: CustomFile[] = this.state.initialFiles;
    const index = initialFiles.indexOf(file);
    if (index > -1) {
      initialFiles.splice(index, 1);
    }
    this.setState({
      initialFiles
    });
  }
  
  onSave = async () => {
    const content = '<div>\n' + draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) + '</div>';
    const files = this.state.files;
    this.props.save(content, files);
  };

  fileCard = (file: File) => {
    return <Row key={file.name} style={{ width: '100%', userSelect: 'none' }}>
      <Col className='d-flex'>{ file.name }</Col>
      <Col xs="auto" onClick={() => this.onFileDelete(file)}><X size={24}/></Col>
    </Row>
  }

  editFileCard = (file: CustomFile) => {
    return <Row key={file.name} style={{ width: '100%', userSelect: 'none' }}>
      <Col className='d-flex'>{ file.name }</Col>
      <Col xs="auto" onClick={() => this.onEditFileDelete(file)}><X size={24}/></Col>
    </Row>
  }

  render() {
    const { editorState } = this.state;
    return (
      <>
        <Container>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Container>
        <Container>
          <input style={{ display: 'none' }} type="file" id="files" name="files" onChange={this.onFilesAdd}/>
          <div style={{ borderTop: '1px solid lightgray', width: '100%' }}></div>
          <Button style={{ width: '100%', borderBottom: '1px solid lightgray' }} onClick={this.onOpenFileChoose}>Добавить файл</Button>
          { this.state.files.length > 0 ? this.state.files.map((f: File) => this.fileCard(f)) : null }
          { this.state.initialFiles.length > 0 ? this.state.initialFiles.map((f: CustomFile) => this.editFileCard(f)) : null }
          { this.state.files.length === 0 && this.state.initialFiles.length === 0 ?
          <div className='d-flex align-items-center justify-content-center w-100' style={{ height: '100px' }}>
            <h4 className='p-0 m-0'>Файлы не выбраны</h4>
          </div> : null }
        </Container>
        <Container>
          <div style={{ borderTop: '1px solid lightgray', width: '100%' }}></div>
          <Button style={{ width: '100%' }} onClick={this.onSave}>Сохранить</Button>
        </Container>
      </>
    );
  }
}
export default TheoryPageForm;