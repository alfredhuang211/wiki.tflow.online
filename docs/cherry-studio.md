# Cherry Studio 配置

本文说明如何在 Cherry Studio 中新增模型提供商，配置 API Key、Base URL，以及配置可用模型。

参考资料：

- [Cherry Studio 自定义服务商](https://docs.cherry-ai.com/docs/en-us/pre-basic/providers/zi-ding-yi-fu-wu-shang)
- [Cherry Studio 模型服务设置](https://docs.cherry-ai.com/docs/en-us/pre-basic/settings/providers)
- [Cherry Studio 默认模型设置](https://docs.cherry-ai.com/docs/en-us/pre-basic/settings/default-models)

## 新增模型提供商

1. 打开 Cherry Studio。
2. 点击左侧导航栏的设置图标。
3. 进入「模型服务」。
4. 在提供商列表底部点击「+ 添加」。
5. 填写提供商名称，例如 `My OpenAI Gateway`。
6. 选择提供商类型：
   - OpenAI：OpenAI 兼容接口、NewAPI、OneAPI、vLLM 等常用网关。
   - Anthropic：Anthropic 兼容接口。
   - Gemini：Google Gemini 兼容接口。
   - Azure OpenAI：Azure OpenAI 部署。
7. 保存。

## 配置 API Key

进入刚添加的提供商配置页，在 API Key 输入框填写服务商提供的密钥。

Cherry Studio 支持为同一个提供商配置多个 Key，用英文逗号分隔：

```text
sk-xxxx1,sk-xxxx2,sk-xxxx3
```

注意：

- 必须使用英文逗号。
- 不同服务商可能把密钥叫做 Secret、Key、API Key、Token，本质都是这里要填的访问密钥。
- 填写后可以点击 API Key 输入框旁边的检查按钮验证连通性。

## 配置 Base URL

在「API 地址」中填写服务商给出的 API 根地址。Tflow 推荐先填写：

```text
https://tflow.online
```

常见写法：

```text
https://tflow.online
https://tflow.online/v1
http://localhost:8000
```

Cherry Studio 会根据提供商类型自动拼接后续接口路径。官方文档特别提醒：如果服务商给的是完整接口地址，例如 `https://tflow.online/v1/chat/completions`，通常只需要填写根地址部分：

```text
https://tflow.online
```

如果服务商的请求路径不是常规 `/v1/chat/completions`，需要完整填写接口地址，并在末尾加 `#`，表示不要让 Cherry Studio 自动拼接路径：

```text
https://tflow.online/custom/chat/path#
```

## Base URL 路径怎么填

优先规则：

1. OpenAI 兼容 provider：先填 `https://tflow.online`。Cherry Studio 会按 OpenAI 兼容规则自动拼接请求路径。
2. 如果自动检查失败，再按对接方案尝试 `https://tflow.online/v1`。
3. 如果方案给的是完整接口路径，例如 `https://tflow.online/v1/chat/completions` 或自定义 path，在地址末尾加 `#`，阻止 Cherry Studio 再自动追加路径。

示例：

```text
https://tflow.online/v1/chat/completions#
```

不要在不确定时把 `/v1/chat/completions` 写进去。重复拼接路径是 Cherry Studio 配置失败的常见原因。

## 配置可用模型

在提供商配置页底部配置模型列表。

方式一：自动获取

1. 点击「管理」。
2. 等待 Cherry Studio 拉取模型列表。
3. 在弹窗中点击模型旁边的 `+`。
4. 被添加的模型才会出现在模型选择列表里。

方式二：手动添加

1. 点击「+ 添加」。
2. 输入服务商支持的模型 ID。
3. 保存。

示例模型 ID：

```text
gpt-5.5
gpt-5.4-mini
claude-sonnet-4-6
provider/model-name
```

模型 ID 必须和服务商文档或模型接口返回值一致。第三方聚合服务通常会使用 `provider/model-name` 形式。

## 启用提供商

配置完成后，打开提供商右上角的启用开关。没有启用时，即使 API Key、Base URL 和模型都正确，也不会在模型选择列表中出现。

## 设置默认模型

进入「设置」→「默认模型设置」，按用途选择默认模型：

- 默认助手模型：新对话默认使用的模型。
- 话题命名模型：用于生成会话标题。
- 翻译模型：用于对话和输入框翻译。
- 快捷助手模型：用于快捷助手功能。

建议：

- 默认助手模型使用能力较强的通用模型。
- 话题命名和翻译可以使用速度快、成本低的模型。
- 如果某个模型检查失败，确认模型列表里是否添加了不被该服务商支持的模型。

## 常见问题

### 模型没有出现在选择列表

检查三点：

1. 是否点击了模型旁边的 `+`，把它加入 provider 的模型列表。
2. provider 右上角启用开关是否已打开。
3. 模型 ID 是否与服务商支持的名称完全一致。

### API 地址检查失败

确认 Base URL 是否填成了完整接口路径。大多数 OpenAI 兼容服务只需要根地址或 `/v1` 地址。如果必须使用完整路径，末尾加 `#`。

### 多个 Key 如何轮询

在 API Key 输入框中用英文逗号填写多个 Key，Cherry Studio 会按列表顺序轮询使用。
