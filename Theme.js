
export const DarkTHEME = {
  background: "rgb(42,42,42)",
  textColor: "rgb(153, 191, 87)",
  headerColor: "rgb(2, 139, 124)",
  dangerColor: "#e53935",
  disabledColor: "#949494",
  headerText: '#000000',
  cardColor: "rgb(0,0,0)"
};
export const LightTHEME = {
  background: "rgb(255,255,255)",
  textColor: "rgb(0,0,0)",
  headerColor: "rgb(2, 139, 124)",
  dangerColor: "#e53935",
  disabledColor: "#949494",
  headerText: '#ffffff',
  cardColor: "rgb(153, 191, 87)"
};

export const container = (background) => {
  return {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: background,
  }
}

