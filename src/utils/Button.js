export const buttonStyle = (isActive) => ({
  borderTopLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  backgroundColor: isActive ? "blue" : "white",
  color: isActive ? "white" : "blue",
  padding: "8px 16px",
  border: 0,
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
});
