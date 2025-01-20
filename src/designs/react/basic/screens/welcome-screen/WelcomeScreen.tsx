import React from "react";
import { Input } from "src/designs/react/components/lib/input";
import { Button } from "src/designs/react/components/lib/button";
import { SendHorizontal } from "lucide-react";
import { z } from "zod";
import useAsyncFn from "react-use/lib/useAsyncFn";
import {
  DEFAULT_STYLES,
  WIDGET_CONTENT_MIN_HEIGHT_PX,
} from "src/designs/react/constants";
import { cn } from "src/designs/react/components/lib/utils/cn";
import { useConfig, useContact, usePreludeData } from "src/headless/react";
import { useWidgetContentHeight } from "src/designs/react/hooks/useWidgetContentHeight";
import { useLocale } from "src/designs/react/hooks/useLocale";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export function WelcomeScreen() {
  const { contactCtx } = useContact();
  const config = useConfig();
  const locale = useLocale();
  const { data: preludeData } = usePreludeData();
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MIN_HEIGHT_PX,
  });

  const [handleSubmitState, handleSubmit] = useAsyncFn(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const result = schema.safeParse(data);
      if (result.success) {
        await contactCtx.createUnverifiedContact({
          email: result.data.email,
          name: result.data.name,
        });
      }
    },
  );

  return (
    <div
      ref={observedElementRef}
      data-test="welcome-screen"
      className={cn(
        DEFAULT_STYLES.widgetMinHeight,
        "h-fit bg-primary rounded-3xl flex flex-col",
      )}
    >
      <div
        className="flex-1 flex flex-col px-4 py-12 text-start space-y-4 relative z-10"
        data-test="welcome-header"
      >
        <div
          className="flex items-center justify-between w-full mb-2"
          data-test="welcome-logo-container"
        >
          {config.assets?.organizationLogo ? (
            <img
              src={config.assets?.organizationLogo}
              alt="Company Logo"
              className="h-8 w-auto object-contain"
              data-test="organization-logo"
            />
          ) : (
            <h2
              className="font-bold text-xl text-primary-foreground"
              data-test="organization-name"
            >
              {preludeData?.data?.organizationName}
            </h2>
          )}
        </div>
        <div className="space-y-2" data-test="welcome-content">
          <h1
            className="text-2xl font-bold text-primary-foreground"
            data-test="welcome-title"
          >
            {locale.get("welcome-title")}
          </h1>

          <p
            className="text-primary-foreground/90 text-sm max-w-[320px] leading-relaxed"
            data-test="welcome-description"
          >
            {locale.get("welcome-description")}
          </p>
        </div>
      </div>

      <div
        className="p-2 bg-background rounded-3xl"
        data-test="welcome-form-container"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-2"
          data-test="welcome-form"
        >
          <div className="space-y-2">
            <Input
              required
              dir="auto"
              autoFocus
              placeholder={locale.get("your-name")}
              name="name"
              className="rounded-3xl pl-3"
              data-test="name-input"
            />
            <Input
              required
              dir="auto"
              type="email"
              placeholder={locale.get("your-email")}
              name="email"
              className="rounded-3xl pl-3"
              data-test="email-input"
            />
          </div>

          <Button
            disabled={handleSubmitState.loading}
            className="w-full rounded-3xl"
            data-test="start-chat-button"
          >
            {handleSubmitState.loading
              ? locale.get("starting-chat")
              : locale.get("start-chat")}
            <SendHorizontal className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
