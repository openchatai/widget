import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { z } from 'zod';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import {
  useConfig,
  useContact,
  usePreludeData,
} from '../../../../headless/react';
import { useLocale } from '../../hooks/useLocale';
import { useWidgetContentHeight } from '../../hooks/useWidgetContentHeight';
import { DEFAULT_STYLES, WIDGET_CONTENT_MIN_HEIGHT_PX } from '../../constants';
import { cn } from '../../components/lib/utils/cn';
import { Input } from '../../components/lib/input';
import { Button } from '../../components/lib/button';
import { PoweredByOpen } from '../../components/PoweredByOpen';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export function WelcomeScreen() {
  const { createUnverifiedContact } = useContact();
  const config = useConfig();
  const locale = useLocale();
  const { data: preludeData } = usePreludeData();
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MIN_HEIGHT_PX,
  });

  const [name, setName] = useState(config.prefillUserData?.name || '');
  const [email, setEmail] = useState(config.prefillUserData?.email || '');

  const extraDataFields = (config.extraDataCollectionFields || []).filter(
    (f) => f !== 'name' && f !== 'email' && !!f,
  );

  const [extraData, setExtraData] = useState<Record<string, string>>({});

  const [handleSubmitState, handleSubmit] = useAsyncFn(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const result = schema.safeParse({ name, email });
      if (result.success) {
        await createUnverifiedContact(
          {
            email: result.data.email,
            non_verified_name: result.data.name,
          },
          // Only pass extra data if there is any
          Object.values(extraData).filter(Boolean).length
            ? extraData
            : undefined,
        );
      }
    },
    [name, email, extraData],
  );

  return (
    <div
      ref={observedElementRef}
      className={cn(
        DEFAULT_STYLES.widgetMinHeight,
        'h-fit bg-primary flex flex-col',
      )}
    >
      <div
        dir="auto"
        className="flex-1 flex flex-col px-4 py-12 text-start space-y-4 relative z-10"
      >
        <div className="flex items-center justify-between w-full mb-2">
          {config.assets?.organizationLogo ? (
            <img
              src={config.assets?.organizationLogo}
              alt="Company Logo"
              className="h-8 w-auto object-contain"
            />
          ) : (
            <h2
              className="font-bold text-xl text-primary-foreground"
              dir="auto"
            >
              {preludeData?.data?.organizationName}
            </h2>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary-foreground" dir="auto">
            {config.textContent?.welcomeScreen?.title ||
              locale.get('welcome-title')}
          </h1>

          <p
            className="text-primary-foreground/90 text-sm max-w-[320px] leading-relaxed"
            dir="auto"
          >
            {config.textContent?.welcomeScreen?.description ||
              locale.get('welcome-description')}
          </p>
        </div>
      </div>

      <div className="p-2 bg-background rounded-t-3xl" dir="auto">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={locale.get('your-name')}
              name="name"
              className="rounded-3xl pl-3"
            />
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={locale.get('your-email')}
              name="email"
              className="rounded-3xl pl-3"
            />
            {extraDataFields.map((field) => (
              <Input
                key={field}
                value={extraData[field]}
                onChange={(e) =>
                  setExtraData((prev) => ({ ...prev, [field]: e.target.value }))
                }
                placeholder={`${field} (${locale.get('optional')})`}
                className="rounded-3xl pl-3"
              />
            ))}
          </div>

          <Button
            disabled={handleSubmitState.loading}
            className="w-full rounded-3xl"
            size="lg"
          >
            {handleSubmitState.loading
              ? locale.get('starting-chat')
              : locale.get('start-chat')}
            <SendHorizontal className="size-4 rtl:-scale-100" />
          </Button>
        </form>
      </div>

      <PoweredByOpen />
    </div>
  );
}
