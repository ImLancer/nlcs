import AddInputField from 'custom-fields/AddInputField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import './index.css';
import * as Yup from 'yup';

QuaVaForm.propTypes = {
    onSubmit: PropTypes.func,
    isBag3: PropTypes.bool,
}

QuaVaForm.defaultProps = {
    onSubmit: null,
    isBag3: null,
}

function QuaVaForm(props) {
    const { isBag3 } = props
    let initialValues;
    let validationSchema;

    
    initialValues = {
        itemName: '',
        itemAmount: '',
        itemValue: '',
        itemWeight: '',
    };
    
    if(isBag3){
        validationSchema = Yup.object().shape({
            itemName: Yup.string().required('This field is required'),

            itemAmount: Yup.number().moreThan(-1,'The Value Amount of Bag3 just accept 0 or 1').lessThan(2,'The Value Amount of Bag3 just accept 0 or 1').integer('the Value of Amount must be Integer.').required('This field is required.').nullable(),
    
            itemValue: Yup.number().moreThan(-1,'The value must be Positive.').required('This field is required.').nullable(),
    
            itemWeight: Yup.number().moreThan(-1,'The value must be Positive.').required('This field is required').nullable(),
        });
    } else{
        validationSchema = Yup.object().shape({
            itemName: Yup.string().required('This field is required'),
    
            itemAmount: Yup.number().moreThan(-1,'The Amount must be Positive and More than 0.').integer('Must be integer.').required('This field is required.').nullable(),
    
            itemValue: Yup.number().moreThan(-1,'The value must be Positive.').required('This field is required.').nullable(),
    
            itemWeight: Yup.number().moreThan(-1,'The value must be Positive.').required('This field is required').nullable(),
        });
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={ (values, {resetForm, setSubmitting}) => {
                    values.itemUnit = values.itemValue / values.itemWeight;
                    props.onSubmit(values);
                    setSubmitting(false);
                    if(isBag3){
                        resetForm({ initialValues: {
                        itemName: '',
                        itemValue: '',
                        itemWeight: ''
                        } });
                    } else{
                        resetForm({ initialValues: {
                        itemName: '',
                        itemAmount: '',
                        itemValue: '',
                        itemWeight: ''
                        } });
                    }
                }}
            >
                {formikProps => {
                    return(
                        <Form>
                            <FastField
                                name="itemName"
                                component={AddInputField}

                                className="font"
                                label="Item Name:"
                                placeholder="Insert Item Name"
                            />
                            <FastField
                                name="itemAmount"
                                component={AddInputField}

                                className="font"
                                label="Item Amount:"
                                placeholder="Insert Item Amount"
                            />
                            <FastField
                                name="itemValue"
                                component={AddInputField}

                                className="font"
                                label="Item Value:"
                                placeholder="Insert Item Value"
                            />
                            <FastField
                                name="itemWeight"
                                component={AddInputField}

                                className="font"
                                label="Item Weight:"
                                placeholder="Insert Item Weight"
                            />
                            <FormGroup className="flex-end">
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
