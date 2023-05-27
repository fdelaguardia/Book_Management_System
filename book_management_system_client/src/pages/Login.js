import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { LOGIN } from '../gql-api/userTypeDef'

const Login = () => {

    const [Login, { client, loading, error }] = useMutation(LOGIN);
    const navigate = useNavigate();


    return (
        <div>Login</div>
    )
}

export default Login