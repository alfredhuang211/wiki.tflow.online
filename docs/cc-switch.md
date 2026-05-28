# CC Switch 配置

CC Switch 是一个跨平台的 AI 编程 CLI 配置管理工具，可用图形界面或命令行统一管理 Claude Code、Codex CLI、Gemini CLI、OpenCode、OpenClaw 等工具的 provider 配置。

适合这些场景：

- 不想手动编辑 `settings.json`、`config.toml`。
- 需要在多个模型服务商之间切换。
- 同时使用 Claude Code 和 Codex CLI，希望统一管理 Base URL、API Key 和模型。
- 远程开发机、服务器或 SSH 环境中需要用 CLI/TUI 切换 provider。

参考资料：

- [CC Switch 官网](https://cc-switch.cc/en)
- [CC Switch 官方文档入口](https://ccswitch.io/en/docs?section=getting-started)
- [CC Switch Setup 示例文档](https://docs.qcode.cc/en/docs/ide/cc-switch)
- [CC-Switch-CLI 使用示例](https://docs.windcloudai.com/docs/ccswitch/cli.html)

## Windows / macOS / Linux 安装

桌面版安装方式按系统选择：

| 系统 | 推荐方式 | 说明 |
| --- | --- | --- |
| Windows | 下载 `.msi` 或便携版 `.zip` | 安装后从开始菜单启动，或把便携版目录加入 PATH。 |
| macOS | 下载 `.dmg`，或使用 Homebrew | 首次启动可能需要在「系统设置」→「隐私与安全性」中允许。 |
| Linux | 下载 `.deb`、`.rpm`、`.AppImage` | AppImage 需要执行权限；Flatpak/AppImage 可能受系统沙箱或证书影响。 |

CLI/TUI 版本适合服务器和远程开发机：

1. 下载当前系统对应的压缩包。
2. 解压后把可执行文件移动到 PATH。
3. 在终端运行：

```bash
cc-switch
```

Windows PowerShell 中同样运行：

```powershell
cc-switch
```

如果提示命令不存在，确认可执行文件所在目录已经加入 PATH，或在可执行文件目录内运行。

## 配置前准备

先准备 Tflow API Key：

```text
sk-...
```

推荐 Base URL：

```text
https://tflow.online
```

不同工具在 CC Switch 中填写的 path 不同：

| 工具 | Base URL | Key 字段 | 推荐模型 |
| --- | --- | --- | --- |
| Claude Code | `https://tflow.online` | `ANTHROPIC_AUTH_TOKEN` 或 API Key/Token | `claude-sonnet-4-6` |
| Codex CLI | `https://tflow.online/v1` | API Key | `gpt-5.5` 或 `gpt-5.4-mini` |
| Gemini CLI | 按对接方案填写，通常先用 `https://tflow.online` | API Key | 以平台模型列表为准 |

说明：

- CC Switch 的 Claude provider 通常会写入 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_AUTH_TOKEN` 到 Claude Code 配置。
- Codex provider 通常会生成或更新 `~/.codex/config.toml`，Windows 对应 `%USERPROFILE%\.codex\config.toml`。
- 不要在 Base URL 末尾随意加 `/`。部分 CC Switch 版本和 provider 对尾部斜杠比较敏感。

## 通过桌面版配置 Claude Code

1. 打开 CC Switch。
2. 进入左侧「Claude」或「Claude Code」标签。
3. 点击「Add Provider」或「添加 Provider」。
4. 选择「Custom」。
5. 填写：

| 字段 | 值 |
| --- | --- |
| Provider Name | `Tflow` |
| ANTHROPIC_BASE_URL / Base URL | `https://tflow.online` |
| ANTHROPIC_AUTH_TOKEN / API Key / Token | Tflow API Key |
| Model | `claude-sonnet-4-6` |

6. 保存。
7. 点击「Activate」或「Enable」，切换为当前 provider。
8. 打开终端验证：

```bash
claude --model claude-sonnet-4-6
```

Windows PowerShell：

```powershell
claude --model claude-sonnet-4-6
```

如果 Claude Code 已经在运行，CC Switch 支持热切换的场景通常不需要重启；如果新配置没有生效，重新打开终端再运行 `claude`。

## 通过桌面版配置 Codex CLI

1. 打开 CC Switch。
2. 进入左侧「Codex」标签。
3. 点击「Add Provider」或「添加 Provider」。
4. 选择「Custom」。
5. 填写：

| 字段 | 值 |
| --- | --- |
| Provider Name | `tflow` |
| Base URL | `https://tflow.online/v1` |
| API Key | Tflow API Key |
| Default Model | `gpt-5.5` |
| Wire API | `responses` |

6. 保存并激活。
7. 打开终端验证：

```bash
codex -m gpt-5.5
```

如果你的 CC Switch 版本没有 `Wire API` 字段，保存后检查生成的 Codex 配置，确认 provider 使用 OpenAI 兼容接口即可。

macOS / Linux 配置文件：

```text
~/.codex/config.toml
```

Windows 配置文件：

```text
%USERPROFILE%\.codex\config.toml
```

## 通过 CC Switch CLI 配置

在不方便启动图形界面的环境中，可以用 CLI/TUI 方式管理 provider。

进入交互界面：

```bash
cc-switch
```

常用命令：

```bash
cc-switch provider list
cc-switch provider current
cc-switch provider add
cc-switch provider switch <id>
cc-switch provider speedtest <id>
```

指定应用：

```bash
cc-switch --app claude provider list
cc-switch --app codex provider list
cc-switch --app gemini provider list
```

推荐流程：

1. 运行 `cc-switch`。
2. 进入 `Providers`。
3. 选择目标应用，例如 Claude 或 Codex。
4. 新增 provider。
5. 名称填写 `Tflow` 或 `tflow`。
6. 按上文填写对应工具的 Base URL 和 API Key。
7. 保存后切换为当前 provider。
8. 运行 `claude` 或 `codex` 验证。

配置前后建议备份：

```bash
cc-switch config backup
cc-switch config show
cc-switch config validate
```

Windows PowerShell 中命令相同：

```powershell
cc-switch config backup
cc-switch config show
cc-switch config validate
```

## 可选模型

Claude Code 推荐：

```text
claude-sonnet-4-6
claude-opus-4-7
claude-opus-4-7-thinking
claude-haiku-4-5
```

Codex CLI 推荐：

```text
gpt-5.5
gpt-5.4
gpt-5.4-mini
gpt-5.3-codex
```

实际可用模型以 Tflow 控制台和 `/v1/models` 返回为准。

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

## 常见问题

### Activate 按钮不可用

检查 provider 是否已经保存，API Key 是否为空，Base URL 末尾是否多了 `/`。

### Claude Code 仍然连接旧 provider

检查 CC Switch 是否写入了 Claude Code 配置。必要时重启终端，或者检查：

macOS / Linux：

```text
~/.claude/settings.json
```

Windows：

```text
%USERPROFILE%\.claude\settings.json
```

### Codex 启动后请求失败

检查 Base URL 是否填写为：

```text
https://tflow.online/v1
```

不要把 `chat/completions` 或 `responses` 写进 Codex 的 Base URL。

### 401 Unauthorized

确认 API Key 没有前后空格、没有过期或删除。Claude provider 和 Codex provider 的 Key 通常是分别保存的，一个能用不代表另一个已经填对。

### 多系统同步后不生效

Windows、macOS、Linux 的本地配置路径不同。同步 provider 后，确认当前机器已经激活对应 provider，并重新打开目标 CLI。
