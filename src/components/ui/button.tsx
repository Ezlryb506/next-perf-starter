import { clsx } from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props
  return <button className={clsx('btn', className)} {...rest} />
}
