import Image from "next/image";

export default function HeroStack() {
  return (
    <section aria-label="Hero" className="relative">
      {/* Panel 1: The front door */}
      <div
        className="relative h-screen w-full flex items-start justify-center overflow-hidden pt-[10vh] md:items-end md:pt-0 md:pb-[10vh]"
        style={{ backgroundColor: "var(--color-black)" }}
      >
        <Image
          src="/backgrounds/Marfa_WebsiteHero.jpg"
          alt="Marfa band members seated on stools under a spotlight against a red backdrop"
          fill
          sizes="100vw"
          className="object-cover md:object-[50%_75%]"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQABLAEsAAD/4QDcRXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAIKYAAIAAAAUAAAAZodpAAQAAAABAAAAegAAAAAAAAEsAAAAAQAAASwAAAABQUxMIFJJR0hUUyBSRVNFUlZFRAAAB5AAAAcAAAAEMDIyMZEBAAcAAAAEAQIDAKAAAAcAAAAEMDEwMKABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAADaQGAAMAAAABAAAAAAAAAAD/7QBgUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAACccAVoAAxslRxwCAAACAAIcAnQAE0FMTCBSSUdIVFMgUkVTRVJWRUQAOEJJTQQlAAAAAAAQivQc9nqzqL7PDZEFPlWda//AABEIAA0AFAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAkJCQkJCRAJCRAWEBAQFh4WFhYWHiYeHh4eHiYuJiYmJiYmLi4uLi4uLi43Nzc3NzdAQEBAQEhISEhISEhISEj/2wBDAQsMDBIREh8RER9LMyozS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0v/3QAEAAL/2gAMAwEAAhEDEQA/APL7G1a4kWKMZZulaWoaVLZRK8pVg3ZTypPIBrPsLiS3kWaI4ZTkGtK6v3ng8kqqjOTjPJAxXDJ6n1FOLcVy7dTmGX5qbtqWT75plbpnlyirs//Z"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(33, 31, 33, 0.35)" }}
        />
        <h1 className="relative z-10 w-[60vw] max-w-[825px] md:w-[48vw] md:max-w-[660px]">
          <Image
            src="/branding/Marfa_LogoWhite.png"
            alt="Marfa"
            width={1920}
            height={1090}
            priority
            unoptimized
            className="w-full h-auto"
          />
          <span className="sr-only">Marfa</span>
        </h1>
      </div>
    </section>
  );
}
