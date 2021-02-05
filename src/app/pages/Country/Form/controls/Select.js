import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'

export default function Select(props) {
  const { name, label, error = null} = props

  const options = [
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
  ]

  const { control } = useForm()

  return (
    <FormControl>
      <InputLabel>currency_id</InputLabel>
        <Controller
            as={
              <Select>
                <MenuItem value="">None</MenuItem>
                {options.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    value={item.id}
              >
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            }
            name="currency_id"
            rules={{ required: "this is required" }}
            control={control}
            defaultValue=""
          />
      </FormControl> 
  )
}
