import { Box, Container, styled } from "@mui/material";

export const HomeContainer = styled(Box)({
    position: "relative",
    boxShadow:
        "0px 2px 4px 0px rgba(0, 0, 0, 0.2), 0px 25px 50px 0px rgba(0, 0, 0, 0.1)",
    margin: "130px 0 40px 0",
    background: "#fff",
});

export const Header = styled(Box)({
    display: "flex",
    justifyContent: "center",
    h1: {
        color: "rgba(175, 47, 47, 0.15)",
        position: "absolute",
        top: "-130px",
        fontSize: "100px",
    },
});

export const SearchBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    minWidth: "550px",
    "& .toggle-all": {
        position: "absolute",
        left: "10px",
        zIndex: 999,
    },
    "& .input-base": {
        width: "100%",
        fontSize: "24px",
        border: "none",
        boxShadow: "inset 0px -1px 5px 0px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
        outline: "none",
        "& input": {
            padding: "16px 16px 16px 60px",
        },
        "& input::-webkit-input-placeholder": {
            fontStyle: "italic",
            fontWeight: "800",
            color: "#e6e6e6",
        },
    },
});

export const Section = styled(Box)({
    position: "relative",
});

export const TodoBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #ededed",
    height: "60px",
    position: "relative",
    marginLeft: "6px",
    "& .left": {
        display: "flex",
        alignItems: "center",
        flex: 1,
        height: "100%",
        "& .MuiCheckbox-root": {
            padding: "0 10px",
        },
        "& .MuiTypography-h3": {
            paddingLeft: "15px",
            fontWeight: "400",
            width: "100%",
            padding: "14px  0",
            "&.checked": {
                color: "#d9d9d9",
                textDecoration: "line-through",
            },
        },
        "& .MuiInputBase-root": {
            width: "100%",
            height: "100%",
            "& input": {
                boxSizing: "border-box",
            },
        },
    },
    "& .close": {
        display: "none",
    },
    "&:hover .close": {
        color: "#cc9a9a",
        display: "block",
    },
    "&:hover .close:hover": {
        color: "#af5b5e",
        display: "block",
    },
});

export const TodoFooterContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    // height: "40px",
    padding: "10px 15px",
    boxShadow:
        "0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,0 17px 2px -6px rgba(0, 0, 0, 0.2)",
    "& .MuiBox-root": {
        lineHeight: "30px",
    },
    "& ul": {
        width: "350px",
        listStyle: "none",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        "& li": {
            padding: "3px 10px",
            border: "1px solid transparent",
            borderRadius: "3px",
            cursor: "pointer",
            "&.selected": {
                borderColor: "rgba(175,47,47,0.2)",
            },
        },
    },
});
