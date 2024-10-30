import { BotResponseWrapper } from "@lib/@components";
import { useAsyncFn, useConfigData } from "@lib/index";
import { useContact } from "@lib/providers/ContactProvider";
import { Input } from "@ui/input";
import { Loader } from "lucide-react";
import React from "react";
import { z } from "zod";

interface CollectDataFormProps {
    defaultValues?: {
        name: string;
        email: string;
    }
}

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
});

export function CollectDataForm(props: CollectDataFormProps) {
    const config = useConfigData();
    const contact = useContact()
    const [_state, handleSubmit] = useAsyncFn(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values = new FormData(event.currentTarget);
        const data = schema.safeParse(Object.fromEntries(values.entries()));
        if (!data.success) {
            return;
        }
        await contact.createContactAsync(data.data);
    }, [contact.createContactAsync]);

    return (
        <BotResponseWrapper bot={config.bot} className="w-full">
            <p className="text-xs mb-3 text-gray-600">
                Please provide your name and email so we can help you better.
            </p>
            <form onSubmit={handleSubmit} className="grid gap-2 grid-cols-1">
                <div className="space-y-1">
                    <label className="required font-medium text-xs text-gray-600" htmlFor="collect-data:form:name">Name</label>
                    <Input required className="peer" defaultValue={props.defaultValues?.name} id="collect-data:form:name" name="name" />
                </div>
                <div className="space-y-1">
                    <label className="required font-medium text-xs text-gray-600" htmlFor="collect-data:form:email">Email</label>
                    <Input required defaultValue={props.defaultValues?.email} id="collect-data:form:email" name="email" />
                </div>
                <button
                    data-loading={_state.loading}
                    data-error={!!_state.error}
                    disabled={_state.loading}
                    type="submit"
                    className="text-sm group text-center relative hover:brightness-110 disabled:grayscale active:brightness-110 transition-all font-medium rounded-lg bg-primary text-white px-3 py-1.5 flex items-center justify-center"
                >
                    <span className="group-data-[loading='true']:opacity-0">Send</span>
                    {_state.loading && <div className="absolute inset-0 flex items-center justify-center">
                        <Loader className="size-5 animate-spin" />
                    </div>}
                </button>
            </form>
        </BotResponseWrapper>
    )
}
