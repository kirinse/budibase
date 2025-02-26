/**
 * Operator options for lucene queries
 */
export const OperatorOptions = {
  Equals: {
    value: "equal",
    label: "Equals",
  },
  NotEquals: {
    value: "notEqual",
    label: "Not equals",
  },
  Empty: {
    value: "empty",
    label: "Is empty",
  },
  NotEmpty: {
    value: "notEmpty",
    label: "Is not empty",
  },
  StartsWith: {
    value: "string",
    label: "Starts with",
  },
  Like: {
    value: "fuzzy",
    label: "Like",
  },
  MoreThan: {
    value: "rangeLow",
    label: "More than",
  },
  LessThan: {
    value: "rangeHigh",
    label: "Less than",
  },
  Contains: {
    value: "contains",
    label: "Contains",
  },
  NotContains: {
    value: "notEqual",
    label: "Does Not Contain",
  },
  In: {
    value: "oneOf",
    label: "Is in",
  },
}

// Cookie names
export const Cookies = {
  Auth: "budibase:auth",
  CurrentApp: "budibase:currentapp",
  ReturnUrl: "budibase:returnurl",
}

// Table names
export const TableNames = {
  USERS: "ta_users",
}

export const BbRoles = [
  { label: "App User", value: "appUser" },
  { label: "Developer", value: "developer" },
  { label: "Admin", value: "admin" },
]

export const BuilderRoleDescriptions = [
  {
    value: "appUser",
    icon: "User",
    label: "App user - Only has access to published apps",
  },
  {
    value: "developer",
    icon: "Hammer",
    label: "Developer - Access to the app builder",
  },
  {
    value: "admin",
    icon: "Draw",
    label: "Admin - Full access",
  },
]

export const PlanType = {
  FREE: "free",
  TEAM: "team",
  BUSINESS: "business",
  ENTERPRISE: "enterprise",
}

/**
 * API version header attached to all requests.
 * Version changelog:
 * v1:
 *   - Coerce types for search endpoint
 */
export const ApiVersion = "1"

export const Features = {
  USER_GROUPS: "userGroups",
}

// Role IDs
export const Roles = {
  ADMIN: "ADMIN",
  POWER: "POWER",
  BASIC: "BASIC",
  PUBLIC: "PUBLIC",
  BUILDER: "BUILDER",
}
/**
 * Maximum minimum range for SQL number values
 */
export const SqlNumberTypeRangeMap = {
  integer: {
    max: 2147483647,
    min: -2147483648,
  },
  int: {
    max: 2147483647,
    min: -2147483648,
  },
  smallint: {
    max: 32767,
    min: -32768,
  },
  mediumint: {
    max: 8388607,
    min: -8388608,
  },
}

export const Themes = [
  {
    class: "lightest",
    name: "Lightest",
  },
  {
    class: "light",
    name: "Light",
  },
  {
    class: "dark",
    name: "Dark",
  },
  {
    class: "darkest",
    name: "Darkest",
  },
  {
    class: "nord",
    name: "Nord",
    base: "darkest",
  },
  {
    class: "midnight",
    name: "Midnight",
    base: "darkest",
  },
]
