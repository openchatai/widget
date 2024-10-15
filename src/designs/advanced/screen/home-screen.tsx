import { useConsumer, useLocale } from '@lib/providers';
import { m } from 'framer-motion';
import { Bot, Send } from 'lucide-react'
import { Link } from 'wouter';

function Header() {
    const { consumer } = useConsumer();
    const locale = useLocale()
    return <header className='p-2 rounded-xl flex gap-4 items-start border'>
        <div className='flex items-center justify-between'>
            <div className='size-12 flex items-center justify-center rounded-xl border bg-white text-blue-500 overflow-hidden p-0'>
                <Bot className='size-6' />
            </div>
        </div>
        <div className='leading-tight'>
            <h2 className='text-lg font-bold leading-tight text-gray-900'>
                Welcome {consumer?.name}!
            </h2>
            <p className='text-xs text-gray-700 leading-tight'>
                {locale.get("typical-response-time")}
            </p>
        </div>
    </header>
}

// @TODO: make the home screen smaller.
export function HomeScreen() {
    const { conversationsSWR, consumer } = useConsumer();
    const locale = useLocale()

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
            className='flex flex-col w-full h-full justify-between gap-2 p-2'>
            <Header />
            <main className='flex-1'>

            </main>
            <footer className='p-2'>
                {
                    conversationsSWR.data?.map((conv) => {
                        return <Link
                            className=""
                            data-id={conv.id}
                            to={`/chat?=${conv.id}`}
                            key={conv.id}>
                            {conv.id}
                        </Link>
                    })
                }
                <Link
                    to='/chat'
                    className="group flex w-full items-center gap-2 shadow rounded-xl py-2 px-3 text-sm transition-colors rtl:space-x-reverse bg-blue-500 text-white hover:brightness-110 pl-6 pr-4">
                    <div className="flex items-center h-6 text-left">
                        {locale.get("start-conversation")}
                    </div>
                    <div className="flex ml-auto items-center justify-center rtl:mr-auto rtl:ml-0 size-8">
                        <Send className='size-4' />
                    </div>
                </Link>
            </footer>
        </m.div>
    )
}
