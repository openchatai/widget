import { BotResponseWrapper } from "@lib/@components";
import { useAsyncFn } from "react-use";
import { useContact } from "@lib/providers/ContactProvider";
import { Input } from "@ui/input";
import { Loader } from "lucide-react";
import { z } from "zod";
import { useConfigData } from "@lib/index";


const schema = z.object({
    name: z.string(),
    email: z.string().email(),
});

export function CollectDataForm() {
    const config = useConfigData();
    const { contact, createContactAsync, shouldCollectData } = useContact();

    const [_state, handleSubmit] = useAsyncFn(async (data: z.infer<typeof schema>) => {
        return createContactAsync(data)
    }, [createContactAsync, contact]);

    return (
        <BotResponseWrapper bot={config.bot} className="w-full">
            <p className="text-xs mb-3 text-gray-600">
                Please provide your name and email so we can help you better.
            </p>
            <form onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const data = Object.fromEntries(formData.entries());
                const result = schema.safeParse(data);
                if (result.success) {
                    await handleSubmit(result.data);
                }
            }} className="grid gap-2 grid-cols-1">
                <div className="space-y-1">
                    <label className="required font-medium text-xs text-gray-600" htmlFor="collect-data:form:name">Name</label>
                    <Input
                        disabled={!shouldCollectData.should}
                        required className="peer"
                        defaultValue={contact?.name ?? ""}
                        id="collect-data:form:name"
                        name="name" />
                </div>
                <div className="space-y-1">
                    <label className="required font-medium text-xs text-gray-600" htmlFor="collect-data:form:email">Email</label>
                    <Input
                        disabled={!shouldCollectData.should}
                        defaultValue={contact?.email ?? ""}
                        required
                        id="collect-data:form:email"
                        name="email" />
                </div>
                <button
                    data-loading={_state.loading}
                    data-error={!!_state.error}
                    disabled={_state.loading || !shouldCollectData.should}
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
