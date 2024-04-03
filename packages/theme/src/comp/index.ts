import { Theme, ThemeOptions } from '../interface'
import { checkCompatibilityMode } from '../utils'
import { createAccordion, createAccordionItem } from './accordion'
import { createBadge } from './badge'
import {
  createBar,
  createBarButton,
  createBarDate,
  createBarDivider,
  createBarDropdown,
  createBarDropdownItem,
  createBarMenuItem,
  createBarSearch,
  createBarSelect,
  createSubBar,
} from './bar'
import { createBreadcrumbs } from './breadcrumbs'
import { createButton } from './button'
import { createButtonGroup } from './buttonGroup'
import { createCheckbox } from './checkbox'
import { createComboBox } from './comboBox'
import {
  createDatePicker,
  createRangePicker,
  createCalendarPicker,
  createDayView,
  createRangeDayView,
  createMonthView,
  createYearView,
  createTimeView,
} from './datePicker'
import { createDrawer, createDrawerHeader, createDrawerFooter } from './drawer'
import { createDropdownMenu, createDropdownMenuItem } from './dropdownMenu'
import { createInput } from './input'
import { createInputHelperText } from './inputHelperText'
import { createInputPassword } from './inputPassword'
import { createInputLabel } from './inputLabel'
import { createLabelControl } from './labelControl'
import { createLink } from './link'
import { createListItem, createListItemGroup } from './list'
import { createModal, createModalHeader } from './modal'
import { createNotification } from './notification'
import { createLinearProgress, createCircularProgress } from './progress'
import { createRadio } from './radio'
import { createSelect } from './select'
import { createSlider } from './slider'
import { createStep } from './stepper'
import { createSwitch } from './switch'
import { createTable } from './table'
import { createTabs } from './tabs'
import { createTag, createTagInput } from './tag'
import { createTextarea } from './textarea'
import { createTooltip } from './tooltip'
import { createDivider } from './divider'
import { createDropzone } from './dropzone'
import { createFileItem } from './fileItem'
import { createUnderlay } from './underlay'
import { createAvatar } from './avatar'
import { createCard } from './card'
import { createCloseButton } from './closeButton'

// пришлось описать ключи компонентного слоя отдельным типом, потому что вывести
// не удается из-за циклической зависимости в createComp.
type ComponentLayerKeys =
  | 'accordion'
  | 'accordionItem'
  | 'avatar'
  | 'badge'
  | 'bar'
  | 'barButton'
  | 'barDate'
  | 'barDivider'
  | 'barDropdown'
  | 'barDropdownItem'
  | 'barMenuItem'
  | 'barSearch'
  | 'barSelect'
  | 'subBar'
  | 'breadcrumbs'
  | 'button'
  | 'buttonGroup'
  | 'card'
  | 'checkbox'
  | 'comboBox'
  | 'datePicker'
  | 'rangePicker'
  | 'calendarPicker'
  | 'dayView'
  | 'rangeDayView'
  | 'monthView'
  | 'yearView'
  | 'drawer'
  | 'drawerHeader'
  | 'drawerFooter'
  | 'dropdownMenu'
  | 'dropdownMenuItem'
  | 'input'
  | 'inputHelperText'
  | 'inputPassword'
  | 'inputLabel'
  | 'labelControl'
  | 'link'
  | 'listItem'
  | 'listItemGroup'
  | 'modal'
  | 'modalHeader'
  | 'notification'
  | 'circularProgress'
  | 'linearProgress'
  | 'radio'
  | 'select'
  | 'slider'
  | 'step'
  | 'switch'
  | 'table'
  | 'tabs'
  | 'tag'
  | 'tagInput'
  | 'textarea'
  | 'tooltip'
  | 'divider'
  | 'dropzone'
  | 'fileItem'
  | 'underlay'
  | 'closeButton'

