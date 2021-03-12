import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

AddInputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

AddInputField.defaultProps = {
    type: 'text',
    className: '',
    label: '',
    placeholder: '',
    disabled: false,
};

function AddInputField(props) {
    const { 
        field, form,
        type, label, placeholder, disabled, className
    } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <div>
            <FormGroup>
                {label && <Label for={name} className={className} >{label}</Label>}
                <Input
                    id={name}
                    { ...field} //bang 4 cai duoi
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}

                    invalid={showError}
                    // name={name}
                    // value={value}
                    // onChange={onChange}
                    // onBlur={onBlur}
                />
                <ErrorMessage name={name} component={FormFeedback} />
            </FormGroup>
        </div>
    )
}

export default AddInputField
