import { SvgIcon } from '@material-ui/core'

export default function IconUnlock(props: any) {
  return (
    <SvgIcon {...props}>
      {/* <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 7 9 3 16 3 23 3 23 8 23 9 M16 20 L16 23" />
      <circle cx="16" cy="24" r="1" /> */}
      <path d="M5, 15l0,15l22,0l0,-15l-22,0Zm4,0c0,-8 0,-12 7,-12c7,0 7,5 7,6m-7,11l0,3" />
      <circle cx="16" cy="24" r="1" />
    </SvgIcon>
  )
}
