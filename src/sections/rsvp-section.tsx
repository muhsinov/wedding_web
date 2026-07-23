"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, Minus, Plus, Send } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { weddingConfig } from "@/config/wedding.config";
import { submitRsvp } from "@/features/rsvp/actions";
import { initialRsvpState, type RsvpActionState } from "@/features/rsvp/state";

function FieldError({
  state,
  name,
}: {
  state: RsvpActionState;
  name: keyof NonNullable<RsvpActionState["fieldErrors"]>;
}) {
  const message = state.fieldErrors?.[name]?.[0];
  return message ? (
    <p className="field-error" id={`${name}-error`}>
      {message}
    </p>
  ) : null;
}

function SuccessRitual({
  guestName,
  onClose,
}: {
  guestName?: string;
  onClose: () => void;
}) {
  const copy = weddingConfig.chapters.rsvp.success;
  const firstName = guestName?.split(" ")[0];
  return (
    <m.div
      className="success-ritual"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="success-ritual__glow" aria-hidden="true" />
      <m.div
        className="success-letter"
        initial={{ y: 160, rotate: -4, scale: 0.85 }}
        animate={{ y: 0, rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 }}
        aria-hidden="true"
      >
        <m.div
          className="success-letter__paper"
          animate={{ y: [0, -24, 44], scale: [1, 0.96, 0.78] }}
          transition={{
            duration: 1.8,
            delay: 0.85,
            times: [0, 0.45, 1],
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          <span>{weddingConfig.identity.monogram}</span>
          <i />
          <small>{firstName ? `With love, ${firstName}` : "With love"}</small>
        </m.div>
        <m.div
          className="success-letter__envelope"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.65 }}
        >
          <span />
          <m.i
            initial={{ scale: 0, rotate: -35 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 13,
              delay: 2.05,
            }}
          >
            {weddingConfig.identity.monogram.replace(" · ", "")}
          </m.i>
        </m.div>
      </m.div>
      <m.div
        className="success-ritual__copy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.15, duration: 0.8 }}
      >
        <p className="eyebrow">
          <span aria-hidden="true" />
          {copy.eyebrow}
        </p>
        <h3 id="success-title">
          {firstName ? `${firstName}, ${copy.title.toLowerCase()}` : copy.title}
        </h3>
        <p>{copy.body}</p>
        <button type="button" onClick={onClose}>
          {copy.close}
          <Check aria-hidden="true" />
        </button>
      </m.div>
    </m.div>
  );
}

