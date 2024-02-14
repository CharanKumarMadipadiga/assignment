import {Link} from 'react-router-dom'

import './index.css'

const Header=()=>(
    <nav className='nav-container'>
        <div className='header-container'>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className='logo'/>

            <ul className='tabs-container'>

                <li className='nav-link' to="/"><Link>Home</Link></li>
                <li className='nav-link' to="/products"><Link>Products</Link></li>
                <li className='nav-link' to="/contact"><Link>Contact</Link></li>
                
            </ul>
            <button className='logout-btn' type="button">logout</button>

        </div>
    </nav>
)

export default Header