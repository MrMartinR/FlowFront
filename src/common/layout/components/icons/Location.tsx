import { SvgIcon } from '@material-ui/core'

export default function IconLocation(props: any) {
  return (
    <SvgIcon {...props}>
      <circle cx="16" cy="11" r="4" />
      <path d="M24 15 C21 22 16 30 16 30 16 30 11 22 8 15 5 8 10 2 16 2 22 2 27 8 24 15 Z" />
    </SvgIcon>
  )
}
