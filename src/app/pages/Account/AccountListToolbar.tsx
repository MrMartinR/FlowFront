import { Autocomplete } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { TextField } from '@material-ui/core'
export const AccountListToolbar = (props:any) => {
    const { list, setSelectedItemIndex } = props
    const [options, setOptions] = useState([] as any)
    // lista para o autocomplete do buscador
    useEffect(() => {
        if (list.length >= 1) {
        let opt = [] as any
        list.map((option: any) => {
            opt.push(option.attributes.contact.trade_name)
            return opt
        })
        setOptions(opt)
        }
    }, [list])
    // función que se chama o elexir unha opción do buscador
    const handlePick = (e: any, v: any) => {
    let selected = list.findIndex((itm: any) => itm.attributes.contact.trade_name === v)
    setSelectedItemIndex(selected)
  }
    return (
        <Autocomplete
            freeSolo
            options={options}
            onChange={handlePick}
            renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
      />
    )
}
