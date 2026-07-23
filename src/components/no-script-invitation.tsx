import { weddingConfig } from "@/config/wedding.config";

export function NoScriptInvitation() {
  const { identity, event, chapters, contacts } = weddingConfig;
  return (
    <noscript>
      <main className="no-script-invitation">
        <header>
          <p>{chapters.hero.eyebrow}</p>
          <h1>
            {identity.partnerOne} &amp; {identity.partnerTwo}
          </h1>
          <strong>{event.displayDate}</strong>
          <span>{identity.invitationLine}</span>
        </header>
        <section>
          <h2>{chapters.story.title}</h2>
          <p>{chapters.story.introduction}</p>
          {chapters.story.beats.map((beat) => (
            <article key={beat.id}>
              <small>{beat.year}</small>
              <h3>{beat.title}</h3>
              <p>{beat.body}</p>
            </article>
          ))}
        </section>
        <section>
          <h2>{chapters.schedule.title}</h2>
          {chapters.schedule.events.map((item) => (
            <article key={item.id}>
              <time>{item.time}</time>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>{item.location}</small>
            </article>
          ))}
        </section>
        <section>
          <h2>{chapters.venue.name}</h2>
          <address>{chapters.venue.address}</address>
          <p>{chapters.venue.description}</p>
          <a href={chapters.venue.directionsUrl}>
            {chapters.venue.directionsLabel}
          </a>
        </section>
        <section>
          <h2>{chapters.rsvp.title}</h2>
          <p>
            JavaScript is required for the secure RSVP form. Please contact us
            directly instead:
          </p>
          {contacts.map((contact) => (
            <p key={contact.href}>
              <a href={contact.href}>
                {contact.label}: {contact.value}
              </a>
            </p>
          ))}
        </section>
      </main>
    </noscript>
  );
}
