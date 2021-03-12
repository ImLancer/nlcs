import { ALGORITHM_OPTIONS, SOLUTION_BAG_OPTIONS } from 'constants/global';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import './index.scss';

QuaVaForm.propTypes = {
    onSubmit: PropTypes.func,
}

QuaVaForm.defaultProps = {
    onSubmit: null,
}

function QuaVaForm(props) {
    const initialValues = {
        quantity: '',
        weight: '',
        subjectId: null,
    };

    const validationSchema = Yup.object().shape({
        quantity: Yup.number().moreThan(1).integer('Must be Integer.').required('This field is required.').nullable(),

        weight: Yup.number().moreThan(0).required('This field is required.').nullable(),

        subjectId: Yup.number().required('This field is required.').nullable(),
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
                                name="quantity"
                                component={InputField}

                                className="font"
                                label="Quantity:"
                                placeholder="Insert Quantity"
                            />
                            <FastField
                                name="weight"
                                component={InputField}

                                className="font"
                                label="Weight:"
                                placeholder="Insert Weight"
                            />
                            <FastField
                                name="subjectId"
                                component={SelectField}

                                className="font"
                                label="Subject:"
                                options={SOLUTION_BAG_OPTIONS}
                                placeholder="Which Subject ?"
                            />
                            <FormGroup>
                                <Button type="submit" color="info" >Submit</Button>
                            </FormGroup>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default QuaVaForm
