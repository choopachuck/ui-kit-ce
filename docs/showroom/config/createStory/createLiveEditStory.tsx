import * as AllPackage from '@v-uik/base'
import * as AccordionPackage from '@v-uik/accordion'
import * as AutocompletePackage from '@v-uik/autocomplete'
import * as BadgePackage from '@v-uik/badge'
import * as BarPackage from '@v-uik/bar'
import * as BoxPackage from '@v-uik/box'
import * as BreadcrumbsPackage from '@v-uik/breadcrumbs'
import * as ButtonPackage from '@v-uik/button'
import * as ButtonGroupPackage from '@v-uik/button-group'
import * as CheckBoxPackage from '@v-uik/checkbox'
import * as CheckBoxGroupPackage from '@v-uik/checkbox-group'
import * as ComboBoxPackage from '@v-uik/combo-box'
import * as CommonPackage from '@v-uik/common'
import * as ContainerPackage from '@v-uik/container'
import * as DatePickerPackage from '@v-uik/date-picker'
import * as DividerPackage from '@v-uik/divider'
import * as DrawerPackage from '@v-uik/drawer'
import * as DropdownPackage from '@v-uik/dropdown'
import * as DropdownMenuPackage from '@v-uik/dropdown-menu'
import * as GridPackage from '@v-uik/grid'
import * as HooksPackage from '@v-uik/hooks'
import * as InputPackage from '@v-uik/input'
import * as InputHelperTextPackage from '@v-uik/input-helper-text'
import * as InputLabelPackage from '@v-uik/input-label'
import * as InputNumberPackage from '@v-uik/input-number'
import * as InputPasswordPackage from '@v-uik/input-password'
import * as LabelControlPackage from '@v-uik/label-control'
import * as LinkPackage from '@v-uik/link'
import * as ListPackage from '@v-uik/list'
import * as MaskedInputPackage from '@v-uik/masked-input'
import * as ModalPackage from '@v-uik/modal'
import * as NotificationPackage from '@v-uik/notification'
import * as PopupPackage from '@v-uik/popup'
import * as ProgressPackage from '@v-uik/progress'
import * as RadioPackage from '@v-uik/radio'
import * as RadioGroupPackage from '@v-uik/radio-group'
import * as SelectPackage from '@v-uik/select'
import * as SliderPackage from '@v-uik/slider'
import * as StepperPackage from '@v-uik/stepper'
import * as SwitchPackage from '@v-uik/switch'
import * as TablePackage from '@v-uik/table'
import * as TabsPackage from '@v-uik/tabs'
import * as TagPackage from '@v-uik/tag'
import * as TextareaPackage from '@v-uik/textarea'
import * as ThemePackage from '@v-uik/theme'
import * as TooltipPackage from '@v-uik/tooltip'
import * as UnderlayPackage from '@v-uik/underlay'
import * as TypographyPackage from '@v-uik/typography'
import * as UtilsPackage from '@v-uik/utils'
import React from 'react'

const LS_KEY_BASE = 'v-uik-storybook-liveedit_'

const debounce = (callback: () => void, delay: number) => {
  let timeout: NodeJS.Timeout

  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      callback()
    }, delay)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createLiveEditStory = (
  defaultCode: string,
  additionalModules: Record<string, unknown> = {},
  localStorageKey?: string
) => {
  let mounted = false
  let code

  if (localStorageKey) {
    code = window.localStorage.getItem(LS_KEY_BASE + localStorageKey)
  }

  const story = require('storybook-addon-code-editor').createLiveEditStory({
    ...(localStorageKey
      ? {
          //@ts-ignore
          modifyEditor: (v, editor) => {
            editor.getModel()?.onDidChangeContent(
              debounce(() => {
                if (!localStorageKey || !mounted) {
                  return
                }

                const code = editor.getModel()?.getValue() ?? ''
                localStorage.setItem(LS_KEY_BASE + localStorageKey, code)
              }, 500)
            )
          },
        }
      : {}),
    availableImports: {
      ...additionalModules,
      '@v-uik/base': AllPackage,
      '@v-uik/accordion': AccordionPackage,
      '@v-uik/autocomplete': AutocompletePackage,
      '@v-uik/badge': BadgePackage,
      '@v-uik/bar': BarPackage,
      '@v-uik/box': BoxPackage,
      '@v-uik/breadcrumbs': BreadcrumbsPackage,
      '@v-uik/button': ButtonPackage,
      '@v-uik/button-group': ButtonGroupPackage,
      '@v-uik/checkbox': CheckBoxPackage,
      '@v-uik/checkbox-group': CheckBoxGroupPackage,
      '@v-uik/combo-box': ComboBoxPackage,
      '@v-uik/common': CommonPackage,
      '@v-uik/container': ContainerPackage,
      '@v-uik/date-picker': DatePickerPackage,
      '@v-uik/divider': DividerPackage,
      '@v-uik/drawer': DrawerPackage,
      '@v-uik/dropdown': DropdownPackage,
      '@v-uik/dropdown-menu': DropdownMenuPackage,
      '@v-uik/grid': GridPackage,
      '@v-uik/hooks': HooksPackage,
      '@v-uik/input': InputPackage,
      '@v-uik/input-helper-text': InputHelperTextPackage,
      '@v-uik/input-label': InputLabelPackage,
      '@v-uik/input-number': InputNumberPackage,
      '@v-uik/input-password': InputPasswordPackage,
      '@v-uik/label-control': LabelControlPackage,
      '@v-uik/link': LinkPackage,
      '@v-uik/list': ListPackage,
      '@v-uik/masked-input': MaskedInputPackage,
      '@v-uik/modal': ModalPackage,
      '@v-uik/notification': NotificationPackage,
      '@v-uik/popup': PopupPackage,
      '@v-uik/progress': ProgressPackage,
      '@v-uik/radio': RadioPackage,
      '@v-uik/radio-group': RadioGroupPackage,
      '@v-uik/select': SelectPackage,
      '@v-uik/slider': SliderPackage,
      '@v-uik/stepper': StepperPackage,
      '@v-uik/switch': SwitchPackage,
      '@v-uik/table': TablePackage,
      '@v-uik/tabs': TabsPackage,
      '@v-uik/tag': TagPackage,
      '@v-uik/textarea': TextareaPackage,
      '@v-uik/theme': ThemePackage,
      '@v-uik/tooltip': TooltipPackage,
      '@v-uik/underlay': UnderlayPackage,
      '@v-uik/typography': TypographyPackage,
      '@v-uik/utils': UtilsPackage,
    },
    code: code || defaultCode,
  })

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    React.useEffect(() => {
      mounted = true

      return () => {
        mounted = false

        return
      }
    }, [])

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  }

  return {
    parameters: {
      ...story.parameters,
      controls: {
        disable: true,
      },
    },
    component: <Wrapper>{story({})}</Wrapper>,
  }
}
