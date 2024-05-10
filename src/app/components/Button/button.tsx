import { Button, CircularProgress } from "@mui/material";

interface IButtonSpinnerProps {
    title: string;
    isLoading: boolean;
    disabled: boolean;
    onClick: () => void;
    sizeSpinner: number;

}

const ButtonCircularProgress: React.FC<IButtonSpinnerProps> = (props) => {
    const { title, isLoading, disabled, onClick, sizeSpinner } = props;

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            sx={{ width: "100%", height: "40px" }}
        >
            {isLoading ? (
                <CircularProgress size={sizeSpinner} style={{ position: "absolute", top: "50%", left: "50%", marginTop: -12, marginLeft: -12 }} />
            ) : (
                title
            )}
        </Button>
    )
}
export default ButtonCircularProgress;