
type ButtonType = {
    title: string,
    onClickHandler?: () => void,
    disabled?: boolean,
    className?: string,
}

export const Button = (props: ButtonType) => {
    return (
        <button className={props.className} disabled={props.disabled} onClick={props.onClickHandler}>{props.title}</button>
    )
}