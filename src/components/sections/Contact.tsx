import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  PhoneCall,
  Smartphone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  MessageCircle,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    setError(null);

    try {
      // Direct in-browser dispatch without opening any mail apps or redirecting
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          _subject: subject || `Portfolio Inquiry from ${name}`,
          message,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(data.message || "Failed to deliver message");
      }
    } catch (err) {
      console.error(err);
      setError(
        "Network connection issue. Please feel free to email directly at sahadpathan2697@gmail.com.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's build something impactful"
          description="Open to software engineering internships, AI & data projects, and innovative collaborations."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          {/* Left Column: Direct Contact Details & Status */}
          <ScrollReveal delay={0.06}>
            <div className="surface-panel glow-orange flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
              <div>
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs text-emerald-400">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono font-medium tracking-wide uppercase">
                    Available for Opportunities
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Contact Information
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within 24 hours.
                </p>

                {/* Direct Contact Cards */}
                <div className="mt-8 space-y-4">
                  {/* Email */}
                  <div className="group relative flex items-center justify-between rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary/50 hover:bg-surface-2">
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary-bright">
                        <Mail className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-muted-foreground">
                          Email Address
                        </p>
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-medium text-foreground transition-colors hover:text-primary-bright text-xs sm:text-sm"
                        >
                          {profile.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(profile.email, "email")}
                      aria-label="Copy email address"
                      className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      {copiedEmail ? (
                        <CheckCircle2 className="size-4 text-emerald-400" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>

                  {/* Phone / Mobile / WhatsApp */}
                  <div
                    onClick={() => setIsPhoneModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsPhoneModalOpen(true);
                      }
                    }}
                    className="group relative flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary/50 hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary-bright transition-transform duration-200 group-hover:scale-105">
                        <Smartphone className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-muted-foreground flex items-center gap-1.5">
                          <span>Mobile &amp; WhatsApp</span>
                          <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPhoneModalOpen(true);
                          }}
                          className="group/num inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary-bright text-xs sm:text-sm text-left"
                        >
                          {profile.phone}
                          <ArrowUpRight className="size-3 text-muted-foreground transition-transform group-hover/num:translate-x-0.5 group-hover/num:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={profile.whatsapp}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Chat on WhatsApp"
                        title="Chat on WhatsApp"
                        className="flex size-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-all hover:scale-105 hover:border-emerald-500 hover:bg-emerald-500/20"
                      >
                        <MessageCircle className="size-4" />
                      </a>
                      <a
                        href={`tel:${profile.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Direct phone call"
                        title="Direct phone call"
                        className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:scale-105 hover:border-primary hover:text-foreground"
                      >
                        <PhoneCall className="size-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(profile.phone, "phone");
                        }}
                        aria-label="Copy phone number"
                        title="Copy phone number"
                        className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:scale-105 hover:border-primary hover:text-foreground"
                      >
                        {copiedPhone ? (
                          <CheckCircle2 className="size-4 text-emerald-400" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary-bright">
                      <MapPin className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase text-muted-foreground">
                        Location
                      </p>
                      <p className="text-xs font-medium text-foreground sm:text-sm">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Footer */}
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Connect Online
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {socialLinks.slice(0, 3).map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright"
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        {link.label}
                        <ArrowUpRight className="size-3 text-muted-foreground" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Direct In-Page Message Form */}
          <ScrollReveal delay={0.12}>
            <div className="surface-panel glow-orange rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary-bright">
                  <MessageSquare className="size-4" />
                </span>
                <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  Send a Message
                </h3>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-7 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h4 className="mt-4 font-display text-xl font-bold text-foreground">
                    Message Sent Successfully!
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Thank you! Your message was delivered directly to Shahad (<span className="font-mono text-primary-bright">{profile.email}</span>). You will receive a reply to your inbox soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  {error ? (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                      <AlertCircle className="size-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  ) : null}

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block font-mono text-xs font-medium text-foreground"
                      >
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        disabled={isSending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block font-mono text-xs font-medium text-foreground"
                      >
                        Your Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        disabled={isSending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block font-mono text-xs font-medium text-foreground"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      disabled={isSending}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Internship opportunity / Project collaboration"
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block font-mono text-xs font-medium text-foreground"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      disabled={isSending}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Shahad, I'd like to discuss a project or role..."
                      className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-bright hover:shadow-glow active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>

      {/* Mobile / Device Contact Choice Modal */}
      {isPhoneModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-choice-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPhoneModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/80 bg-surface/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Accent Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsPhoneModalOpen(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition-colors hover:border-primary hover:text-foreground active:scale-95"
            >
              <X className="size-4" />
            </button>

            {/* Modal Title & Header */}
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Smartphone className="size-5" />
              </div>
              <div>
                <h3 id="contact-choice-title" className="font-display text-lg font-bold text-foreground">
                  Contact Preference
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Shahad Pathan • {profile.phone}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Choose your preferred communication method to connect directly with Shahad:
            </p>

            {/* Options List */}
            <div className="mt-5 space-y-3">
              {/* Option 1: WhatsApp */}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setIsPhoneModalOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 transition-all hover:border-emerald-500 hover:bg-emerald-500/15 hover:shadow-glow-emerald"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-105">
                    <MessageCircle className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-emerald-400">
                        Chat on WhatsApp
                      </span>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-400 uppercase tracking-wider">
                        Recommended
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      Instant reply • {profile.phone}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
              </a>

              {/* Option 2: Direct Phone Call */}
              <a
                href={`tel:${profile.phone}`}
                onClick={() => setIsPhoneModalOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary hover:bg-surface-2 hover:shadow-glow"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary-bright transition-transform group-hover:scale-105">
                    <PhoneCall className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary-bright">
                        Direct Phone Call
                      </span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-primary-bright uppercase tracking-wider">
                        Voice Line
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      Standard cellular call • {profile.phone}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-bright" />
              </a>

              {/* Option 3: Copy Number */}
              <button
                type="button"
                onClick={() => handleCopy(profile.phone, "phone")}
                className="group flex w-full items-center justify-between rounded-2xl border border-border bg-surface p-4 text-left transition-all hover:border-border-strong hover:bg-surface-2"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-transform group-hover:scale-105 group-hover:text-foreground">
                    {copiedPhone ? (
                      <CheckCircle2 className="size-5 text-emerald-400" />
                    ) : (
                      <Copy className="size-5" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">
                      {copiedPhone ? "Phone Number Copied!" : "Copy Phone Number"}
                    </span>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {profile.phone}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">
                  {copiedPhone ? "Copied" : "Copy"}
                </span>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-3 text-[11px] text-muted-foreground">
              <span>Available 9:00 AM – 8:00 PM IST</span>
              <button
                type="button"
                onClick={() => setIsPhoneModalOpen(false)}
                className="text-primary-bright hover:underline font-mono"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
