import { Component } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Container } from 'react-bootstrap';
import { Button } from '@mui/material';
import Theory from '../../../Types/Theory';


type MyProps = { initialData: Theory | null, save: (content: string) => void };


class TheoryPageForm extends Component<MyProps, {}> {
  createState = (text: string) => {
    const blocks = convertFromHTML(text);
    return EditorState.createWithContent(ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap));
  };

  state = {
    editorState: this.createState(this.props.initialData ? this.props.initialData.content : '')
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };

  onSave = async () => {
    const content = '<div>\n' + draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) + '</div>';
    this.props.save(content);
  };

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
          <div style={{ borderTop: '1px solid lightgray', width: '100%' }}></div>
          <Button style={{ width: '100%' }} onClick={this.onSave}>Сохранить</Button>
        </Container>
      </>
    );
  }
}
export default TheoryPageForm;