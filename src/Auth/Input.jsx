import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({name,handleChange,label,autoFocus,type,handleShowpassword}) => {
    return (
        <>
            <div >
                <TextField
                    name={name}
                    onChange={handleChange}
                    variant='outlined'
                    required
                    fullWidth
                    label={label}
                    autoFocus={autoFocus}
                    type={type}
                    InputProps={name==="password" ? {
                        endAdornment:(
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowpassword}>
                                    {type==="password" ?<VisibilityIcon/>: <VisibilityOffIcon/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }:null
                }
                />
            </div>
        </>
    )
}

export default Input