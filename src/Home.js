import { Loginform } from './Loginform';

export function Home() {
    return (
        <div>
            <h1>Welcome to Mobiles App😍😎</h1>
            <Loginform />
            <div className='userinfo'>
                <h5>Admin: guvi, Password: guvi@123</h5>
                <h5>user: guest, Password: guest@123</h5>
            </div>
        </div>
    );
}


