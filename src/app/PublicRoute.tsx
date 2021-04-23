import { Redirect, Route } from 'react-router-dom'
export const PublicRoute = ({
    isAuth,
    component: Component,
    ...rest
}:any) => {
    return (
        <Route
            {...rest}
            component = {(props:any) =>(
                (!isAuth)
                ?(<Component {...props}/>)
                :(<Redirect to='/' />)
            )}
        
        
        />
    )
}