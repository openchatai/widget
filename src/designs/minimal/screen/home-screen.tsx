import { m } from 'framer-motion';
import { Bot, Send } from 'lucide-react'
import { Link } from 'wouter';

export function HomeScreen() {
    return (
        <m.div
            initial={{
                x: "-10px",
                opacity: 0
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            exit={{
                x: "-10px",
                opacity: 0
            }}
            className='flex flex-col w-full h-full justify-between gap-2'>
            <header className='p-6 flex gap-4 items-start bg-gradient-to-b from-accent-main-gradient'>
                <div className='flex items-center justify-between'>
                    <div className='size-12 flex items-center justify-center rounded-xl border bg-white text-blue-500 overflow-hidden p-0'>
                        <Bot className='size-6' />
                    </div>
                </div>
                <div className='leading-tight'>
                    <h2 className='text-lg font-bold leading-tight text-gray-900'>
                        Welcome!
                    </h2>
                    <p className='text-sm text-gray-700 leading-tight'>
                        How can we help ?
                    </p>
                </div>
            </header>
            <main className='flex-1'>
            </main>
            <footer className='px-4'>
                <Link
                    to='/chat'
                    className="group flex w-full items-center gap-2 rounded-lg py-2 px-3 text-sm transition-colors rtl:space-x-reverse bg-blue-500 text-white hover:brightness-110 pl-6 pr-4">
                    <div className="flex items-center h-6 text-left">Start conversation</div>
                    <div className="flex ml-auto items-center justify-center rtl:mr-auto rtl:ml-0 size-8">
                        <Send className='size-4' />
                    </div>
                </Link>
            </footer>
            <div className='p-2 text-center'>
                <a href='https://open.cx/?ref=widget_footer' className="text-xs" target='_blank' rel="noreferrer">
                    powered by open
                </a>
            </div>
        </m.div>
    )
}
