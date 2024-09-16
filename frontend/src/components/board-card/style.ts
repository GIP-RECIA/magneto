import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

const handleCardSize = (zoomLevel: number) => {
  let cardSize = { width: "269px", height: "264px" };

  switch (zoomLevel) {
    case 0:
      cardSize = { width: "132px", height: "130px" };
      break;
    case 1:
      cardSize = { width: "183px", height: "180px" };
      break;
    case 2:
      cardSize = { width: "228px", height: "223px" };
      break;
    case 3:
      cardSize = { width: "269px", height: "264px" };
      break;
    case 4:
      cardSize = { width: "330px", height: "310px" };
      break;
    case 5:
      cardSize = { width: "371px", height: "350px" };
      break;
  }
  return cardSize;
};

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "zoomLevel",
})<{ zoomLevel: number }>(({ zoomLevel }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  boxSizing: "border-box",
  overflow: "visible",
  width: handleCardSize(zoomLevel).width,
  height: handleCardSize(zoomLevel).height,
}));

export const StyledTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  backgroundColor: "#f8f9fa",
  border: "3px solid #f8f9fa",
  borderTopRightRadius: "10px",
  borderBottomLeftRadius: "10px",
  bottom: 0,
  left: 0,
  zIndex: 1,
  fontSize: "14px",
});

export const StyledCardHeader = styled(CardHeader, {
  shouldForwardProp: (prop) => prop !== "zoomLevel",
})<{ zoomLevel: number }>(({ zoomLevel }) => ({
  padding: "0.5rem",
  paddingBottom: "0.1rem",
  "& .MuiCardHeader-content": {
    overflow: "hidden",
    flex: "1 1 auto",
    ...(zoomLevel > 1 && {
      textAlign: "center",
    }),
  },
  "& .MuiCardHeader-title": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "1.4rem",
  },
  "& .MuiCardHeader-subheader": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "1.4rem",
  },
  "& .MuiCardHeader-avatar": {
    marginRight: "0.8rem",
    marginLeft: 0,
    marginTop: "-0.5rem",
  },
  "& .MuiCardHeader-action": {
    marginLeft: 0,
    marginRight: "-0.4rem",
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export const StyledCardContent = styled(CardContent)({
  flex: 1,
  overflow: "hidden",
  paddingLeft: "0.6rem",
  paddingRight: "0.6rem",
  paddingTop: 0,
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
});

export const StyledIconButton = styled(IconButton)({
  padding: 0,
  width: "3rem",
  height: "3rem",
  "& .MuiSvgIcon-root": {
    fontSize: "2.4rem",
  },
});

export const StyledTypographySubheader = styled(Typography)({
  color: "#d6d6d6",
  fontSize: "12px",
  lineHeight: "12px",
  paddingBottom: "6px",
});

export const StyledAvatar = styled(Avatar)({
  width: "3rem",
  height: "3rem",
  padding: 0,
});

export const StyledContentTitleTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "zoomLevel",
})<{ zoomLevel: number }>(({ zoomLevel }) => ({
  fontSize: "1.6rem",
  fontWeight: "bold",
  lineHeight: "1.8rem",
  overflowWrap: "break-word",
  ...(zoomLevel < 2 && {
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: zoomLevel === 0 ? "3" : "4",
    WebkitBoxOrient: "vertical",
    paddingBottom: 0,
  }),
  ...(zoomLevel >= 2 && {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingBottom: "1rem",
  }),
}));

export const StyledCardActions = styled(CardActions, {
  shouldForwardProp: (prop) => prop !== "zoomLevel",
})<{ zoomLevel: number }>(({ zoomLevel }) => ({
  justifyContent: "space-between",
  paddingRight: "0.4rem",
  paddingBottom: 0,
  paddingTop: zoomLevel < 2 ? 0 : "1rem",
  paddingLeft: 0,
  alignItems: "center",
}));
