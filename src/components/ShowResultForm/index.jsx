import { ALGORITHM_OPTIONS } from 'constants/global';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import './index.css';
import axios from 'axios';

ShowResultForm.propTypes = {
    onSubmit: PropTypes.func,
}

ShowResultForm.defaultProps = {
    onSubmit: null,
}

function refreshPage(){
  window.location.reload(false);
}

async function saveData(items,session){
    console.log(items,session)
    let listItem = JSON.stringify({
        items: [...items],
        session: {...session[session.length-1]}
    })

    localStorage.setItem(`session${localStorage.length}`,listItem)
    alert('Data was saved!')
    //localStorage.removeItem('session0');
}

function ShowResultForm(props) {
    const {items, session} = props;

    const initialValues = {
        algorithmId: null,
    };

    const validationSchema = Yup.object().shape({
        algorithmId: Yup.number().required('This field is required.').nullable(),

    });

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={ props.onSubmit }
            >
              {formikProps => {
                  return(
                    <Form>
                      <FastField
                          name="algorithmId"
                          component={SelectField}

                          className="font"
                          label="Algorithm:"
                          options={ALGORITHM_OPTIONS}
                          placeholder="Which Algorithm ?"
                      />
                      <FormGroup>
                          <Button type="submit" color="info" >Show</Button> {" "}
                          { <Button color="info" onClick={() => saveData(items, session)}>Save</Button> } {" "}
                          { <Button color="info" onClick={refreshPage}>Reset</Button> } 
                      </FormGroup>
                    </Form>
                )
              }}
            </Formik>
        </div>
    )
}

export default ShowResultForm
