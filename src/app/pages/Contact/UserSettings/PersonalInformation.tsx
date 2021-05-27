import { Grid, TextField, Typography } from "@material-ui/core"
import { useForm } from 'react-hook-form'
export const PersonalInformation = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (formData: any, e:any) => {
        e.preventDefault();
        formData= {
          ...formData,
        }
      }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction='column' spacing={2} justify='space-around'>
                  {/* name */}
                    <TextField
                      label="Name"
                      margin="normal"
                      variant="outlined"
                      autoComplete="true"
                      type="text"
                      name="name"
                      inputRef={register()}
                    />

                  {/* surname */}
                    <TextField
                      label="Surname"
                      margin="normal"
                      variant="outlined"
                      autoComplete="true"
                      type="text"
                      name="surname"
                      inputRef={register()}
                    />

                  {/* dob */}
                    <TextField
                      margin="normal"
                      variant="outlined"
                      autoComplete="true"
                      type="date"
                      name="dob"
                      inputRef={register()}
                    />
                    <Typography variant='body2'>
                      Date of Birth will not be publicly displayed Will be use to calculate you FI
                    </Typography>
                </Grid>
        </form>
    )
}