let compatibilityMap: { [key in ComponentLayerKeys]: boolean | undefined }

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createComp = (theme: Theme, customProps: ThemeOptions = {}) => {
  compatibilityMap = {
    accordion: checkCompatibilityMode(customProps, 'accordion'),
    accordionItem: checkCompatibilityMode(customProps, 'accordionItem'),
    avatar: checkCompatibilityMode(customProps, 'avatar'),
    badge: checkCompatibilityMode(customProps, 'badge'),
    bar: checkCompatibilityMode(customProps, 'bar'),
    barButton: checkCompatibilityMode(customProps, 'barButton'),
    barDate: checkCompatibilityMode(customProps, 'barDate'),
    barDivider: checkCompatibilityMode(customProps, 'barDivider'),
    barDropdown: checkCompatibilityMode(customProps, 'barDropdown'),
    barDropdownItem: checkCompatibilityMode(customProps, 'barDropdownItem'),
    barMenuItem: checkCompatibilityMode(customProps, 'barMenuItem'),
    barSearch: checkCompatibilityMode(customProps, 'barSearch'),
    barSelect: checkCompatibilityMode(customProps, 'barSelect'),
    subBar: checkCompatibilityMode(customProps, 'subBar'),
    breadcrumbs: checkCompatibilityMode(customProps, 'breadcrumbs'),
    button: checkCompatibilityMode(customProps, 'button'),
    buttonGroup: checkCompatibilityMode(customProps, 'buttonGroup'),
    card: checkCompatibilityMode(customProps, 'card'),
    checkbox: checkCompatibilityMode(customProps, 'checkbox'),
    comboBox: checkCompatibilityMode(customProps, 'comboBox'),
    datePicker: checkCompatibilityMode(customProps, 'datePicker'),
    divider: checkCompatibilityMode(customProps, 'divider'),
    rangePicker: checkCompatibilityMode(customProps, 'rangePicker'),
    calendarPicker: checkCompatibilityMode(customProps, 'calendarPicker'),
    dayView: checkCompatibilityMode(customProps, 'dayView'),
    rangeDayView: checkCompatibilityMode(customProps, 'rangeDayView'),
    monthView: checkCompatibilityMode(customProps, 'monthView'),
    yearView: checkCompatibilityMode(customProps, 'yearView'),
    drawer: checkCompatibilityMode(customProps, 'drawer'),
    drawerHeader: checkCompatibilityMode(customProps, 'drawerHeader'),
    drawerFooter: checkCompatibilityMode(customProps, 'drawerFooter'),
    dropdownMenu: checkCompatibilityMode(customProps, 'dropdownMenu'),
    dropdownMenuItem: checkCompatibilityMode(customProps, 'dropdownMenuItem'),
    dropzone: checkCompatibilityMode(customProps, 'dropzone'),
    fileItem: checkCompatibilityMode(customProps, 'fileItem'),
    input: checkCompatibilityMode(customProps, 'input'),
    inputHelperText: checkCompatibilityMode(customProps, 'inputHelperText'),
    inputPassword: checkCompatibilityMode(customProps, 'inputPassword'),
    inputLabel: checkCompatibilityMode(customProps, 'inputLabel'),
    labelControl: checkCompatibilityMode(customProps, 'labelControl'),
    link: checkCompatibilityMode(customProps, 'link'),
    listItem: checkCompatibilityMode(customProps, 'listItem'),
    listItemGroup: checkCompatibilityMode(customProps, 'listItemGroup'),
    modal: checkCompatibilityMode(customProps, 'modal'),
    modalHeader: checkCompatibilityMode(customProps, 'modalHeader'),
    notification: checkCompatibilityMode(customProps, 'notification'),
    circularProgress: checkCompatibilityMode(customProps, 'circularProgress'),
    linearProgress: checkCompatibilityMode(customProps, 'linearProgress'),
    radio: checkCompatibilityMode(customProps, 'radio'),
    select: checkCompatibilityMode(customProps, 'select'),
    slider: checkCompatibilityMode(customProps, 'slider'),
    step: checkCompatibilityMode(customProps, 'step'),
    switch: checkCompatibilityMode(customProps, 'switch'),
    table: checkCompatibilityMode(customProps, 'table'),
    tabs: checkCompatibilityMode(customProps, 'tabs'),
    tag: checkCompatibilityMode(customProps, 'tag'),
    tagInput: checkCompatibilityMode(customProps, 'tagInput'),
    textarea: checkCompatibilityMode(customProps, 'textarea'),
    tooltip: checkCompatibilityMode(customProps, 'tooltip'),
    underlay: checkCompatibilityMode(customProps, 'underlay'),
    closeButton: checkCompatibilityMode(customProps, 'closeButton'),
  }

  return {
    accordion: createAccordion(theme, compatibilityMap.accordion),
    accordionItem: createAccordionItem(theme, compatibilityMap.accordionItem),
    avatar: createAvatar(theme, compatibilityMap.avatar),
    badge: createBadge(theme, compatibilityMap.badge),
    bar: createBar(theme, compatibilityMap.bar),
    barButton: createBarButton(theme, compatibilityMap.barButton),
    barDate: createBarDate(theme, compatibilityMap.barDate),
    barDivider: createBarDivider(theme, compatibilityMap.barDivider),
    barDropdown: createBarDropdown(theme, compatibilityMap.barDropdown),
    barDropdownItem: createBarDropdownItem(
      theme,
      compatibilityMap.barDropdownItem
    ),
    barMenuItem: createBarMenuItem(theme, compatibilityMap.barMenuItem),
    barSearch: createBarSearch(theme, compatibilityMap.barSearch),
    barSelect: createBarSelect(theme, compatibilityMap.barSelect),
    subBar: createSubBar(theme, compatibilityMap.subBar),
    breadcrumbs: createBreadcrumbs(theme, compatibilityMap.breadcrumbs),
    button: createButton(theme, compatibilityMap.button),
    buttonGroup: createButtonGroup(theme, compatibilityMap.buttonGroup),
    card: createCard(theme, compatibilityMap.card),
    checkbox: createCheckbox(theme, compatibilityMap.checkbox),
    comboBox: createComboBox(theme, compatibilityMap.comboBox),
    datePicker: createDatePicker(theme, compatibilityMap.datePicker),
    divider: createDivider(theme, compatibilityMap.divider),
    rangePicker: createRangePicker(theme, compatibilityMap.rangePicker),
    calendarPicker: createCalendarPicker(
      theme,
      compatibilityMap.calendarPicker
    ),
    dayView: createDayView(theme, compatibilityMap.dayView),
    /**
     * @deprecated будет удалено, используйте dayView
     */
    rangeDayView: createRangeDayView(),
    monthView: createMonthView(theme, compatibilityMap.monthView),
    yearView: createYearView(theme, compatibilityMap.yearView),
    drawer: createDrawer(theme, compatibilityMap.drawer),
    drawerHeader: createDrawerHeader(theme, compatibilityMap.drawerHeader),
    drawerFooter: createDrawerFooter(theme, compatibilityMap.drawerFooter),
    dropdownMenu: createDropdownMenu(theme, compatibilityMap.dropdownMenu),
    dropdownMenuItem: createDropdownMenuItem(
      theme,
      compatibilityMap.dropdownMenuItem
    ),
    dropzone: createDropzone(theme, compatibilityMap.dropzone),
    fileItem: createFileItem(theme, compatibilityMap.fileItem),
    input: createInput(theme, compatibilityMap.input),
    inputHelperText: createInputHelperText(
      theme,
      compatibilityMap.inputHelperText
    ),
    inputPassword: createInputPassword(theme, compatibilityMap.inputPassword),
    inputLabel: createInputLabel(theme, compatibilityMap.inputLabel),
    labelControl: createLabelControl(theme, compatibilityMap.labelControl),
    link: createLink(theme, compatibilityMap.link),
    listItem: createListItem(theme, compatibilityMap.listItem),
    listItemGroup: createListItemGroup(theme, compatibilityMap.listItemGroup),
    modal: createModal(theme, compatibilityMap.modal),
    modalHeader: createModalHeader(theme, compatibilityMap.modalHeader),
    notification: createNotification(theme, compatibilityMap.notification),
    linearProgress: createLinearProgress(
      theme,
      compatibilityMap.linearProgress
    ),
    circularProgress: createCircularProgress(
      theme,
      compatibilityMap.circularProgress
    ),
    radio: createRadio(theme, compatibilityMap.radio),
    select: createSelect(theme, compatibilityMap.select),
    slider: createSlider(theme, compatibilityMap.slider),
    step: createStep(theme, compatibilityMap.step),
    switch: createSwitch(theme, compatibilityMap.switch),
    table: createTable(theme, compatibilityMap.table),
    tabs: createTabs(theme, compatibilityMap.tabs),
    tag: createTag(theme, compatibilityMap.tag),
    tagInput: createTagInput(theme, compatibilityMap.tagInput),
    textarea: createTextarea(theme, compatibilityMap.textarea),
    timeView: createTimeView(),
    tooltip: createTooltip(theme, compatibilityMap.tooltip),
    underlay: createUnderlay(theme, compatibilityMap.underlay),
    closeButton: createCloseButton(theme, compatibilityMap.closeButton),
  }
}

type CompLayer = ReturnType<typeof createComp>

export type Comp = { backwardCompatibilityMode?: boolean } & {
  [key in keyof CompLayer]: CompLayer[key] & {
    backwardCompatibilityMode?: boolean
  }
}
