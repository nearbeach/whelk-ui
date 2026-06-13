export type { DocumentItemInterface } from './DocumentItemInterface'
export type { FolderItemInterface } from './FolderItemInterface'
export type { MenuItemInterface } from './MenuItemInterface'
export type { SelectOptionInterface } from './SelectOptionInterface'
export type { TabHeaderInterface } from './TabHeaderInterface'

// ValidationRuleInterface.ts is a mixed file — Symbols are values, ValidationRuleInterface is a type
export {
    REQUIRED_RULE,
    MINIMUM_LENGTH,
    MINIMUM_DATE,
    MINIMUM_VALUE,
    MAXIMUM_LENGTH,
    MAXIMUM_DATE,
    MAXIMUM_VALUE,
    PATTERN,
    EMAIL,
} from './ValidationRuleInterface'
export type { ValidationRuleInterface } from './ValidationRuleInterface'