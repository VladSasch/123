import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  requiredFeild,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/Formscon/FormsControls";

import s from "./Myposts.module.css";
import Post from "./Post/Post";

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          placeholder={"My posts"}
          name="newPostText"
          validate={[requiredFeild, maxLengthCreator(10)]}
        />
        <div>
          <button>Add post</button>
        </div>
      </div>
    </form>
  );
};

const MypostsReduxForm = reduxForm({
  form: "ProfileAddNewPostForm",
})(AddNewPostForm);

const Myposts = (props) => {
  let postsElement = [...props.posts]
    .reverse()
    .map((p) => <Post message={p.message} likesCount={p.likesCount} />);

  const onSubmit = (value) => {
    props.addPost(value.newPostText);
  };

  return (
    <div className={s.myPost}>
      <h3> My post</h3>
      <div>
        <div>
          <MypostsReduxForm onSubmit={onSubmit} />
        </div>
        <div className={s.posts}>{postsElement}</div>
      </div>
    </div>
  );
};

export default Myposts;
