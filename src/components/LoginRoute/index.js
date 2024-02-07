import {Component} from 'react'
import './index.css'

class LoginRoute extends Component {
    state={username: '',
        password: ''
    }

    onChangeUsername=(event)=>{
        this.setState({username: event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({password: event.target.value})
    }

    onSubmitForm=(event)=>{
        event.preventDefault()
    }

    render() {
        const {username, password}=this.state 
        console.log(username)
        console.log(password)
        return (
            <div className='app-container'>
                <form className='form-container' onSubmit={this.onSubmitForm}>
                    <div className='input-container'>
                        <label className='label-El' htmlFor='username'>Username</label>
                        <input type="text" className='input-El' id='username' onChange={this.onChangeUsername}/>
                    </div>
                    <div className='input-container'>
                        <label className='label-El' htmlFor='password'>Password</label>
                        <input type="password" className='input-El' id='password' onChange={this.onChangePassword}/>
                    </div>
                    <button className='login-btn' type='submit'>login</button>
                </form>
            </div>
        )
    }
}

export default LoginRoute

