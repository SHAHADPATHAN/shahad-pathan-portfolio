import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  ArrowUpRight,
  Loader2,
  AlertCircle,
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

                  {/* Phone / Mobile */}
                  <div className="group relative flex items-center justify-between rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary/50 hover:bg-surface-2">
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary-bright">
                        <Phone className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-muted-foreground">
                          Mobile &amp; WhatsApp
                        </p>
                        <a
                          href={`tel:${profile.phone}`}
                          className="font-medium text-foreground transition-colors hover:text-primary-bright text-xs sm:text-sm"
                        >
                          {profile.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(profile.phone, "phone")}
                      aria-label="Copy phone number"
                      className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                    >
                      {copiedPhone ? (
                        <CheckCircle2 className="size-4 text-emerald-400" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
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
    </section>
  );
}
