/**
 * Frontier AI Models & Cloud Intelligence Knowledge Base
 * Deep dataset covering Google Gemini, Meta LLaMA, Alibaba Qwen, OpenAI ChatGPT,
 * and Cross-Model Benchmarks for Shahad's Portfolio AI Assistant.
 */

export interface AIModelDetails {
  id: string;
  name: string;
  creator: string;
  family: "gemini" | "llama" | "qwen" | "chatgpt";
  releaseYear: string;
  keyFeatures: string[];
  contextWindow: string;
  strengths: string[];
  codeExample: string;
  cloudProviders: string[];
  description: string;
}

export const AI_MODELS_DATA: AIModelDetails[] = [
  // -------------------------------------------------------------
  // 1. GOOGLE GEMINI ECOSYSTEM
  // -------------------------------------------------------------
  {
    id: "gemini-2-flash",
    name: "Google Gemini 2.0 Flash",
    creator: "Google DeepMind",
    family: "gemini",
    releaseYear: "2025/2026",
    contextWindow: "1,000,000+ Tokens",
    keyFeatures: [
      "Native Multimodal Reasoning (Audio, Video, PDF, Images, Code, Text)",
      "Real-time low-latency streaming and multimodal live API",
      "Agentic Tool Orchestration & Native Code Execution",
      "Search Grounding with Google Search & Dynamic Python Sandboxing",
      "High throughput for high-concurrency production workflows",
    ],
    strengths: [
      "Speed and low inference latency for real-time applications",
      "Massive multimodal token ingestion without external pre-transcribers",
      "Cost-effective frontier reasoning",
    ],
    codeExample: `from google import genai
from google.genai import types

client = genai.Client()
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["Analyze this architectural diagram and summarize key bottlenecks."],
    config=types.GenerateContentConfig(
        temperature=0.2,
        tools=[{"google_search": {}}]
    )
)
print(response.text)`,
    cloudProviders: ["Google AI Studio", "Google Cloud Vertex AI"],
    description:
      "Gemini 2.0 Flash is Google's flagship multimodal model designed for next-generation speed, native agentic tool calling, and live audio/video streaming.",
  },
  {
    id: "gemini-1-5-pro",
    name: "Google Gemini 1.5 Pro",
    creator: "Google DeepMind",
    family: "gemini",
    releaseYear: "2024/2025",
    contextWindow: "2,097,152 Tokens (2 Million Tokens)",
    keyFeatures: [
      "World-record 2M token context window (1 hour video, 11 hours audio, 700k lines of code)",
      "Near-perfect 99%+ Needle-In-A-Haystack retrieval across audio, video, and text",
      "Deep mathematical & multi-step algorithmic reasoning",
      "Gemma 2 open-weights family (2B, 9B, 27B) built on Gemini innovations",
    ],
    strengths: [
      "Vast codebase comprehension & repository-scale refactoring",
      "Long-form document analysis and media synthesis",
    ],
    codeExample: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();
const response = await ai.models.generateContent({
  model: "gemini-1.5-pro",
  contents: [
    { text: "Analyze the full repository code and identify memory leak risks." }
  ],
});
console.log(response.text);`,
    cloudProviders: ["Google Cloud Vertex AI", "Google AI Studio"],
    description:
      "Gemini 1.5 Pro delivers breakthrough 2M token context window capacity, allowing developers to process entire libraries, audiobooks, and hours of video natively in a single prompt.",
  },

  // -------------------------------------------------------------
  // 2. META LLAMA ECOSYSTEM
  // -------------------------------------------------------------
  {
    id: "llama-3-3-70b",
    name: "Meta LLaMA 3.3 (70B Instruct)",
    creator: "Meta AI",
    family: "llama",
    releaseYear: "2024/2025",
    contextWindow: "128,000 Tokens",
    keyFeatures: [
      "Open-weights frontier reasoning rivaling Llama 3.1 405B at a fraction of compute",
      "Grouped Query Attention (GQA) for efficient KV cache memory utilization",
      "Rotary Position Embeddings (RoPE) scaled up to 128k context",
      "Full offline privacy, fine-tunable with LoRA / QLoRA on single multi-GPU nodes",
      "Native vLLM, TensorRT-LLM, Ollama, and TGI serving support",
    ],
    strengths: [
      "Industry standard for self-hosted enterprise private deployments",
      "Zero vendor lock-in with complete weights accessibility",
      "High coding, tool calling, and multilingual reasoning performance",
    ],
    codeExample: `import ollama

response = ollama.chat(
    model="llama3.3:70b",
    messages=[
        {"role": "system", "content": "You are an expert systems engineer."},
        {"role": "user", "content": "Write a high-performance LRU cache in C++20 with atomic locks."}
    ]
)
print(response["message"]["content"])`,
    cloudProviders: ["AWS Bedrock", "Groq", "Together AI", "Ollama (Self-Hosted)", "Azure AI"],
    description:
      "Llama 3.3 70B delivers flagship-level intelligence matching previous 405B models, making high-end open-source reasoning accessible for self-hosted and cloud production pipelines.",
  },
  {
    id: "llama-3-2-vision",
    name: "Meta LLaMA 3.2 (11B & 90B Vision)",
    creator: "Meta AI",
    family: "llama",
    releaseYear: "2024/2025",
    contextWindow: "128,000 Tokens",
    keyFeatures: [
      "Open-weights Multimodal Vision Model (Image understanding, Chart/Table reasoning)",
      "Cross-attention layers fusing image encoder representations into the text transformer",
      "1B and 3B ultra-lightweight models tailored for on-device mobile/edge hardware",
      "Llama Guard 3 safety validation built-in",
    ],
    strengths: [
      "Document visual parsing & OCR extraction in self-hosted environments",
      "On-device mobile inference with Snapdragon / Apple Silicon optimization",
    ],
    codeExample: `import { Ollama } from "ollama";

const client = new Ollama();
const res = await client.generate({
  model: "llama3.2-vision:11b",
  prompt: "What UI components are shown in this diagram?",
  images: ["./diagram.png"],
});
console.log(res.response);`,
    cloudProviders: ["Self-Hosted vLLM", "AWS Bedrock", "Groq Cloud", "RunPod"],
    description:
      "Llama 3.2 brings native multimodal vision and compact edge models to the open-source ecosystem.",
  },

  // -------------------------------------------------------------
  // 3. ALIBABA QWEN ECOSYSTEM
  // -------------------------------------------------------------
  {
    id: "qwen-2-5-coder",
    name: "Alibaba Qwen 2.5-Coder (32B & 72B)",
    creator: "Alibaba Cloud / Qwen Team",
    family: "qwen",
    releaseYear: "2024/2025",
    contextWindow: "128,000 Tokens",
    keyFeatures: [
      "Top-tier open-source coding & mathematical reasoning model in the world",
      "Trained on 5.5+ Trillion tokens of high-quality code, math, and synthetic reasoning",
      "Outperforms GPT-4o in multiple coding benchmarks (HumanEval, MultiPL-E, SWE-bench)",
      "Native support for 92+ programming languages and repository-level code comprehension",
      "Dual RoPE and YARN context extension up to 128k tokens",
    ],
    strengths: [
      "Exceptional Python, TypeScript, C++, and SQL code generation and refactoring",
      "Strong tool use, JSON schema generation, and code agent performance",
    ],
    codeExample: `from vllm import LLM, SamplingParams

llm = LLM(model="Qwen/Qwen2.5-Coder-32B-Instruct", tensor_parallel_size=2)
prompts = ["Write a FastAPI asynchronous WebSocket handler with Redis pub/sub."]
sampling_params = SamplingParams(temperature=0.1, max_tokens=1024)

outputs = llm.generate(prompts, sampling_params)
for output in outputs:
    print(output.outputs[0].text)`,
    cloudProviders: ["Alibaba Cloud Model Studio", "Hugging Face", "vLLM Self-Hosted", "Together AI"],
    description:
      "Qwen 2.5-Coder 32B/72B is recognized as one of the most capable open-source code generation models ever created, rivaling leading proprietary models.",
  },
  {
    id: "qwq-32b-reasoning",
    name: "Alibaba QwQ-32B (Thinking / Reasoning)",
    creator: "Alibaba Cloud / Qwen Team",
    family: "qwen",
    releaseYear: "2025/2026",
    contextWindow: "128,000 Tokens",
    keyFeatures: [
      "Extended Chain-of-Thought (CoT) reasoning model with recursive self-reflection",
      "Reinforcement Learning (RL) trained on competitive math and hard coding challenges",
      "Rivals OpenAI o1-mini and DeepSeek-R1 in complex algorithmic derivation",
      "Explores multiple solution hypotheses before finalizing output",
    ],
    strengths: [
      "Mathematical proof derivation, competitive programming, and deep logic analysis",
      "Self-correction of intermediate calculation errors during inference",
    ],
    codeExample: `# QwQ-32B reasoning request
import openai

client = openai.OpenAI(
    base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    api_key="YOUR_DASHSCOPE_KEY"
)
completion = client.chat.completions.create(
    model="qwq-32b",
    messages=[{"role": "user", "content": "Solve the 3-sum closest problem with mathematical proof of O(n^2) bound."}]
)
print(completion.choices[0].message.content)`,
    cloudProviders: ["Alibaba Cloud DashScope", "Hugging Face", "Ollama"],
    description:
      "QwQ-32B is an open-weights reasoning model that introduces deep thinking tokens, competitive math proofs, and self-reflective verification.",
  },

  // -------------------------------------------------------------
  // 4. OPENAI CHATGPT ECOSYSTEM
  // -------------------------------------------------------------
  {
    id: "chatgpt-gpt-4o",
    name: "OpenAI GPT-4o & GPT-4o-mini",
    creator: "OpenAI",
    family: "chatgpt",
    releaseYear: "2024/2025",
    contextWindow: "128,000 Tokens",
    keyFeatures: [
      "Omni architecture accepting text, audio, and image inputs natively with low latency",
      "Strict Structured JSON Outputs with 100% schema compliance guarantee",
      "Realtime Voice & Audio WebSocket API with human-like latency (~300ms)",
      "Comprehensive Function Calling and tool orchestration ecosystem",
      "Batch API offering 50% cost discounts for asynchronous processing",
    ],
    strengths: [
      "General intelligence, instruction following, and multilingual fluency",
      "Strict JSON parsing and reliable database schema integration",
    ],
    codeExample: `import OpenAI from "openai";

const openai = new OpenAI();
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "Extract technical skills into strict JSON." },
    { role: "user", content: "Shahad builds Python, React 19, and OpenCV apps." }
  ],
  response_format: { type: "json_object" }
});
console.log(completion.choices[0].message.content);`,
    cloudProviders: ["OpenAI API", "Microsoft Azure OpenAI Service"],
    description:
      "GPT-4o represents OpenAI's omni-modal flagship model, engineered for high-speed voice, vision, code, and strict JSON output generation.",
  },
  {
    id: "openai-o1-o3",
    name: "OpenAI o1 & o3-mini (Reasoning Series)",
    creator: "OpenAI",
    family: "chatgpt",
    releaseYear: "2024/2025/2026",
    contextWindow: "128,000 - 200,000 Tokens",
    keyFeatures: [
      "Large-scale Reinforcement Learning with hidden Chain-of-Thought reasoning tokens",
      "State-of-the-art competitive programming (Codeforces 90th+ percentile)",
      "High performance on US Math Olympiad (AIME) and PhD-level science evaluations",
      "Configurable reasoning effort (low, medium, high) for cost-efficiency trade-offs",
    ],
    strengths: [
      "Complex algorithmic design, cryptography, and multi-step theorem verification",
      "Debugging intricate concurrency and distributed systems race conditions",
    ],
    codeExample: `import OpenAI from "openai";