export function RsvpSection() {
  const [state, formAction, pending] = useActionState(
    submitRsvp,
    initialRsvpState,
  );
  const [attendance, setAttendance] = useState<"attending" | "declining">(
    "attending",
  );
  const [guestCount, setGuestCount] = useState(1);
  const [dismissed, setDismissed] = useState(false);
  const copy = weddingConfig.chapters.rsvp;

  useEffect(() => {
    if (state.status === "success") setDismissed(false);
  }, [state.status]);

  const chooseAttendance = (value: "attending" | "declining") => {
    setAttendance(value);
    setGuestCount(value === "attending" ? Math.max(1, guestCount) : 0);
  };

  return (
    <section id="rsvp" className="rsvp" aria-labelledby="rsvp-title">
      <div
        className="rsvp__botanical rsvp__botanical--left"
        aria-hidden="true"
      />
      <div
        className="rsvp__botanical rsvp__botanical--right"
        aria-hidden="true"
      />
      <div className="page-shell rsvp__layout">
        <header className="rsvp__introduction">
          <p className="eyebrow">
            <span aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 id="rsvp-title">{copy.title}</h2>
          <p>{copy.introduction}</p>
          <small>{copy.deadline}</small>
          <div className="rsvp__monogram" aria-hidden="true">
            {weddingConfig.identity.monogram}
          </div>
        </header>
        <form
          className={pending ? "rsvp-form rsvp-form--pending" : "rsvp-form"}
          action={formAction}
          noValidate
        >
          <div className="form-field form-field--wide">
            <label htmlFor="guestName">{copy.labels.name}</label>
            <input
              id="guestName"
              name="guestName"
              type="text"
              autoComplete="name"
              placeholder={copy.placeholders.name}
              aria-invalid={Boolean(state.fieldErrors?.guestName)}
              aria-describedby={
                state.fieldErrors?.guestName ? "guestName-error" : undefined
              }
            />
            <FieldError state={state} name="guestName" />
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="phone">{copy.labels.phone}</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={copy.placeholders.phone}
              aria-invalid={Boolean(state.fieldErrors?.phone)}
              aria-describedby={
                state.fieldErrors?.phone ? "phone-error" : undefined
              }
            />
            <FieldError state={state} name="phone" />
          </div>
          <fieldset className="attendance-choice">
            <legend>{copy.labels.attending}</legend>
            <div>
              <label
                className={
                  attendance === "attending"
                    ? "attendance-option attendance-option--active"
                    : "attendance-option"
                }
              >
                <input
                  type="radio"
                  name="attendanceStatus"
                  value="attending"
                  checked={attendance === "attending"}
                  onChange={() => chooseAttendance("attending")}
                />
                <span>
                  <i aria-hidden="true" />
                  {copy.labels.yes}
                </span>
              </label>
              <label
                className={
                  attendance === "declining"
                    ? "attendance-option attendance-option--active"
                    : "attendance-option"
                }
              >
                <input
                  type="radio"
                  name="attendanceStatus"
                  value="declining"
                  checked={attendance === "declining"}
                  onChange={() => chooseAttendance("declining")}
                />
                <span>
                  <i aria-hidden="true" />
                  {copy.labels.no}
                </span>
              </label>
            </div>
            <FieldError state={state} name="attendanceStatus" />
          </fieldset>
          <div className="guest-count">
            <div>
              <label htmlFor="guestCount">{copy.labels.guests}</label>
              <small>Including yourself</small>
            </div>
            <div className="guest-count__control">
              <button
                type="button"
                onClick={() =>
                  setGuestCount(
                    Math.max(
                      attendance === "attending" ? 1 : 0,
                      guestCount - 1,
                    ),
                  )
                }
                disabled={attendance === "declining" || guestCount <= 1}
                aria-label="Remove one guest"
              >
                <Minus aria-hidden="true" />
              </button>
              <output htmlFor="guestCount">{guestCount}</output>
              <input
                id="guestCount"
                name="guestCount"
                type="hidden"
                value={guestCount}
              />
              <button
                type="button"
                onClick={() =>
                  setGuestCount(Math.min(copy.maxGuests, guestCount + 1))
                }
                disabled={
                  attendance === "declining" || guestCount >= copy.maxGuests
                }
                aria-label="Add one guest"
              >
                <Plus aria-hidden="true" />
              </button>
            </div>
            <FieldError state={state} name="guestCount" />
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="message">
              {copy.labels.message}
              <span>Optional</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={copy.placeholders.message}
              aria-invalid={Boolean(state.fieldErrors?.message)}
              aria-describedby={
                state.fieldErrors?.message ? "message-error" : undefined
              }
            />
            <FieldError state={state} name="message" />
          </div>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {state.message && state.status !== "success" ? (
            <p
              className={`form-status form-status--${state.status}`}
              role="alert"
            >
              {state.message}
            </p>
          ) : null}
          <button className="rsvp-submit" type="submit" disabled={pending}>
            <span>{pending ? copy.pendingLabel : copy.submitLabel}</span>
            <Send aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
          <p className="rsvp-form__privacy">
            Your details are used only to coordinate this celebration.
          </p>
          <AnimatePresence>
            {pending ? (
              <m.div
                className="reply-in-flight"
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span>Folding your reply with care…</span>
                <i aria-hidden="true" />
              </m.div>
            ) : null}
          </AnimatePresence>
        </form>
      </div>
      <AnimatePresence>
        {state.status === "success" && !dismissed ? (
          <SuccessRitual
            guestName={state.guestName}
            onClose={() => setDismissed(true)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
