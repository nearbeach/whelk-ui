const ObjectStateEnum = {
  Loading: "LOADING",
  Saving: "SAVING",
  NoAction: "NO_ACTION",
  Disable: "DISABLE",
  Error: "ERROR",
} as const;

type ObjectStateEnum = (typeof ObjectStateEnum)[keyof typeof ObjectStateEnum];

export { ObjectStateEnum };