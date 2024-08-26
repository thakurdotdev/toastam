# Toastam

Toastam is a lightweight, customizable toast library for React applications. It offers an intuitive API for triggering toast messages with flexible styling and positioning options.

[![npm version](https://img.shields.io/npm/v/toastam.svg)](https://www.npmjs.com/package/toastam)
[![license](https://img.shields.io/npm/l/toastam.svg)](https://github.com/thakurdotdev/toastam/blob/main/LICENSE)

## Features

- Lightweight and easy to integrate
- Customizable toast messages
- Multiple style variants
- Flexible positioning
- Adjustable duration
- TypeScript support

## Installation

Install Toastam using npm:

```bash
npm install toastam
```

## Quick Start

1. Import the necessary components:

```typescript
import { Toaster, toast } from "toastam";
```

2. Add the `Toaster` component to your app's root:

```typescript
function App() {
  return (
    <div className="App">
      {/* Your app components */}
      <Toaster />
    </div>
  );
}
```

3. Trigger toast messages anywhere in your application:

```typescript
toast.success("Operation completed successfully!");
```

## API Reference

### Toaster Component

| Prop           | Type                                                                                              | Default       | Description                    |
| -------------- | ------------------------------------------------------------------------------------------------- | ------------- | ------------------------------ |
| `styleVariant` | `'normal' \| 'sharp'`                                                                             | `'normal'`    | Visual style of toast messages |
| `duration`     | `number`                                                                                          | `3000`        | Display duration (ms)          |
| `position`     | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Toast container position       |

### Toast Functions

- `toast.success(message: string)`
- `toast.error(message: string)`
- `toast.warning(message: string)`
- `toast.info(message: string)`

## Examples

```typescript
toast.success("Profile updated successfully!");
toast.error("An error occurred. Please try again.");
toast.warning("Your session is about to expire.");
toast.info("New app version available.");
```

## Documentation

For detailed usage instructions, advanced customization options, and API documentation, visit our [official documentation](https://toastam.thakur.dev).

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/thakurdotdev/toastam/blob/main/CONTRIBUTING.md) for more details.

## License

Toastam is [MIT licensed](https://github.com/thakurdotdev/toastam/blob/main/LICENSE).

## Links

- [GitHub Repository](https://github.com/thakurdotdev/toastam)
- [Documentation](https://toastam.thakur.dev)
- [npm Package](https://www.npmjs.com/package/toastam)
