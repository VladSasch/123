import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  maxLengthCreator,
  requiredFeild,
} from '../../utils/validators/validators';
import { Textarea } from '../common/Formscon/FormsControls';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const AddMessageForm = (props) => {
  const maxLength10 = maxLengthCreator(10);
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={[requiredFeild, maxLength10]}
          name={'newMessageBody'}
          placeholder={'Enter your message'}
        />
      </div>

      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(
  AddMessageForm
);

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} img={d.img} />
  ));

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} />
  ));

  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };
  //let newMessageBody = state.newMessageBody;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>

      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};
export default Dialogs;
