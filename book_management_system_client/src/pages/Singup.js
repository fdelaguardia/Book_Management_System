
import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

import { SIGNUP, LOGIN } from "../gql-api/userTypeDef"

const Singup = () => {

  const newUser = useMutation(SIGNUP);
  const login = useMutation(LOGIN)
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const {
      firstName,
      lastName,
      email,
      password
    } = values;

    try {
      let result = await newUser({
        variables: {
          firstName,
          lastName,
          email,
          password
        }
      })
      console.log(result)

      const response = await login({variables: { firstName, lastName, email, password }});
      localStorage.setItem('token', response.data.login.token);

      navigate('/')

    } catch (err) {
      console.log(err)
    }

  }


  return (
    <div>
      Singup

      <form onSubmit={handleSubmit} >
        <label>First Name
          <input type='text' name="firstName" />
        </label>

        <label>Last Name
          <input type='text' name="lastName" />
        </label>

        <label>Email
          <input type='email' name="email" />
        </label>

        <label>Password
          <input type='password' name="password" />
        </label>

        <button type="submit" className="new-item-button" ><h4>Sign Up</h4></button>
      </form>
    </div>
  )
}

export default Singup