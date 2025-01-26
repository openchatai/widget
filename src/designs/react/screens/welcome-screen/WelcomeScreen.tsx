import React from "react";
import { SendHorizontal } from "lucide-react";
import { z } from "zod";
import useAsyncFn from "react-use/lib/useAsyncFn";
import {
  useConfig,
  useContact,
  usePreludeData,
} from "../../../../headless/react";
import { useLocale } from "../../hooks/useLocale";
import { useWidgetContentHeight } from "../../hooks/useWidgetContentHeight";
import { DEFAULT_STYLES, WIDGET_CONTENT_MIN_HEIGHT_PX } from "../../constants";
import { cn } from "../../components/lib/utils/cn";
import { Input } from "../../components/lib/input";
import { Button } from "../../components/lib/button";

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
        dir="auto"
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
              dir="auto"
            >
              {preludeData?.data?.organizationName}
            </h2>
          )}
        </div>
        <div className="space-y-2" data-test="welcome-content">
          <h1
            className="text-2xl font-bold text-primary-foreground"
            data-test="welcome-title"
            dir="auto"
          >
            {locale.get("welcome-title")}
          </h1>

          <p
            className="text-primary-foreground/90 text-sm max-w-[320px] leading-relaxed"
            data-test="welcome-description"
            dir="auto"
          >
            {locale.get("welcome-description")}
          </p>
        </div>
      </div>

      <div
        className="p-2 bg-background rounded-3xl"
        data-test="welcome-form-container"
        dir="auto"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-2"
          data-test="welcome-form"
        >
          <div className="space-y-2">
            <Input
              required
              autoFocus
              placeholder={locale.get("your-name")}
              name="name"
              className="rounded-3xl pl-3"
              data-test="name-input"
            />
            <Input
              required
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
            dir="auto"
          >
            {handleSubmitState.loading
              ? locale.get("starting-chat")
              : locale.get("start-chat")}
            <SendHorizontal className="size-4 rtl:-scale-100" />
          </Button>
        </form>
      </div>
    </div>
  );
}
