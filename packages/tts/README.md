# @mollify/tts

Mollify Text-To-Speech provides audio for markdown content, enabling users to generate and listen to the content. Currently leveraging ElevenLabs for TTS, future plans may include various optional TTS packages to offer a more flexible user experience.

## Installation

1. To install the @mollify/tts package with `npm`, simply run the following command:

```bash
npm install --save-dev @mollify/tts
# or
npm i -D @mollify/tts
```

2. Create .env and provide ELEVENLABS_API_KEY to use the package.

```
ELEVENLABS_API_KEY=YOUR_KEY
```

## Build

```bash
npm run tts-build
```
