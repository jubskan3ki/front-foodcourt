import { Fragment } from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { FormProps } from '../../../interface/components/common/form.interface';

function Form({
    dataQuestion,
    handleSubmit,
    dataArr,
    setDataArr,
    label,
}: FormProps) {
    const linkedInput = (name: string, value: string | boolean) => {
        setDataArr((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {dataQuestion.map((question, index) => (
                <Fragment key={index}>
                    {question.type === 'switch' ? (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={Boolean(dataArr[question.name])}
                                    onChange={(e) =>
                                        linkedInput(
                                            question.name,
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label={question.label}
                            className="mt-2"
                        />
                    ) : (
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            id={question.name}
                            label={question.label}
                            type={question.type}
                            value={dataArr[question.name] || ''}
                            onChange={(e) =>
                                linkedInput(question.name, e.target.value)
                            }
                            sx={{ my: 2 }}
                        />
                    )}
                </Fragment>
            ))}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full py-2"
            >
                {label}
            </Button>
        </form>
    );
}

export default Form;
