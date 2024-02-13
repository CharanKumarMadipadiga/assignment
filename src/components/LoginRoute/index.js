import {Component} from 'react'
import './index.css'

class LoginRoute extends Component {
    state={username: '',
        password: '',
        showUserError: false,
        showPasswordError: false
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

    onSubmitForm=(event)=>{
        event.preventDefault();

    }

    render() {
        const {username, password, showUserError, showPasswordError}=this.state 
      
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
                </form>
            </div>
        )
    }
}

export default LoginRoute

