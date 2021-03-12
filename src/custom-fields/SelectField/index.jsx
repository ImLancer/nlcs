import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    options: PropTypes.array,
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

SelectField.defaultProps = {
    className: '',
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
};

function SelectField(props) {
    const { 
        field, form,
        options, label, placeholder, disabled, className,
    } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const selectOption = options.find(option => option.value === value);

    const handleOptionChange = (selectedOption) => {
      const selectedValue = selectedOption ? selectedOption.value : selectedOption;

      const changeEvent = {
        target: {
          name: name,
          value: selectedValue
        }
      };
      field.onChange(changeEvent);
    }

    return (
        <div>
            <FormGroup>
                {label && <Label for={name} className={className} >{label}</Label>}
                <Select
                    id={name}
                    {...field}
                    value={selectOption}
                    onChange={handleOptionChange}

                    disabled={disabled}
                    placeholder={placeholder}
                    options={options}

                    className={showError ? 'is-invalid' : ''}
                />

                <ErrorMessage name={name} component={FormFeedback} />
            </FormGroup>
        </div>
    )
}

export default SelectField
