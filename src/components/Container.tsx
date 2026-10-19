import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'

type ContainerProps = {
  /** narrow: about 52rem for reading. default: 80rem. wide: 96rem. */
  size?: 'narrow' | 'default' | 'wide'
} & ComponentPropsWithoutRef<'div'>

const sizes = {
  narrow: 'max-w-3xl',
  default: 'max-w-7xl',
  wide: 'max-w-[96rem]',
} as const

/** Centred page measure with responsive side gutters (20px on phones, up to 48px on desktop). */
export function Container({ size = 'default', className, ...rest }: ContainerProps) {
  return <div className={clsx('mx-auto w-full px-5 sm:px-8 lg:px-12', sizes[size], className)} {...rest} />
}
