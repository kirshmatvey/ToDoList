import {useState} from "react";
import {TextField, Typography} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeItemTitle: (title: string) => void
    status?: boolean
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
    const [itemTitle, setItemTitle] = useState<string>(props.title);
    const EditOn = () => setIsBeingEdited(true);
    const EditOff = () => {
        props.changeItemTitle(itemTitle)
        setIsBeingEdited(false);
    }
    return (
        isBeingEdited ? <TextField variant={'standard'}
                                   onBlur={EditOff}
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                           EditOff()
                                       }
                                   }}
                                   onChange={(e) => setItemTitle(e.currentTarget.value)}
                                   value={itemTitle}
                                   autoFocus
            />
            : <Typography sx={props.status ? {display: 'inline-block', textDecoration: "line-through", opacity: "0.5"} : {display: 'inline-block'}} variant={'body1'} onDoubleClick={EditOn}>{props.title}</Typography>
    );
};

