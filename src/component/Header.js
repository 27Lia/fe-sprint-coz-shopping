import './header.css';

export default function Header() {
    return (
        <header className="header-container">
            <div className='logo-container'>
                <div className='logo-img'>
                    <img src="logo.png" alt="logo" />
                </div>  
                <span className="logo-title">Coz Shopping</span>
            </div>
            <img src="hamburger.png" alt="hamburger" />
        </header>
    );
}
