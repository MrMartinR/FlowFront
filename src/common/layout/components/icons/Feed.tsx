import { SvgIcon } from '@material-ui/core'

export default function IconFeed(props: any) {
  return (
    <SvgIcon {...props}>
      <circle cx="6" cy="26" r="2" />
      <path d="M4 15 C11 15 17 21 17 28 M4 6 C17 6 26 15 26 28" />
    </SvgIcon>
  )
}
