import { ReactNode } from 'react';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';

interface LayoutProps {
    children: ReactNode;
}

const Authenticated = ({ children }: LayoutProps) => {
    return (

        <main className="bg-slate-200">
            <div className='flex md:flex-row flex-col'>
                {/* <div>
                        <SideBar />
                    </div> */}
                <div className='min-h-screen flex flex-1 flex-col'>
                    <Header />
                    <div className='flex-grow container mx-auto md:px-0 md:py-4 py-2 px-2'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    );
}

export default Authenticated;
