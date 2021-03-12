import { ALGORITHM_OPTIONS } from 'constants/global';
import LoadFileField from 'custom-fields/LoadFileField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import './index.scss';

LoadFileForm.propTypes = {
    onSubmit: PropTypes.func,
}

LoadFileForm.defaultProps = {
    onSubmit: null,
}

function LoadFileForm(props) {
    const initialValues = {
        thing: null,
    };

    const validationSchema = Yup.object().shape({
        thing: Yup.mixed().required('This field is required.').nullable(),
    });

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={ props.onSubmit }
            >
                {formikProps => {
                  const { values, setFieldValue } = formikProps
                    return(
                        <Form className="form">
                            <input
                                type="file"
                                name="thing"
                                title="choose"
                                className="file"
                                onChange={event => { setFieldValue('thing', event.target.files[0]) }}
                            />

                            <FormGroup>
                                <Button type="submit" color="info"  >Submit</Button>
                            </FormGroup>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default LoadFileForm
