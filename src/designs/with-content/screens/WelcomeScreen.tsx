import { useChat, useConfigData, useLocale, usePreludeData } from '@lib/index'
import { Button } from '@ui/button';
import { motion } from 'framer-motion'
import { ChevronRight, MessageCircleIcon, SearchCheck } from 'lucide-react';
import { Link } from 'wouter';

function WelcomeScreenFooter() {
    const { session } = useChat()
    if (session) {
        return (
            <Button asChild className='w-full'>
                <Link to='/chat'>
                    Continue to chat <ChevronRight className='size-4' />
                </Link>
            </Button>
        )
    }
    else {
        return <Button asChild className='w-full'>
            <Link to='/chat'>
                Start a chat <MessageCircleIcon />
            </Link>
        </Button>

    }
}

function WelcomeScreen() {
    const locale = useLocale();
    const { data: preludeData } = usePreludeData();
    const { assets } = useConfigData();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col relative isolate gap-5 h-full bg-background overflow-hidden rounded-xl"
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '240px'
                }}
            />

            <div className="flex-1 px-4 pt-12 flex flex-col overflow-hidden justify-start space-y-2 text-left relative z-10">
                <div className="flex items-center justify-between w-full">
                    {
                        assets?.organizationLogo ? <img
                            src={assets?.organizationLogo}
                            alt="Company Logo"
                            className="h-8 w-auto object-contain"
                        /> : <h2 className="font-bold text-xl text-white">
                            {preludeData?.organization_name}
                        </h2>
                    }
                </div>
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-white">
                        {locale.get("welcome-title")}
                    </h1>

                    <p className="text-white/90 text-sm max-w-[320px] leading-relaxed">
                        {locale.get("welcome-description")}
                    </p>
                </div>
            </div>

            <footer className='flex-1 p-4 space-y-4 flex flex-col items-center justify-end w-full'>
                <Button asChild variant={"secondary"} className='rounded-xl w-full flex items-center justify-between'>
                    <Link to='/help-center'>
                        <span>
                            search for help
                        </span>
                        <SearchCheck className='size-4' />
                    </Link>
                </Button>
                <WelcomeScreenFooter />
            </footer>
        </motion.div>
    )
}

export { WelcomeScreen }