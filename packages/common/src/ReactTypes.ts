import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react'

//TODO: костыль для >@types/react@18.2.43, по идее должно уйти, когда обновим ts
export type ComponentPropsWithRefFix<T extends React.ElementType> = Omit<
  ComponentPropsWithRef<T>,
  'placeholder' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'
> & {
  placeholder?: string
}

export type ComponentPropsWithoutRefFix<T extends React.ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  'placeholder' | 'onPointerEnterCapture' | 'onPointerLeaveCapture'
> & {
  placeholder?: string
}
