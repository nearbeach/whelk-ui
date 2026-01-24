const ObjectStateEnum = {
  Disable: "DISABLE",
  Error: "ERROR",
  Loading: "LOADING",
  LoggingIn: "LOGGING_IN",
  LoggingOut: "LOGGING_OUT",
  NoAction: "NO_ACTION",
  Saving: "SAVING",
} as const;

type ObjectStateEnum = (typeof ObjectStateEnum)[keyof typeof ObjectStateEnum];

export { ObjectStateEnum };