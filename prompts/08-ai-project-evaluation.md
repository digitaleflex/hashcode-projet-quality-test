# AI / LLM Quality Evaluation Prompt

Use this prompt only when the project contains AI, LLM, agents, RAG, computer vision or probabilistic model behavior.

Map the AI system into inputs, retrieval/context, model calls, tools/actions, outputs and user-visible consequences.

Evaluate:
- task correctness and groundedness
- deterministic functional behavior around model calls
- evaluation dataset quality and representativeness
- prompt/version management
- hallucination and refusal behavior
- prompt injection and tool abuse
- sensitive-data leakage
- authorization around tools and retrieved data
- latency, cost and failure fallback
- regression evaluation across model/prompt changes

Separate model-quality failures from application defects. Define measurable evaluation criteria and a small regression suite. Never treat one successful example as proof of model reliability.
