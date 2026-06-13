import type { App } from 'vue'
import * as components from './components'
import './styles/style.css'

// Components
export { WlkButton } from './components/Button'
export { WlkCard } from './components/Card'
export { WlkCardFooter } from './components/Card/CardFooter'
export { WlkCardHeader } from './components/Card/CardHeader'
export { WlkCheckBox } from './components/CheckBox'
export { WlkDatetime } from './components/Datetime'
export { WlkDropDown } from './components/DropDown'
export { WlkDropDownItem } from './components/DropDown/DropDownItem'
export { WlkFormGroup } from './components/FormGroup'
export { WlkNumberInput } from './components/NumberInput'
export { WlkPasswordInput } from './components/PasswordInput'
export { WlkRenderErrorMessage } from './components/RenderErrorMessage'
export { WlkSwitch } from './components/Switch'
export { WlkSelect } from './components/Select'
export { WlkTabs } from './components/Tabs'
export { WlkTextArea } from './components/TextArea'
export { WlkTextInput } from './components/TextInput'
export { WlkToolTip } from './components/ToolTip'

// Enums (export both the value and the type)
export { ObjectStateEnum } from './utils/enums/ObjectStateEnum'
export type { ObjectStateEnum as ObjectStateEnumType } from './utils/enums/ObjectStateEnum'
export { ObjectTitleCaseEnums } from './utils/enums/ObjectTitleCaseEnums'
export { ObjectTypeEnums } from './utils/enums/ObjectTypeEnums'

// Types (pure interfaces — must use 'export type')
export type { DocumentItemInterface } from './types/DocumentItemInterface'
export type { FolderItemInterface } from './types/FolderItemInterface'
export type { MenuItemInterface } from './types/MenuItemInterface'
export type { SelectOptionInterface } from './types/SelectOptionInterface'
export type { TabHeaderInterface } from './types/TabHeaderInterface'

// ValidationRuleInterface — mixed file (Symbols are values, ValidationRuleInterface is a type)
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
} from './types/ValidationRuleInterface'
export type { ValidationRuleInterface } from './types/ValidationRuleInterface'

// Validation rules
export { email } from './validation/rules/Email'
export { maxLength } from './validation/rules/MaxLength'
export { maxValue } from './validation/rules/MaxValue'
export { minLength } from './validation/rules/MinLength'
export { minValue } from './validation/rules/MinValue'
export { pattern } from './validation/rules/Pattern'
export { required } from './validation/rules/Required'

// Composables
export { useValidation } from './composables/useValidation'

// Vue plugin default export
export default {
    install(app: App) {
        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component)
        })
    }
}