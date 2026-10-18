import { Config } from '@remotion/cli/config';
import { existsSync } from 'node:fs';

// Neste ambiente o Chromium já existe; na sua máquina, deixe sem e o Remotion baixa o dele.
const chrome = process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
if (existsSync(chrome)) Config.setBrowserExecutable(chrome);

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
