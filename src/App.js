import {BrowserRouter, Switch, Route} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'

import Home from './components/Home'

import './App.css'

const App=()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={LoginRoute}/>
            <Route exact path="/" component={Home}/>
        </Switch>
    </BrowserRouter>
)

export default App
