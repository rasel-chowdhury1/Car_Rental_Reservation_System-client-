import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { logout, useCurrentUser } from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';


type TPrivateRoute = {
    children: ReactNode,
    role:  string | undefined
}
const PrivateRoute = ( { children, role }: TPrivateRoute) => {
    const user = useAppSelector(useCurrentUser)
    

    const dispatch = useAppDispatch();


    if(role !== undefined && role !== user?.role){
        dispatch(logout())
        return <Navigate to="/login" replace={true}/>
    }

    if(!user){
        return <Navigate to="/login" replace={true}/>
    }
    return children;
};

export default PrivateRoute;