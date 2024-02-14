import {Component} from 'react'
import './index.css'

class LoginRoute extends Component {
    state={username: '',
        password: '',
        showUserError: false,
        showPasswordError: false,
        showSubmitError: false,
        errorMessage: '',
    }

    onSubmitSuccess=(jwtToken)=>{
        const {history}=this.props
        history.replace("/")
    }

    onSubmitFailure=(error)=>{
        this.setState({showSubmitError: true, errorMessage: error})
    }


    validateUsername=()=>{
        const {username}=this.state 
        return username!==""
    }

    validatePassword=()=>{
        const {password}=this.state 
        return password!==""
    }

    onBlurUsername=()=>{
        const result=this.validateUsername()
        this.setState({showUserError: !result})

    }

    onBlurPassword=()=>{
        const result=this.validatePassword()
        this.setState({showPasswordError: !result})

    }

    onChangeUsername=(event)=>{
        this.setState({username: event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({password: event.target.value})
    }

    onSubmitForm = async (event)=>{
        event.preventDefault();
        const { username, password } = this.state;
        const userDetails = { username, password };
        const Body = JSON.stringify(userDetails);
        const url = 'http://localhost:4000/login';
        const options = {
            method: 'POST',
            body: Body,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response= await fetch(url, options)
        const data= await response.json()
        if(response.ok===true) {
            this.onSubmitSuccess(data.jwtToken)
        }
        else {
            this.onSubmitFailure(data.error_msg)
        }


    }

    render() {
        const {username, password, showUserError, showPasswordError, showSubmitError, errorMessage}=this.state 
      
        return (
            <div className='app-container'>
                <form className='form-container' onSubmit={this.onSubmitForm}>
                    <div className='input-container'>
                        <label className='label-El' htmlFor='username'>Username</label>
                        <input type="text" required className='input-El' id='username' onChange={this.onChangeUsername} onBlur={this.onBlurUsername} value={username}/>
                        {showUserError && <p className='error-msg'>*Required</p>}
                    </div>
                    <div className='input-container'>
                        <label className='label-El' htmlFor='password'>Password</label>
                        <input type="password" required className='input-El' id='password' onChange={this.onChangePassword} onBlur={this.onBlurPassword} value={password}/>
                        {showPasswordError && <p className='error-msg'>*Required</p>}
                    </div>
                    <button className='login-btn' type='submit'>Login</button>
                    {showSubmitError && <p className='error-msg'>*{errorMessage}</p>}
                </form>
            </div>
        )
    }
}

export default LoginRoute

