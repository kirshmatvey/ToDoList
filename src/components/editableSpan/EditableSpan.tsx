import {useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeItemTitle: (title: string) => void
    spanClassName?: string
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
        isBeingEdited ? <input onBlur={EditOff}
                               onKeyDown={(e) => { if (e.key === 'Enter') {EditOff()} }}
                               onChange={(e) => setItemTitle(e.currentTarget.value)}
                               value={itemTitle}
                               autoFocus/>
            : <span onDoubleClick={EditOn}>{props.title}</span>
    );
};

