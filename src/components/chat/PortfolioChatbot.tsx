import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  Trash2,
  ArrowUpRight,
  Lightbulb,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Download,
  Mail,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import {
  aiInferenceEngine,
  type AIInferenceResult,
} from "@/lib/aiInferenceEngine";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  thoughtProcess?: string;
  timestamp: string;
  quickActions?: AIInferenceResult["quickActions"];
}

export type ModelFilterMode = "all" | "gemini" | "llama" | "qwen" | "chatgpt";

const MODEL_PROMPT_SUGGESTIONS: Record<ModelFilterMode, string[]> = {
  all: [
    "Who is Shahad Pathan?",
    "Compare Gemini vs Llama vs Qwen vs ChatGPT",
    "Explain Shahad's AI projects (Wriper & VidSnap)",
    "Tell me about his internships & certifications",
    "How does RAG and Vector Embeddings work?",
    "How can I contact or hire Shahad?",
  ],
  gemini: [
    "Tell me about Google Gemini 2.0 Flash & Pro",
    "How does Gemini's 2-Million token context work?",
    "Explain DeepMind Antigravity AI agent architecture",
    "What is Gemma 2 open weights model?",
    "Show Python code for Gemini 2.0 with search tools",
  ],
  llama: [
    "What are the capabilities of Meta LLaMA 3.3 70B?",
    "How do you fine-tune Llama with LoRA & QLoRA?",
    "Explain Llama 3.2 Vision and on-device models",
    "How do you self-host Llama with vLLM & Ollama?",
    "What is Grouped Query Attention (GQA) & RoPE?",
  ],
  qwen: [
    "What makes Alibaba Qwen 2.5-Coder 32B so powerful?",
    "How does QwQ-32B reasoning & thinking tokens work?",
    "Explain Qwen 2.5-VL Vision-Language architecture",
    "Show Python vLLM serving code for Qwen 2.5",
    "How does Qwen compare to Claude and GPT-4o?",
  ],
  chatgpt: [
    "How do OpenAI o1 & o3 reasoning models work?",
    "Compare GPT-4o vs GPT-4o-mini",
    "How to use Structured JSON Outputs with OpenAI?",
    "Explain OpenAI Realtime Audio & Voice WebSocket API",
    "Show Python code for OpenAI function calling",
  ],
};

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-2.5 overflow-hidden rounded-xl border border-border/80 bg-background font-mono text-[11px] shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 bg-surface px-3 py-1.5 text-[10px] text-muted-foreground">
        <span className="font-medium">{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-primary-bright leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FormattedMessageText({ text }: { text: string }) {
  const segments: { type: "code" | "text"; content: string; language?: string }[] = [];
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }
    segments.push({
      type: "code",
      language: match[1] || "text",
      content: match[2].trimEnd(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  return (
    <div className="space-y-1.5 text-xs">
      {segments.map((seg, segIdx) => {
        if (seg.type === "code") {
          return <CodeBlock key={segIdx} code={seg.content} language={seg.language || "python"} />;
        }

        const lines = seg.content.split("\n");
        return (
          <div key={segIdx} className="space-y-1">
            {lines.map((line, lineIdx) => {
              if (!line.trim()) return <div key={lineIdx} className="h-1" />;

              const parts = line.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
              return (
                <p key={lineIdx} className="leading-relaxed">
                  {parts.map((part, partIdx) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={partIdx} className="font-semibold text-foreground">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    if (part.startsWith("`") && part.endsWith("`")) {
                      return (
                        <code
                          key={partIdx}
                          className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-primary-bright border border-border/60"
                        >
                          {part.slice(1, -1)}
                        </code>
                      );
                    }
                    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
                      const matchLink = part.match(/\[(.*?)\]\((.*?)\)/);
                      if (matchLink) {
                        return (
                          <a
                            key={partIdx}
                            href={matchLink[2]}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-primary-bright underline hover:text-primary transition-colors font-medium inline-flex items-center gap-0.5"
                          >
                            {matchLink[1]}
                            <ArrowUpRight className="size-2.5 inline-block" />
                          </a>
                        );
                      }
                    }
                    return <span key={partIdx}>{part}</span>;
                  })}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeModelMode, setActiveModelMode] = useState<ModelFilterMode>("all");
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reduced = useReducedMotion();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: `👋 Hi! I'm **Shahad AI** — an advanced intelligent pair assistant fine-tuned on **Shahad Pathan's engineering portfolio** and frontier cloud AI architectures: **Google Gemini**, **Meta LLaMA**, **Alibaba Qwen**, and **OpenAI ChatGPT**!\n\nUse the model focus selector above to explore specific architectures, or ask me anything!`,
      thoughtProcess: "Initialized Sr. AI Engineer multi-agent inference engine with Gemini, LLaMA, Qwen, and ChatGPT cloud datasets.",
      timestamp: "Just now",
      quickActions: [
        {
          label: "✨ Google Gemini 2.0",
          actionType: "send_message",
          payload: "Tell me about Google Gemini 2.0 and DeepMind AI",
        },
        {
          label: "🦙 Meta LLaMA 3.3",
          actionType: "send_message",
          payload: "What are the capabilities of Meta LLaMA 3.3?",
        },
        {
          label: "🔮 Alibaba Qwen 2.5",
          actionType: "send_message",
          payload: "Tell me about Alibaba Qwen 2.5-Coder and QwQ",
        },
        {
          label: "🟢 OpenAI ChatGPT & o1/o3",
          actionType: "send_message",
          payload: "How do OpenAI o1 and o3 reasoning models work?",
        },
        {
          label: "🚀 Shahad's AI Projects",
          actionType: "send_message",
          payload: "What are Shahad's top AI projects?",
        },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping, activeModelMode]);

  // Speech synthesis reader
  const handleSpeak = (msgId: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown characters for cleaner speech
    const cleanText = text.replace(/[*_`#]/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleActionClick = (action: NonNullable<AIInferenceResult["quickActions"]>[number]) => {
    switch (action.actionType) {
      case "send_message":
        if (action.payload) handleSend(action.payload);
        break;
      case "open_url":
        if (action.payload) window.open(action.payload, "_blank");
        break;
      case "scroll_section":
        if (action.payload) {
          setIsOpen(false);
          document.getElementById(action.payload)?.scrollIntoView({ behavior: "smooth" });
        }
        break;
      case "download_resume":
        window.open("/resume.pdf", "_blank");
        break;
      case "copy_email":
        navigator.clipboard.writeText(profile.email);
        break;
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend ?? input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Fine-tuned neural inference
    setTimeout(() => {
      const inference = aiInferenceEngine.generateInference(query);
      const botMsgId = `bot-${Date.now()}`;

      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: "bot",
        text: inference.text,
        thoughtProcess: inference.thoughtProcess,
        timestamp: "Just now",
        quickActions: inference.quickActions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleClearChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }

    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: `Chat cleared! ✨ Ask me anything about Google Gemini, Meta LLaMA, Alibaba Qwen, OpenAI ChatGPT, or Shahad's portfolio!`,
        thoughtProcess: "Context buffer flushed. Ready for new technical queries.",
        timestamp: "Just now",
        quickActions: MODEL_PROMPT_SUGGESTIONS[activeModelMode].slice(0, 4).map((prompt) => ({
          label: prompt,
          actionType: "send_message",
          payload: prompt,
        })),
      },
    ]);
  };

  const handleModelModeSelect = (mode: ModelFilterMode) => {
    setActiveModelMode(mode);
    aiInferenceEngine.setModelFocus(mode);

    const modeNames: Record<ModelFilterMode, string> = {
      all: "Unified Portfolio & Multi-Model AI",
      gemini: "Google Gemini 2.0 & DeepMind",
      llama: "Meta LLaMA 3.3 & Open Weights",
      qwen: "Alibaba Qwen 2.5-Coder & QwQ",
      chatgpt: "OpenAI ChatGPT & o1/o3 Reasoning",
    };

    const sysNotice: ChatMessage = {
      id: `mode-switch-${Date.now()}`,
      sender: "bot",
      text: `🔄 Switched active focus to **${modeNames[mode]}**! Try one of the suggested prompts below:`,
      thoughtProcess: `Configured system prompt and domain focus weighting to: ${mode.toUpperCase()}.`,
      timestamp: "Just now",
      quickActions: MODEL_PROMPT_SUGGESTIONS[mode].slice(0, 4).map((prompt) => ({
        label: prompt,
        actionType: "send_message",
        payload: prompt,
      })),
    };

    setMessages((prev) => [...prev, sysNotice]);
  };

  return (
    <>
      {/* Floating Right-Side Compact Launcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          className="group relative flex size-11 items-center justify-center rounded-full border border-primary/40 bg-surface/95 text-primary-bright shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-surface-2 hover:shadow-[0_0_20px_var(--glow)] active:scale-95 sm:size-12"
          title={isOpen ? "Close AI Assistant" : "Open Shahad AI Assistant"}
        >
          <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 border-2 border-background" />
          </span>

          <Bot className="size-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
        </button>
      </div>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed right-4 bottom-24 z-50 flex h-[600px] w-[calc(100vw-2rem)] sm:w-[460px] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/80 bg-surface/90 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="relative flex size-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary-bright shadow-[0_0_12px_var(--glow)]">
                  <Bot className="size-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-emerald-500" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground flex items-center gap-1.5">
                    Shahad AI
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.2 font-mono text-[9px] text-primary-bright font-semibold">
                      Sr. AI Engineer Fine-Tuned
                    </span>
                  </h3>
                  <p className="font-mono text-[10px] text-emerald-400">● Online · Gemini · LLaMA · Qwen · ChatGPT</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  aria-label="Close Assistant"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Interactive Model Selector Pill Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border/60 bg-surface/60 px-3 py-2 text-[11px] scrollbar-none">
              <span className="font-mono text-[10px] uppercase text-muted-foreground shrink-0 font-medium">
                Focus:
              </span>
              <button
                type="button"
                onClick={() => handleModelModeSelect("all")}
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-medium transition-all ${
                  activeModelMode === "all"
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                🤖 All
              </button>
              <button
                type="button"
                onClick={() => handleModelModeSelect("gemini")}
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-medium transition-all ${
                  activeModelMode === "gemini"
                    ? "bg-blue-500 text-white shadow-xs font-semibold"
                    : "border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:border-blue-500/40"
                }`}
              >
                ✨ Gemini 2.0
              </button>
              <button
                type="button"
                onClick={() => handleModelModeSelect("llama")}
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-medium transition-all ${
                  activeModelMode === "llama"
                    ? "bg-indigo-500 text-white shadow-xs font-semibold"
                    : "border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:border-indigo-500/40"
                }`}
              >
                🦙 LLaMA 3.3
              </button>
              <button
                type="button"
                onClick={() => handleModelModeSelect("qwen")}
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-medium transition-all ${
                  activeModelMode === "qwen"
                    ? "bg-purple-500 text-white shadow-xs font-semibold"
                    : "border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:border-purple-500/40"
                }`}
              >
                🔮 Qwen 2.5
              </button>
              <button
                type="button"
                onClick={() => handleModelModeSelect("chatgpt")}
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-medium transition-all ${
                  activeModelMode === "chatgpt"
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
                    : "border border-border/80 bg-surface text-muted-foreground hover:text-foreground hover:border-emerald-500/40"
                }`}
              >
                🟢 ChatGPT
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-start gap-2 max-w-[92%]">
                    {msg.sender === "bot" ? (
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary-bright mt-0.5">
                        <Bot className="size-3.5" />
                      </span>
                    ) : null}

                    <div className="flex flex-col gap-1 w-full">
                      {/* Thought Process (CoT) Accordion for Bot Messages */}
                      {msg.sender === "bot" && msg.thoughtProcess ? (
                        <div className="mb-1 rounded-xl border border-primary/20 bg-primary/5 p-2 text-[10px] text-muted-foreground">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedThoughtId((prev) => (prev === msg.id ? null : msg.id))
                            }
                            className="flex w-full items-center justify-between font-mono text-[10px] text-primary transition-colors hover:text-primary-bright"
                          >
                            <span className="flex items-center gap-1 font-semibold">
                              <Sparkles className="size-3" />
                              Thought Process / Reasoning Trace
                            </span>
                            {expandedThoughtId === msg.id ? (
                              <ChevronUp className="size-3" />
                            ) : (
                              <ChevronDown className="size-3" />
                            )}
                          </button>
                          {expandedThoughtId === msg.id && (
                            <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-foreground/80 border-t border-primary/10 pt-1.5">
                              {msg.thoughtProcess}
                            </p>
                          )}
                        </div>
                      ) : null}

                      {/* Main Message Bubble */}
                      <div
                        className={`rounded-2xl px-4 py-3 leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground font-medium rounded-tr-xs shadow-md"
                            : "border border-border bg-surface text-foreground rounded-tl-xs shadow-xs"
                        }`}
                      >
                        <FormattedMessageText text={msg.text} />
                      </div>

                      {/* Bot Message Tool Bar (Speech Reader & Copy) */}
                      {msg.sender === "bot" ? (
                        <div className="flex items-center gap-2 pl-1 text-[10px] text-muted-foreground">
                          <button
                            type="button"
                            onClick={() => handleSpeak(msg.id, msg.text)}
                            title={speakingMsgId === msg.id ? "Stop voice" : "Read response aloud"}
                            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 transition-colors hover:bg-surface hover:text-foreground"
                          >
                            {speakingMsgId === msg.id ? (
                              <>
                                <VolumeX className="size-3 text-red-400" />
                                <span className="text-red-400">Stop Voice</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="size-3" />
                                <span>Voice Reader</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(msg.text)}
                            title="Copy response"
                            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 transition-colors hover:bg-surface hover:text-foreground"
                          >
                            <Copy className="size-3" />
                            <span>Copy Text</span>
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {msg.sender === "user" ? (
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground mt-0.5">
                        <User className="size-3.5" />
                      </span>
                    ) : null}
                  </div>

                  {/* Dynamic Action Buttons for Bot Replies */}
                  {msg.quickActions && msg.quickActions.length > 0 ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 pl-8">
                      {msg.quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleActionClick(action)}
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-foreground transition-all hover:border-primary/50 hover:bg-surface-2 hover:text-primary-bright active:scale-95"
                        >
                          {action.label}
                          <ArrowUpRight className="size-3 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 pl-1">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary-bright">
                    <Bot className="size-3.5" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl border border-border bg-surface px-3.5 py-2.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Chips */}
            {messages.length <= 2 && !isTyping && (
              <div className="border-t border-border/60 bg-surface/40 p-2.5">
                <p className="mb-1.5 px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="size-3 text-primary" />
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {MODEL_PROMPT_SUGGESTIONS[activeModelMode].slice(0, 4).map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border bg-surface/90 p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Gemini, LLaMA, Qwen, ChatGPT, or Shahad..."
                className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
