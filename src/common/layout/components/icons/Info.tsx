import { SvgIcon } from '@material-ui/core'

export default function IconInfo(props: any) {
  return (
    <SvgIcon {...props}>
      <path d="M16 14 L16 23 M16 8 L16 10" />
      <circle cx="16" cy="16" r="14" />
    </SvgIcon>
  )
}
