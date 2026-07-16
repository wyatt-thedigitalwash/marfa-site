import Image from "next/image";

export default function HeroStack() {
  return (
    <section aria-label="Hero" className="relative">
      {/* Panel 1: The front door */}
      <div
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--color-black)" }}
      >
        <Image
          src="/backgrounds/marfa_image3.jpg"
          alt="Marfa band"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAANABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCee1uY0zE+8DtWTNLdy7lWMkjrxXToxZDUKxLGWZep61NwSOLeG6LHMTZ+lFdW7fMeBRT5gsf/2Q=="
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(33, 31, 33, 0.5)" }}
        />
        <h1 className="relative z-10 w-[80vw] max-w-[1100px]">
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
