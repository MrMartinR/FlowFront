import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import {
  makeStyles,
  Button,
  Grid,
  Typography,
  CardMedia,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem,
} from '@material-ui/core'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg'
import { countriesList } from '../data/countriesList'
import { UserAlert } from '../../../utils/UserAlert'
import { RootState } from '../../../../redux/rootReducer'
import { Alert } from '@material-ui/lab'

/* initializing values */
const initialValues = {
  email: '',
  username: '',
  name: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

/* types */
type RegisterType = {
  email: string
  username: string
  password: string
  name: string
}

/* styles */
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #f2f2f2 25%, #ccc 90%)',
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

/* User registration component */
export const Registration = () => {
  /* styles */
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.auth,
    }),
    shallowEqual
  )
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues: initialValues,
  })

  const dispatch = useDispatch()
  const resetSuccess = () => {
    dispatch(authActions.resetSuccess())
  }
  const [country, setCountry] = useState('61c2888b-8b6a-4536-830f-3a14e86a9cd5')
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }

  const onSubmit = ({ email, username, password, name }: RegisterType) => {
    dispatch(authActions.registration(email, name, username, password, country))
  }
  useEffect(() => {
    setLoading(currentState.loading)
  }, [currentState.loading])
  return (
    <Grid container className={classes.root}>
      <UserAlert
        resetSuccess={resetSuccess}
        success={currentState.success}
        message={currentState.message}
        error={currentState.error}
      />
      {/* logo */}
      <Grid>
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Registration
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column" justify="center" alignItems="center">
            {/* begin: Country */}
            <FormControl fullWidth variant="outlined" size="small">
              <FormLabel>Country</FormLabel>
              <Select labelId="Country" id="country" name="country" value={country} onChange={handleCountry} fullWidth>
                {countriesList.map((country: any) => (
                  <MenuItem value={country.id} key={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select your country</FormHelperText>
            </FormControl>
            {/* end: Country */}
            {/* begin: Name */}
            <FormControl fullWidth size="small">
              <FormLabel>Name</FormLabel>
              <OutlinedInput
                name="name"
                type="text"
                autoComplete="on"
                inputRef={register({ required: true, minLength: 3, maxLength: 50 })}
                fullWidth
              />
              <FormHelperText>Type your name</FormHelperText>
              {errors.name && errors.name.type === 'required' && <Alert severity="error">Name is required</Alert>}
              {errors.name && errors.name.type === 'minLength' && (
                <Alert severity="error">Name should be at-least 3 characters.</Alert>
              )}
              {errors.name && errors.name.type === 'maxLength' && (
                <Alert severity="error">Name should be less than 50 characters.</Alert>
              )}
            </FormControl>
            {/* end: Name */}
            {/* begin: Email */}
            <FormControl fullWidth size="small">
              <FormLabel>Email</FormLabel>
              <OutlinedInput
                name="email"
                type="email"
                autoComplete="on"
                inputRef={register({
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                fullWidth
              />
              <FormHelperText>Type your email</FormHelperText>
              {errors.email && errors.email.type === 'required' && <Alert severity="error">Email is required</Alert>}
              {errors.email && errors.email.type === 'minLength' && (
                <Alert severity="error">Email should be at-least 3 characters.</Alert>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <Alert severity="error">Email should be less than 50 characters.</Alert>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <Alert severity="error">{errors.email.message}</Alert>
              )}
            </FormControl>
            {/* end: Email */}
            {/* begin: Username */}
            <FormControl fullWidth size="small">
              <FormLabel>Username</FormLabel>
              <OutlinedInput
                name="username"
                type="text"
                autoComplete="on"
                inputRef={register({ required: true, minLength: 3, maxLength: 50 })}
                fullWidth
              />
              <FormHelperText>Choose a username</FormHelperText>
              {errors.username && errors.username.type === 'required' && <Alert severity="error">Username is required</Alert>}
              {errors.username && errors.username.type === 'minLength' && (
                <Alert severity="error">Username should be at-least 3 characters.</Alert>
              )}
              {errors.username && errors.username.type === 'maxLength' && (
                <Alert severity="error">Username should be less than 50 characters.</Alert>
              )}
            </FormControl>
            {/* end: Username */}
            {/* begin: Password */}
            <FormControl fullWidth size="small">
              <FormLabel>Password</FormLabel>
              <OutlinedInput
                name="password"
                type="password"
                autoComplete="on"
                inputRef={register({
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                })}
                fullWidth
              />
              <FormHelperText>Choose a password</FormHelperText>
              {errors.password && errors.password.type === 'required' && <Alert severity="error">Password is required</Alert>}
              {errors.password && errors.password.type === 'minLength' && (
                <Alert severity="error">Password should be at-least 3 characters.</Alert>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <Alert severity="error">Password should be less than 50 characters.</Alert>
              )}
            </FormControl>
            {/* end: Password */}

            {/* begin: Terms and Conditions */}
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox name="acceptTerms" inputRef={register({ required: true })} />
                }
                label="I accept the"
              />
              <Button onClick={handleOpen}>Terms & Conditions.</Button>
            </Grid>
            {errors.acceptTerms && errors.acceptTerms.type === 'required' && <Alert severity="error">
              You must accept terms and conditions
            </Alert>}

            <FormControl fullWidth size="small">
              <Button disabled={loading} type="submit" color="primary">
                Sign Up
              </Button>
            </FormControl>

            <Typography variant="body2" align="center">
              Already registered? <Link to="/auth/login">Sign in</Link>
            </Typography>

            {/* end: Terms and Conditions */}
          </Grid>
        </form>
      </Grid>

      {/* ----------------------------
       * terms and conditions dialog
       * --------------------------- */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Terms & Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography paragraph variant="body2">
              Ali Baba and his older brother, Cassim (sometimes spelled Kasim), are the sons of a merchant. After their
              father's death, the greedy Cassim marries a wealthy woman and becomes well-to-do, building on their
              father's business. Ali Baba marries a poor woman and settles into the trade of a woodcutter. One day, Ali
              Baba is at work collecting and cutting firewood in the forest, when he happens to overhear a group of 40
              thieves visiting their stored treasure. Their treasure is in a cave, the mouth of which is sealed by a
              huge rock. It opens on the magic words 'open sesame' and seals itself on the words 'close sesame'. When
              the thieves are gone, Ali Baba enters the cave himself and takes a single bag of gold coins home.
            </Typography>
            <Typography paragraph variant="body2">
              Ali Baba and his wife borrow his sister-in-law's scales to weigh their new wealth. Unbeknownst to them,
              Cassim's wife puts a blob of wax in the scales to find out what Ali Baba is using them for, as she is
              curious to know what kind of grain her impoverished brother-in-law needs to measure. To her shock, she
              finds a gold coin sticking to the scales and tells her husband. Under pressure from his brother, Ali Baba
              is forced to reveal the secret of the cave. Cassim goes to the cave, taking a donkey with him to take as
              much treasure as possible. He enters the cave with the magic words. However, in his greed and excitement
              over the treasure, he forgets the words to get out again and ends up trapped. The thieves find him there
              and kill him. When his brother does not come back, Ali Baba goes to the cave to look for him, and finds
              the body quartered and with each piece displayed just inside the cave's entrance, as a warning to anyone
              else who might try to enter.
            </Typography>
            <Typography paragraph variant="body2">
              Ali Baba brings the body home where he entrusts Morgiana, a clever slave-girl from Cassim's household,
              with the task of making others believe that Cassim has died a natural death. First, Morgiana purchases
              medicines from an apothecary, telling him that Cassim is gravely ill. Then, she finds an old tailor known
              as Baba Mustafa whom she pays, blindfolds, and leads to Cassim's house. There, overnight, the tailor
              stitches the pieces of Cassim's body back together. Ali Baba and his family are able to give Cassim a
              proper burial without anyone suspecting anything.
            </Typography>
            <Typography paragraph variant="body2">
              The thieves, finding the body gone, realize that another person must know their secret, and they set out
              to track him down. One of the thieves goes down to the town and comes across Baba Mustafa, who mentions
              that he has just sewn a dead man's body back together. Realizing the dead man must have been the thieves'
              victim, the thief asks Baba Mustafa to lead the way to the house where the deed was performed. The tailor
              is blindfolded again, and in this state he is able to retrace his steps and find the house. The thief
              marks the door with a symbol so the other thieves can come back that night and kill everyone in the house.
              However, the thief has been seen by Morgiana who, loyal to her master, foils the thief's plan by marking
              all the houses in the neighborhood similarly. When the 40 thieves return that night, they cannot identify
              the correct house, and their leader kills the unsuccessful thief in a furious rage. The next day, another
              thief revisits Baba Mustafa and tries again. Only this time, a chunk is chipped out of the stone step at
              Ali Baba's front door. Again, Morgiana foils the plan by making similar chips in all the other doorsteps,
              and the second thief is killed for his failure as well. At last, the leader of the thieves goes and looks
              himself. This time, he memorizes every detail he can of the exterior of Ali Baba's house.
            </Typography>
            <Typography paragraph variant="body2">
              The leader of the thieves pretends to be an oil merchant in need of Ali Baba's hospitality, bringing with
              him mules loaded with 38 oil jars, one filled with oil, the other 37 hiding the other remaining thieves.
              Once Ali Baba is asleep, the thieves plan to kill him. Again, Morgiana discovers and foils the plan,
              killing the 37 thieves in their oil jars by pouring boiling oil on them. When their leader comes to rouse
              his men, he discovers they are all dead and escapes. The next morning, Morgiana tells Ali Baba about the
              thieves in the jars. They bury them, and Ali Baba shows his gratitude by giving Morgiana her freedom.
            </Typography>
            <Typography paragraph variant="body2">
              To exact revenge, the leader of the thieves establishes himself as a merchant, befriends Ali Baba's son
              (who is now in charge of the late Cassim's business), and is invited to dinner at Ali Baba's house.
              However, the thief is recognized by Morgiana, who performs a sword dance with a dagger for the diners and
              plunges it into the thief's heart, when he is off his guard. Ali Baba is at first angry with Morgiana, but
              when he finds out the thief wanted to kill him, he is extremely grateful and rewards Morgiana by marrying
              her to his son. Ali Baba is then left as the only one knowing the secret of the treasure in the cave and
              how to access it.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
