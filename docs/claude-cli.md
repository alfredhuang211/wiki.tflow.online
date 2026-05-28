# Claude CLI 配置

本文适用于 Claude Code CLI，即终端中的 `claude` 命令。Claude Code 可以通过环境变量或 `settings.json` 配置 API Key、Base URL 和模型选择。

参考资料：

- [Claude Code 环境变量](https://code.claude.com/docs/en/env-vars)
- [Claude Code 模型配置](https://code.claude.com/docs/en/model-config)
- [Claude Code 设置](https://code.claude.com/docs/en/settings)

## 通过环境变量配置 API Key 和 Base URL

直接使用 Anthropic API：

macOS / Linux：

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
claude
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
claude
```

Windows CMD：

```cmd
set ANTHROPIC_API_KEY=sk-ant-...
claude
```

通过代理或 LLM 网关：

macOS / Linux：

```bash
export ANTHROPIC_API_KEY="your-api-key"
export ANTHROPIC_BASE_URL="https://tflow.online"
claude
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_API_KEY = "your-api-key"
$env:ANTHROPIC_BASE_URL = "https://tflow.online"
claude
```

Windows CMD：

```cmd
set ANTHROPIC_API_KEY=your-api-key
set ANTHROPIC_BASE_URL=https://tflow.online
claude
```

说明：

- `ANTHROPIC_API_KEY` 会作为 `X-Api-Key` 请求头发送。
- 设置 `ANTHROPIC_API_KEY` 后，即使已登录 Claude Pro、Max、Team 或 Enterprise，Claude Code 也会优先使用该 API Key。
- `ANTHROPIC_BASE_URL` 只改变请求发送到哪里，不决定使用哪个模型。

如果要恢复使用登录态订阅：

macOS / Linux：

```bash
unset ANTHROPIC_API_KEY
unset ANTHROPIC_BASE_URL
```

Windows PowerShell：

```powershell
Remove-Item Env:\ANTHROPIC_API_KEY
Remove-Item Env:\ANTHROPIC_BASE_URL
```

Windows CMD：

```cmd
set ANTHROPIC_API_KEY=
set ANTHROPIC_BASE_URL=
```

## 写入 Claude Code 设置文件

用户级设置文件：

macOS / Linux：

```text
~/.claude/settings.json
```

Windows：

```text
%USERPROFILE%\.claude\settings.json
```

示例：

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "your-api-key",
    "ANTHROPIC_BASE_URL": "https://tflow.online"
  }
}
```

团队项目不建议把 API Key 写入项目级 `.claude/settings.json`。如果需要共享配置，只共享非敏感项，把密钥留在个人环境变量或本机用户配置中。

## 选择模型

Claude Code 支持模型别名和完整模型名。

常用别名：

- `default`：清除模型覆盖，回到账号推荐默认值。
- `sonnet`：日常编码任务。
- `opus`：复杂推理任务。
- `haiku`：简单、快速、低成本任务。
- `opusplan`：计划阶段使用 Opus，执行阶段使用 Sonnet。

会话中切换模型：

```text
/model sonnet
/model opus
/model claude-opus-4-7
```

启动时指定：

```bash
claude --model sonnet
claude --model claude-opus-4-7
```

通过环境变量指定：

macOS / Linux：

```bash
export ANTHROPIC_MODEL="sonnet"
claude
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_MODEL = "sonnet"
claude
```

Windows CMD：

```cmd
set ANTHROPIC_MODEL=sonnet
claude
```

永久默认值可以写入 `~/.claude/settings.json`：

```json
{
  "model": "sonnet"
}
```

## Base URL 路径怎么填

推荐先使用：

```text
https://tflow.online
```

Claude Code 的 `ANTHROPIC_BASE_URL` 是 Anthropic API 的服务根地址。通常不要手动追加 `/v1/messages` 这类具体接口路径。

如果你的对接方案要求独立 path，例如某个网关把 Claude 兼容接口挂在 `/anthropic` 或 `/claude` 下，再按方案填写：

macOS / Linux：

```bash
export ANTHROPIC_BASE_URL="https://tflow.online/anthropic"
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_BASE_URL = "https://tflow.online/anthropic"
```

Windows CMD：

```cmd
set ANTHROPIC_BASE_URL=https://tflow.online/anthropic
```

路径是否存在以实际对接方案为准。仅设置 Base URL 不会切换模型；模型仍然通过 `/model`、`--model`、`ANTHROPIC_MODEL` 或 `settings.json` 设置。

## 配置第三方网关的可选模型

如果网关返回的模型不在 Claude Code 默认选择器里，可以增加一个自定义模型选项：

macOS / Linux：

```bash
export ANTHROPIC_BASE_URL="https://tflow.online"
export ANTHROPIC_API_KEY="your-api-key"
export ANTHROPIC_CUSTOM_MODEL_OPTION="provider/model-id"
export ANTHROPIC_CUSTOM_MODEL_OPTION_NAME="Provider Model"
export ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION="Model routed through custom gateway"
claude
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_BASE_URL = "https://tflow.online"
$env:ANTHROPIC_API_KEY = "your-api-key"
$env:ANTHROPIC_CUSTOM_MODEL_OPTION = "provider/model-id"
$env:ANTHROPIC_CUSTOM_MODEL_OPTION_NAME = "Provider Model"
$env:ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION = "Model routed through custom gateway"
claude
```

Windows CMD：

```cmd
set ANTHROPIC_BASE_URL=https://tflow.online
set ANTHROPIC_API_KEY=your-api-key
set ANTHROPIC_CUSTOM_MODEL_OPTION=provider/model-id
set ANTHROPIC_CUSTOM_MODEL_OPTION_NAME=Provider Model
set ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION=Model routed through custom gateway
claude
```

然后在 Claude Code 中运行：

```text
/model
```

在选择器底部选择刚添加的模型。

如果网关支持 `/v1/models` 发现接口，可以启用模型发现：

macOS / Linux：

```bash
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1
```

Windows PowerShell：

```powershell
$env:CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY = "1"
```

Windows CMD：

```cmd
set CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1
```

## 固定模型别名对应的真实模型

企业或团队环境中，如果不希望 `sonnet`、`opus`、`haiku` 随官方推荐变化自动漂移，可以固定别名：

macOS / Linux：

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-opus-4-7"
export ANTHROPIC_DEFAULT_SONNET_MODEL="claude-sonnet-4-6"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="claude-haiku-4-5"
```

Windows PowerShell：

```powershell
$env:ANTHROPIC_DEFAULT_OPUS_MODEL = "claude-opus-4-7"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = "claude-sonnet-4-6"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL = "claude-haiku-4-5"
```

Windows CMD：

```cmd
set ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-7
set ANTHROPIC_DEFAULT_SONNET_MODEL=claude-sonnet-4-6
set ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-4-5
```

使用 Bedrock、Vertex、Foundry 或内部网关时，把值替换为对应平台的模型 ID、部署名或 ARN。

## 常见问题

### 配置了 Base URL 但模型没有变化

这是正常行为。`ANTHROPIC_BASE_URL` 只控制请求目标地址。要换模型，需要使用 `/model`、`--model`、`ANTHROPIC_MODEL` 或 `settings.json` 的 `model` 字段。

### 设置 API Key 后不再使用订阅额度

这是 Claude Code 的优先级规则。设置 `ANTHROPIC_API_KEY` 后会优先使用 API Key。要恢复订阅登录态，运行：

macOS / Linux：

```bash
unset ANTHROPIC_API_KEY
```

Windows PowerShell：

```powershell
Remove-Item Env:\ANTHROPIC_API_KEY
```

Windows CMD：

```cmd
set ANTHROPIC_API_KEY=
```

### 第三方网关模型不可选

使用 `ANTHROPIC_CUSTOM_MODEL_OPTION` 添加单个模型，或在网关支持模型发现时设置 `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`。
