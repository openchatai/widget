import { Dialog, DialogContent, DialogTrigger } from '@lib/components/dialog';
import { m } from 'framer-motion';
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { useState } from "react"
import { useLocation } from "wouter";

function ChatFooter() {
    const [input, setInput] = useState("");

    return <footer className="p-2">
        <div className="overflow-hidden rounded-3xl border focus-within:outline transition focus-within:border-blue-500 outline-blue-500">
            <div className="relative flex">
                <textarea
                    value={input}
                    onChange={(ev) => {
                        setInput(ev.target.value)
                    }}
                    autoFocus
                    tabIndex={0}
                    rows={1}
                    dir="auto"
                    placeholder="chat with us....."
                    className="resize-none h-11 min-h-12 p-0 thin-scrollbar w-full overflow-y-auto overflow-x-hidden border-none text-sm leading-6 !outline-none !ring-0 placeholder-shown:truncate py-3 pl-4 pr-10"
                />
                <div className="absolute right-2 top-3 flex items-center rtl:left-2">
                    <button className="rounded-full p-1.5 text-gray-300 enabled:cursor-pointer bg-gray-100 transition enabled:hover:opacity-90 enabled:active:opacity-80 enabled:text-white enabled:bg-blue-500">
                        <SendHorizonal className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    </footer>
}


export function ChatScreen() {
    const [location, navigate] = useLocation()
    return (
        <m.div
            initial={{
                x: 10,
                opacity: 0
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            exit={{
                x: 10,
                opacity: 0
            }}
            className="flex flex-col justify-between gap-1 h-full">
            <header className="flex p-2 items-center border-b from-white to-gray-50/5 bg-gradient-to-b">
                <div className="p-1">
                    <button
                        data-location={location}
                        onClick={() => {
                            navigate("/")
                        }} className="rounded-lg size-10 flex items-center justify-center p-2 transition hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 text-gray-500">
                        <ArrowLeft className="size-4" />
                    </button>
                </div>
                <div className="flex-1 p-1 flex items-center gap-2 rounded-xl hover:bg-gray-50">
                    <div className="shrink-0 overflow-hidden border bg-white text-blue-500 rounded-xl size-10">
                    </div>
                    <h2 className="flex-1 text-base font-semibold leading-6 text-gray-900">
                        Bird
                    </h2>
                </div>
            </header>
            <main className="flex-1 overflow-auto">
                <Dialog isAlert>
                    <DialogContent>
                        <h2 className='font-semibold text-lg'>
                            Jarvis
                        </h2>
                        <p>this will delete the item from your account</p>
                        <footer className='flex items-center justify-end gap-2'>
                            <button className='px-2 text-base font-medium bg-rose-500 border-transparent py-1 border text-white rounded-lg'>
                                Yes
                            </button>
                            <button className='px-2 text-base font-medium py-1 border bg-gray-100 rounded-lg'>
                                No
                            </button>
                        </footer>
                    </DialogContent>
                    <DialogTrigger>
                        Trigger
                    </DialogTrigger>
                </Dialog>
            </main>
            <ChatFooter />
        </m.div>
    )
}