const openai = new OpenAI();
const response = await openai.chat.completions.create({
  model: "o3-mini",
  messages: [
    { role: "user", content: "Optimize this distributed Paxos consensus state machine in Rust." }
  ],
  reasoning_effort: "high"
});
console.log(response.choices[0].message.content);`,
    cloudProviders: ["OpenAI Platform", "Azure OpenAI"],
    description:
      "OpenAI o1/o3 reasoning models use reinforcement learning to spend more computation time thinking before producing answers, solving complex science and code challenges.",
  },
];

export const MODEL_COMPARISON_MATRIX = [
  {
    feature: "Context Window",
    gemini: "2,000,000 Tokens (Industry Leading)",
    llama: "128,000 Tokens",
    qwen: "128,000 Tokens",
    chatgpt: "128,000 - 200,000 Tokens",
  },
  {
    feature: "Deployment Privacy",
    gemini: "Managed Cloud (Google Cloud Vertex AI)",
    llama: "100% Self-Hostable (vLLM / Ollama)",
    qwen: "100% Self-Hostable (vLLM / HuggingFace)",
    chatgpt: "Managed Cloud (OpenAI / Azure)",
  },
  {
    feature: "Coding Performance",
    gemini: "High (Gemini 2.0 Flash / Pro)",
    llama: "Very High (Llama 3.3 70B)",
    qwen: "Exceptional (Qwen 2.5-Coder 32B)",
    chatgpt: "Exceptional (o3-mini / GPT-4o)",
  },
  {
    feature: "Reasoning Methodology",
    gemini: "Native Multimodal Reasoning",
    llama: "High-parameter SFT + DPO",
    qwen: "QwQ-32B Thinking Tokens",
    chatgpt: "o1/o3 RL Chain-of-Thought",
  },
  {
    feature: "Multimodal Native",
    gemini: "Audio, Video, PDF, Image, Code, Text",
    llama: "Image & Text (Llama 3.2 Vision)",
    qwen: "Image, Video & Text (Qwen 2.5-VL)",
    chatgpt: "Voice, Image & Text (GPT-4o)",
  },
];

export const SHAHAD_AI_ENGINEERING_INTEGRATIONS = {
  overview:
    "Shahad Pathan leverages these frontier model families across data science, computer vision, and full-stack software pipelines.",
  highlights: [
    {
      model: "Google Gemini 2.0 & Vertex AI",
      application: "VidSnap AI & Multimodal Intelligence",
      details:
        "Applied for automated keyframe analysis, scene change indexing, and natural language video search pipelines.",
    },
    {
      model: "Meta LLaMA 3.3 & Ollama",
      application: "Private Local RAG & Edge Inference",
      details:
        "Utilized for local parameter-efficient fine-tuning (LoRA / QLoRA) on custom datasets without cloud data egress.",
    },
    {
      model: "Alibaba Qwen 2.5-Coder",
      application: "High-Efficiency Code Generation & Refactoring",
      details:
        "Used for generating optimized Python data engineering pipelines, TypeScript interfaces, and algorithmic problem solving.",
    },
    {
      model: "OpenAI GPT-4o & o1/o3",
      application: "Structured Data Extraction & Advanced Logic",
      details:
        "Integrated for strict JSON outputs, automated schema migrations, and complex algorithmic verification.",
    },
  ],
};
