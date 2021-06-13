import { SvgIcon } from '@material-ui/core'

export default function IconAdd(props: any) {
  return (
    <SvgIcon {...props}>
      {/* <path d="M16 2 L16 30 M2 16 L30 16" /> */}
      <path d="M16,2l0,28m-14,-14l28,0" />
    </SvgIcon>
  )
}
