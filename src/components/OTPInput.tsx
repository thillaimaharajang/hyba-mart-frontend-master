import React, { useState, useRef, useEffect } from 'react';

const generateDefaultValues = (length: number, inputValues: any[]) => {
    if (length < 1) return [];
    return Array.from({ length }, (_, i) => inputValues[i] || '');
};

const isValid = (regex: { test: (arg0: any) => any; }, value: any) => regex.test(value);

const focusOnNextInput = (newValues: any, currentValues: string | any[], setFocusInput: { (value: React.SetStateAction<number | null>): void; (arg0: any): void; }) => {
    for (let [i, element] of newValues.entries()) {
        if (!element || i === currentValues.length - 1) {
            setFocusInput(i);
            break;
        }
    }
};

interface IOTPInputProps {
    name: string
    value: string,
    onChange: Function,
    numInputs?: number,
    onChangeRegex?: RegExp,
    labelText?: string,
    classNames?: string,
    autoComplete?: string,
    autoFocus?: boolean,
    isTypeNumber?: boolean,
    hasErrored?: boolean,
    inputProps?: Object,
}

const OTPInput: React.FC<IOTPInputProps> = ({
    name = '',
    value = '',
    onChange = (value: any) => console.log(value),
    numInputs = 4,
    onChangeRegex,
    labelText = 'Enter verification code',
    classNames = 'd-flex justify-content-around',
    autoComplete = 'off',
    autoFocus = false,
    isTypeNumber = false,
    hasErrored = false,
    inputProps,
}) => {
    const defaultValues = generateDefaultValues(numInputs, value.split(''));
    const [values, setValues] = useState(defaultValues);
    const [focusInput, setFocusInput]: any = useState(autoFocus ? 0 : null);
    const inputRefs: any = useRef([]);

    useEffect(() => {
        setValues(defaultValues);
    }, [value, numInputs]);

    useEffect(() => {
        const input = inputRefs.current[focusInput];
        !!input && input.focus();
    }, [focusInput]);

    const handleChange = (inputValue: string, index: number) => {
        if (!!onChangeRegex && !isValid(onChangeRegex, inputValue)) return;

        const newValues = [...values];

        let j = 0;
        values.forEach((element, i) => {
            const isNewValuesAndAnyEmptyInput = !element && !!inputValue;
            const isActionRemoveInputValue = !!element && index === i && !inputValue;

            if (isNewValuesAndAnyEmptyInput) {
                newValues[i] = inputValue.split('')[!values[index] ? j : j + 1] || '';
                j++;
            } else if (isActionRemoveInputValue) {
                newValues[i] = '';
            }
        });

        if (inputValue) {
            focusOnNextInput(newValues, values, setFocusInput);
        }

        onChange(newValues.join(''));
    };

    const onKeyPressed = (key: string, index: number) => {
        switch (key) {
            case 'Backspace':
            case 'ArrowLeft':
                return setFocusInput(index - 1);
            case 'ArrowRight':
                return setFocusInput(index + 1);
            default:
                return;
        }
    };

    return (
        <div className={`${classNames} ${hasErrored ? 'otp-field--has-errored' : ''}`.trim()}>
            {values.map((element, index) => (
                <div key={index}>
                    <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        name={name}
                        type={isTypeNumber ? 'number' : 'text'}
                        value={element}
                        onChange={(e) => handleChange(e.target.value, index)}
                        aria-label={labelText}
                        aria-required="true"
                        autoComplete={index === 0 ? autoComplete : 'off'}
                        onKeyDown={({ key }) => onKeyPressed(key, index)}
                        {...inputProps}
                        className="form-control otp-input-field"
                    />
                </div>
            ))}
        </div>
    );
};

export default OTPInput;
