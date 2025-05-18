import { FormItemContext } from '@/contexts/form-item.context'
import { DivProps } from '@/types/core/div-props.type'
import { FormProps } from '@/types/core/form-props.type'
import { PropsWithChildren, useMemo } from 'react'
import {
  FieldValues,
  FormProvider,
  useFormContext,
  UseFormReturn
} from 'react-hook-form'

import styles from './form.module.css'

type ItemProps = {
  name: string
  label?: string
} & DivProps

const Item = ({
  children,
  name,
  label,
  ...props
}: PropsWithChildren<ItemProps>) => {
  const {
    formState: { errors }
  } = useFormContext()

  const contextValue = useMemo(() => ({ name }), [name])

  return (
    <FormItemContext.Provider value={contextValue}>
      <div className={styles.item} {...props}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        {children}
        {errors[name] && (
          <p className={styles.error}>{errors[name]?.message as string}</p>
        )}
      </div>
    </FormItemContext.Provider>
  )
}

type CustomFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>
} & FormProps

const Form = <T extends FieldValues>({
  form,
  children,
  ...props
}: PropsWithChildren<CustomFormProps<T>>) => (
  <FormProvider {...form}>
    <form className={styles.form} noValidate={true} {...props}>
      {children}
    </form>
  </FormProvider>
)

Form.Item = Item
export default Form
