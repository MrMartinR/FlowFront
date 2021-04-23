import { Redirect, Route } from 'react-router-dom'
export const PrivateRoute = ({ 
    isAuth,
    component: Component,
    ...rest }:any) => {
    
    return (
        <Route
            {...rest}
            component = {(props:any) =>(
                (isAuth)
                ?(<Component {...props}/>)
                :(<Redirect to='/auth/login' />)
            )}
        />
    )
}