import { hexToRgb, blackColor } from "../../../assets/jss/styles";

const cardAvatarStyle = {
  cardAvatar: {
    "&$cardAvatarProfile img": {
      width: "100%",
      height: "auto",
    },
  },
  cardAvatarProfile: {
    maxWidth: "150px",
    maxHeight: "150px",
    margin: "-50px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 16px 38px -12px rgba(" +
      hexToRgb(blackColor) +
      ", 0.56), 0 4px 25px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
  },
  cardAvatarText: {
    width: "150px",
    height: "150px",
    fontSize: "50px",
    lineHeight: "150px",
    color: "#fff",
    textAlign: "center",
    background: "#bdbdbd",
  },
  uploadButton: {
    color: "#3f51b5",
    padding: "4px 5px",
    fontSize: "0.875rem",
    minWidth: "64px",
    boxSizing: "border-box",
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: "500",
    lineHeight: "1.75",
    borderRadius: "4px",
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: "50px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 255, 0.1)",
    },
  },
  imageUpload: {
    display: "none",
  },
};

export default cardAvatarStyle;
