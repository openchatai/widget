import React from 'react';
import {
  useConfigData,
  useContact,
  useLocale,
  usePreludeData
} from '@react/index';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { SendHorizontal } from 'lucide-react';
import { z } from 'zod';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import { useWidgetContentHeight } from '@react/hooks';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email()
});

export function WelcomeScreen() {
  const locale = useLocale();
  const { data: preludeData } = usePreludeData();
  const { createContactAsync } = useContact();
  const { assets } = useConfigData();
  const { observedElementRef } = useWidgetContentHeight();
  const [handleSubmitState, handleSubmit] = useAsyncFn(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const result = schema.safeParse(data);
      if (result.success) {
        await createContactAsync(result.data);
      }
    }
  );

  return (
    <div ref={observedElementRef} className="h-fit min-h-[400px] bg-primary rounded-3xl flex flex-col">
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '240px'
        }}
      /> */}

      <div className="flex-1 flex flex-col px-4 py-8 text-start space-y-4 relative z-10">
        <div className="flex items-center justify-between w-full mb-2">
          {assets?.organizationLogo ? (
            <img
              src={assets?.organizationLogo}
              alt="Company Logo"
              className="h-8 w-auto object-contain"
            />
          ) : (
            <h2 className="font-bold text-xl text-primary-foreground">
              {preludeData?.organization_name}
            </h2>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary-foreground">
            {locale.get('welcome-title')}
          </h1>

          <p className="text-primary-foreground/90 text-sm max-w-[320px] leading-relaxed">
            {locale.get('welcome-description')}
          </p>
        </div>
      </div>

      <div className="p-2 bg-background rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <Input
              required
              dir="auto"
              autoFocus
              placeholder={locale.get('your-name')}
              name="name"
              className="rounded-3xl pl-3"
            />
            <Input
              required
              dir="auto"
              type="email"
              placeholder={locale.get('your-email')}
              name="email"
              className="rounded-3xl pl-3"
            />
          </div>

          <Button
            disabled={handleSubmitState.loading}
            className="w-full rounded-3xl"
          >
            {handleSubmitState.loading
              ? locale.get('starting-chat')
              : locale.get('start-chat')}
            <SendHorizontal className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
