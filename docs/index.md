# Tflow Online 在线文档

这里整理常用 AI 客户端和命令行工具的模型服务配置方法，重点覆盖 Base URL、API Key 和模型选择。

## 文档目录

- [平台介绍](/platform)：注册、登录、API Key 创建、Base URL 和可用模型。
- [Codex App 和 CLI 配置](/codex)：配置 OpenAI 官方服务、OpenAI 兼容服务、默认模型和临时模型。
- [Claude CLI 配置](/claude-cli)：配置 `ANTHROPIC_BASE_URL`、`ANTHROPIC_API_KEY`、模型别名和固定模型。
- [Cherry Studio 配置](/cherry-studio)：新增模型提供商，配置 Base URL、API Key 和可用模型列表。

## 通用建议

- API Key 不要写入项目仓库。命令行工具优先使用环境变量或个人用户目录配置。
- Tflow 推荐 Base URL：`https://tflow.online`。
- 是否需要追加 `/v1` 或其他 path，取决于客户端会不会自动拼接接口路径。Codex 通常使用带 `/v1` 的 OpenAI 兼容 API base；Claude CLI 通常使用根地址；Cherry Studio 会按 provider 类型自动拼接路径，特殊完整接口地址需要以 `#` 结尾。
- 模型名称必须使用服务商实际支持的 ID。第三方网关常会使用 `provider/model` 形式。
- 修改环境变量后，重新打开终端或重启客户端，确保新配置生效。
