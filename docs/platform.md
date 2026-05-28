# 平台介绍

Tflow Online 提供统一的模型 API 入口。用户只需要创建一个 API Key，即可在 Codex、Claude CLI、Cherry Studio、Cursor、Continue、OpenAI SDK 等工具中配置使用。

## 注册方法

1. 打开平台地址：

```text
https://tflow.online
```

2. 点击页面中的「注册」或「开始使用」入口。
3. 按页面提示填写账号信息。
4. 完成邮箱、手机号或第三方账号验证后进入控制台。

如果页面已经显示控制台入口，说明当前浏览器可能已经登录，可以直接进入控制台。

## 登录方法

1. 打开：

```text
https://tflow.online
```

2. 点击「登录」或「控制台」。
3. 使用注册时绑定的账号登录。
4. 登录成功后进入控制台，查看账号余额、分组、API Key 和可用模型。

如果登录后看不到 API Key 管理入口，检查当前账号是否已完成开通，或是否切换到了正确的工作区、组织、分组。

## API Key 创建方法

1. 登录控制台。
2. 进入「我的账户」或「API 密钥」页面。
3. 点击「创建 API Key」或「新建密钥」。
4. 为密钥填写名称，例如 `codex-local`、`cherry-studio`。
5. 根据需要选择分组、额度、过期时间或权限范围。
6. 创建后复制密钥，并保存到本机安全位置。

API Key 通常以 `sk-` 开头。创建后请立即复制保存，后续页面可能不会再次明文展示完整密钥。

安全建议：

- 不要把 API Key 写入 Git 仓库。
- 不要把 API Key 发到聊天、工单或截图里。
- 每个客户端单独创建一个 Key，方便后续停用和排查。
- 怀疑泄露时，立即删除旧 Key 并创建新 Key。

## 各系统环境变量写法

临时环境变量只在当前终端窗口生效，适合测试。长期使用时，建议写入系统或 shell 的持久配置。

### macOS / Linux

当前终端临时生效：

```bash
export TFLOW_API_KEY="sk-..."
```

zsh 用户可写入：

```bash
echo 'export TFLOW_API_KEY="sk-..."' >> ~/.zshrc
source ~/.zshrc
```

bash 用户可写入：

```bash
echo 'export TFLOW_API_KEY="sk-..."' >> ~/.bashrc
source ~/.bashrc
```

### Windows PowerShell

当前 PowerShell 窗口临时生效：

```powershell
$env:TFLOW_API_KEY = "sk-..."
```

写入当前用户环境变量，之后新开的终端生效：

```powershell
[Environment]::SetEnvironmentVariable("TFLOW_API_KEY", "sk-...", "User")
```

### Windows CMD

当前 CMD 窗口临时生效：

```cmd
set TFLOW_API_KEY=sk-...
```

写入当前用户环境变量，之后新开的终端生效：

```cmd
setx TFLOW_API_KEY "sk-..."
```

注意：`setx` 不会更新当前已经打开的 CMD 窗口，需要重新打开终端。

## Base URL

Tflow 推荐 Base URL：

```text
https://tflow.online
```

不同客户端对 path 的处理不同，配置时按客户端规则填写：

| 客户端 | 推荐填写 | 说明 |
| --- | --- | --- |
| Codex App / CLI | `https://tflow.online/v1` | Codex 的 `base_url` 通常填写 OpenAI 兼容 API base，需要包含 `/v1`。 |
| Claude CLI | `https://tflow.online` | `ANTHROPIC_BASE_URL` 通常填写服务根地址。只有对接方案明确要求时才追加 path。 |
| Cherry Studio | `https://tflow.online` | 优先填写根地址，由 Cherry Studio 自动拼接接口路径。 |
| OpenAI SDK | `https://tflow.online/v1` | OpenAI SDK 的 `baseURL` 通常填写到 `/v1`。 |

如果某个对接方案明确提供专用路径，以该方案为准。例如：

```text
https://tflow.online/anthropic
https://tflow.online/v1
https://tflow.online/v1/chat/completions#
```

最后一个带 `#` 的形式只适用于 Cherry Studio 这类会自动拼接路径、但又需要填写完整接口地址的特殊场景。

## 可选模型值

模型列表会随平台接入、账号分组和权限变化而调整。实际可用模型以控制台和接口返回为准。

常见可选模型：

| 模型 | 适用场景 |
| --- | --- |
| `gpt-5.5` | 日常默认、复杂编码、通用高质量任务。 |
| `gpt-5.4` | 专业编码、agentic 工作流、较复杂任务。 |
| `gpt-5.4-mini` | 更快、更省的轻量任务。 |
| `gpt-5.3-codex` | 复杂软件工程任务。 |
| `gpt-4o` | 通用对话、多模态兼容场景。 |
| `gpt-4o-mini` | 轻量通用任务。 |
| `gpt-image-2` | 图片生成相关任务。 |
| `claude-opus-4-7` | 复杂推理和长任务。 |
| `claude-opus-4-7-thinking` | 需要更强推理过程的复杂任务。 |
| `claude-sonnet-4-6` | 日常编码、文档、通用 agent 任务。 |
| `claude-haiku-4-5` | 快速、低成本任务。 |

如果客户端支持模型发现，优先从平台接口读取模型列表。OpenAI 兼容接口通常可以通过：

macOS / Linux：

```bash
curl https://tflow.online/v1/models \
  -H "Authorization: Bearer $TFLOW_API_KEY"
```

Windows PowerShell：

```powershell
curl.exe https://tflow.online/v1/models `
  -H "Authorization: Bearer $env:TFLOW_API_KEY"
```

如果使用 Cherry Studio，也可以在模型服务配置页点击「管理」自动拉取模型，再把需要的模型添加到可用列表。

## 调用示例

OpenAI Chat Completions 示例：

macOS / Linux：

```bash
curl https://tflow.online/v1/chat/completions \
  -H "Authorization: Bearer $TFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.5",
    "messages": [
      { "role": "user", "content": "你好" }
    ],
    "stream": true
  }'
```

Windows PowerShell：

```powershell
curl.exe https://tflow.online/v1/chat/completions `
  -H "Authorization: Bearer $env:TFLOW_API_KEY" `
  -H "Content-Type: application/json" `
  -d '{
    "model": "gpt-5.5",
    "messages": [
      { "role": "user", "content": "你好" }
    ],
    "stream": true
  }'
```

OpenAI SDK 示例：

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.TFLOW_API_KEY,
  baseURL: "https://tflow.online/v1"
});

const completion = await client.chat.completions.create({
  model: "gpt-5.5",
  messages: [{ role: "user", content: "你好" }]
});

console.log(completion.choices[0].message.content);
```

## 常见问题

### Base URL 应该填根地址还是 `/v1`

看客户端。OpenAI SDK 和 Codex 通常填 `https://tflow.online/v1`；Claude CLI 和 Cherry Studio 通常先填 `https://tflow.online`。

### 模型报错不可用

检查三点：

1. 当前 API Key 所属分组是否支持该模型。
2. 模型名称是否和控制台展示完全一致。
3. 客户端是否缓存了旧模型列表，必要时重启客户端。

### API Key 验证失败

确认密钥没有多复制空格、没有使用已删除或过期的 Key，并确认请求头使用：

```text
Authorization: Bearer <your-api-key>
```
