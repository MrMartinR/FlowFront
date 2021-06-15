import { SvgIcon, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}))

export default function IconOption(props: any) {
  const classes = useStyles()
  return (
    <SvgIcon {...props}>
      <circle cx="7" cy="16" r="2" />
      <circle cx="16" cy="16" r="2" />
      <circle cx="25" cy="16" r="2" />{' '}
    </SvgIcon>
  )
}
