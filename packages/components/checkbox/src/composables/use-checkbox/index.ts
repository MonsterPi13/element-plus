import { useFormItemInputId } from '@element-plus/hooks'
import { useDisabled } from './use-disabled'
import { useEvent } from './use-event'
import { useModel } from './use-model'
import { useStatus } from './use-status'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../../checkbox'

const setStoreValue = (
  props: CheckboxProps,
  { model }: Partial<ReturnType<typeof useModel>>
) => {
  function addToStore() {
    if (Array.isArray(model!.value) && !model!.value.includes(props.label)) {
      model!.value.push(props.label)
    } else {
      model!.value = props.trueLabel || true
    }
  }
  props.checked && addToStore()
}

export const useCheckbox = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots']
) => {
  const { model, isGroup, isLimitExceeded, elFormItem } = useModel(props)
  const { focus, size, isChecked, checkboxSize, hasOwnLabel } = useStatus(
    props,
    slots,
    {
      model,
    }
  )
  const { isDisabled } = useDisabled(props, { model, isChecked })
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: elFormItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup,
  })
  const { handleChange, onClickRoot } = useEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem,
  })

  setStoreValue(props, { model })

  return {
    elFormItem,
    inputId,
    isLabeledByFormItem,
    isChecked,
    isDisabled,
    isGroup,
    checkboxSize,
    hasOwnLabel,
    model,
    handleChange,
    onClickRoot,
    focus,
    size,
  }
}
