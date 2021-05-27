import { Grid, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form'

export const ChangePassword = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (formData: any, e:any) => {
        e.preventDefault();
        formData= {
          ...formData,
        }
      }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction='column' justify='center'>
                <TextField
                    label="Current Password"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    type="currentPassword"
                    inputRef={register()}
                    name="password"
                />

                {/* @todo: disable popup autofill password / trigger the new password suggestion  */}
                <TextField
                    label="New Password"
                    margin='normal'
                    variant = 'outlined'
                    autoComplete='off'
                    type="password"
                    name="password"
                    inputRef={register()}
                />

                {/* @todo: disable popup autofill password / trigger the new password suggestion  */}
                <TextField
                    label="Confirm Password"
                    margin='normal'
                    variant = 'outlined'
                    autoComplete='off'
                    type="password"
                    name="changepassword"
                    inputRef={register()}
                />
            </Grid>
        </form>
    )
}
