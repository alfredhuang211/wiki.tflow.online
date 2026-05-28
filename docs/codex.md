# Codex App 和 CLI 配置

本文适用于 OpenAI Codex App、Codex CLI 和 IDE Extension 的本地模型配置。Codex CLI 和 IDE Extension 使用同一个 `config.toml` 配置文件；Codex App 的本地任务也会读取用户级 Codex 配置。

参考资料：

- [Codex 配置参考](https://developers.openai.com/codex/config-reference)
- [Codex 模型说明](https://developers.openai.com/codex/models)
- [Codex CLI 参数参考](https://developers.openai.com/codex/cli/reference)

## 配置文件位置

用户级配置文件：

```text
~/.codex/config.toml
```

不要把供应商、API Key、Base URL 等机器本地配置写到项目内 `.codex/config.toml`。Codex 会忽略项目级配置里的 `model_provider`、`model_providers`、`openai_base_url` 等本地敏感配置。

## 使用 OpenAI 官方 API Key

在 shell 中配置 API Key：

```bash
export OPENAI_API_KEY="sk-..."
```

设置默认模型：

```toml
# ~/.codex/config.toml
model = "gpt-5.5"
```

临时指定模型：

```bash
codex -m gpt-5.5
codex exec -m gpt-5.4-mini "检查这个项目的测试失败原因"
```

## 配置 OpenAI 官方接口的 Base URL

如果仍使用内置 `openai` provider，只是要把请求发到兼容 OpenAI API 的代理地址，可以设置顶层 `openai_base_url`：

```toml
# ~/.codex/config.toml
model = "gpt-5.5"
openai_base_url = "https://tflow.online/v1"
```

API Key 仍然从 `OPENAI_API_KEY` 读取：

```bash
export OPENAI_API_KEY="your-api-key"
```

## 配置自定义模型提供商

长期使用第三方 OpenAI 兼容服务时，建议定义单独的 `model_provider`：

```toml
# ~/.codex/config.toml
model_provider = "my-provider"
model = "provider-model-id"

[model_providers.my-provider]
name = "My Provider"
base_url = "https://tflow.online/v1"
env_key = "MY_PROVIDER_API_KEY"
wire_api = "responses"
```

然后在 shell 中配置密钥：

```bash
export MY_PROVIDER_API_KEY="your-api-key"
```

字段说明：

- `model_provider`：当前默认使用的 provider ID。
- `model`：发送给该 provider 的模型 ID。
- `base_url`：模型服务 API 根地址。
- `env_key`：Codex 从哪个环境变量读取 API Key。
- `wire_api`：优先使用 `responses`；只有服务商不支持 Responses API 时再使用 `chat`。

## Base URL 路径怎么填

推荐先使用：

```text
https://tflow.online/v1
```

Codex 的 `openai_base_url` 和 `model_providers.<id>.base_url` 表示 API base URL。对于 OpenAI 兼容接口，通常需要包含 `/v1`，让 Codex 在此基础上请求 Responses 或 Chat Completions 等接口。

如果对接方案明确提供了专用 path，例如网关要求使用某个独立路由，再按该方案填写完整 API base。不要把 `chat/completions` 或 `responses` 这类具体接口路径写进 `base_url`，除非对接方案明确要求。

## 如何选择模型

截至 2026-05-28，Codex 官方推荐优先从这些模型开始：

- `gpt-5.5`：复杂编码、计算机使用、知识工作和研究工作流的首选。
- `gpt-5.4`：专业编码和通用 agentic 工作流。
- `gpt-5.4-mini`：更快、更省的轻量任务和子代理。
- `gpt-5.3-codex`：复杂软件工程任务。
- `gpt-5.3-codex-spark`：低延迟实时编码迭代，按账号权限可用。

建议：

- 日常默认：`gpt-5.5`
- 成本和速度优先：`gpt-5.4-mini`
- 第三方网关：使用网关文档里列出的精确模型 ID
- 临时测试：用 `codex -m <model>`，稳定后再写入 `config.toml`

## 检查当前可见模型

Codex CLI 提供模型调试命令：

```bash
codex debug models
```

如果只想查看当前二进制内置模型目录：

```bash
codex debug models --bundled
```

## 常见问题

### 配了 Base URL 但请求仍然发往 OpenAI 官方地址

检查是否把 `openai_base_url` 错写到了 `[model_provider_config]` 或项目级 `.codex/config.toml`。它应当是用户级 `~/.codex/config.toml` 的顶层字段。

### 第三方模型报 model not found

确认 `model` 是 provider 实际支持的模型 ID。很多网关要求写成 `provider/model-name`，不能只写通用模型名。

### API Key 不生效

确认 `env_key` 指向的环境变量已经在启动 Codex 的同一个 shell 中设置。修改 shell 配置文件后，需要重新打开终端。
