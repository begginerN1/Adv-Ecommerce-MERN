import {useSelector} from 'react-redux'

const ShowOnLogin = ({children}) => {
    const { isloggedIn } = useSelector(state => state.auth);

    if (isloggedIn) {
        return children
    }
    return null
}


export const ShowOnLogout = ({children}) => {
    const { isloggedIn } = useSelector(state => state.auth);

    if (!isloggedIn) {
        return children
    }
    return null
}

export default ShowOnLogin