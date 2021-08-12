import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = (props) => {

  //error and touched property in meta object
  //const [value,setValue] = useState("");
  //const [buttonText, setbuttonText] = useState("");
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
 
  // meta object has error property 
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`; // to add red boxes when there is error
    //<input {...input} autoComplete="off" />
    // <input onChange = {props.input.onChange} value={props.input.value} > // {..input} we do so to pass all the properties present in input object
  
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {

      props.onSubmit(formValues);//action creator will be called 

  }


  //field is just a component //field does not know what to show on screen it throws an error, therefore we pass component
  // adding label and passing it to renderInput // Field does not know what to do we with label prop so it will pass it to renderInput
  // handleSubmit is callback func in redux-from //it handles event object // it will call onSubmit with all the values out of the form 
  // we need to add ui form error because it is off in sematic ui
  //
  return (
    <form
      onSubmit={props.handleSubmit(onSubmit)}
      className="ui form error"
    >
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className= {`ui button primary`}>Submit</button>
    </form>
  );

}

// validate func is get called with all the values of the form
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {    // checking for title
    errors.title = 'You must enter a title'; // passes the error message to renderInput in meta object // name should be identical
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({ //initial values from streamEdit is being passed to reduxForm
  form: 'streamForm', // gets stored in form state
  validate           // wiring up to our component //passing 
})(StreamForm);
//we had to wire up reduxForm to our component // will pass additional props to our form
//redux - from has a reducer // dont need to write action creatot or mapStatetoProps , it does it automatically
