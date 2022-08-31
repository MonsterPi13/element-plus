import { computed, ref, toRaw } from 'vue'
import { toTypeString } from '@vue/shared'
import { useSize } from '@element-plus/hooks'
import { useCheckboxGroup } from '../use-checkbox-group'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../../checkbox'
import type { useModel } from './use-model'

export const useStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Partial<ReturnType<typeof useModel>>
) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const focus = ref(false)
  const size = useSize(checkboxGroup?.checkboxGroupSize, { prop: true })
  const isChecked = computed<boolean>(() => {
    const value = model!.value
    if (toTypeString(value) === '[object Boolean]') {
      return value
    } else if (Array.isArray(value)) {
      return value.map(toRaw).includes(props.label)
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    } else {
      return !!value
    }
  })

  const checkboxSize = useSize(
    computed(() =>
      isGroup.value ? checkboxGroup?.checkboxGroupSize?.value : undefined
    )
  )

  const hasOwnLabel = computed<boolean>(() => {
    return !!(slots.default || props.label)
  })

  return {
    isChecked,
    focus,
    size,
    checkboxSize,
    hasOwnLabel,
  }
}
