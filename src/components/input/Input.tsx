import AddBoxIcon from '@mui/icons-material/AddBox';
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";

type InputPropsType = {
    inputSubmitHandler: (input: string) => void
}

export const Input = (props: InputPropsType) => {
    //input state
    const [input, setInput] = useState<string>("");

    //проверка на корректность ввода
    const [error, setError] = useState<boolean>(false);
    const isInputEmpty: boolean = input.trim() === ''

    //функции отвечающие за input
    const inputTitleUpdateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isInputEmpty) {
            props.inputSubmitHandler(input)
            setInput("")
        } else if (e.key === 'Enter' && isInputEmpty) {
            setError(true)
        }
    }

    const onButtonClickHandler = () => {
        if (!isInputEmpty) {
            props.inputSubmitHandler(input)
            setInput("")
        } else {
            setError(true)
        }
    }

    return (
        <div className={'add-item-input'}>
            <div>
                <TextField
                    variant={'outlined'}
                    size={'small'}
                    value={input}
                    onChange={inputTitleUpdateHandler}
                    onBlur={onButtonClickHandler}
                    onKeyDown={onKeyPressHandler}
                    color={error ? 'error' : 'primary'}
                />
                <IconButton disabled={isInputEmpty} onClick={onButtonClickHandler}><AddBoxIcon/></IconButton>
            </div>
            {error && <span className={'error-message'}>This field is required</span>}
        </div>
    );
};