import { SvgIcon } from '@material-ui/core'

export default function IconLock(props: any) {
  return (
    <SvgIcon {...props}>
      <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23" />
      <circle cx="16" cy="24" r="1" />
    </SvgIcon>
  )
}
