import { join } from 'path';
import chalk from 'chalk';
import fsExtra from 'fs-extra';
import { importLazy } from './importLazy';

const enableFSLogger =
  process.env.FS_LOGGER !== 'none' && !process.versions.webcontainer;

const loggerDir = join(process.cwd(), 'node_modules/.cache/logger');
const loggerPath = join(loggerDir, 'umi.log');

export const prefixes = {
  wait: chalk.cyan('wait') + '  -',
  error: chalk.red('error') + ' -',
  fatal: chalk.red('fatal') + ' -',
  warn: chalk.yellow('warn') + '  -',
  ready: chalk.green('ready') + ' -',
  info: chalk.cyan('info') + '  -',
  event: chalk.magenta('event') + ' -',
  debug: chalk.gray('debug') + ' -',
};

let logger: any;
if (enableFSLogger) {
  const { default: pino }: typeof import('pino') = importLazy(
    require.resolve('pino'),
  );
  fsExtra.mkdirpSync(loggerDir);
  const customLevels = {
    ready: 31,
    event: 32,
    wait: 55,
    // 虽然这里设置了 debug 为 30，但日志中还是 20，符合预期
    // 这里不加会不生成到 umi.log，transport 的 level 配置没有生效，原因不明
    debug: 30,
  };
  logger = pino(
    {
      customLevels,
    },
    pino.transport({
      targets: [
        {
          target: require.resolve('pino/file'),
          options: {
            destination: loggerPath,
          },
          level: 'trace',
        },
      ],
    }),
  );
} else {
  logger = {};
  Object.keys(prefixes).forEach((key) => {
    logger[key] = () => {};
  });
}

export function wait(...message: any[]) {
  console.log(prefixes.wait, ...message);
  logger.wait(message[0]);
}

export function error(...message: any[]) {
  console.error(prefixes.error, ...message);
  logger.error(message[0]);
}

export function warn(...message: any[]) {
  console.warn(prefixes.warn, ...message);
  logger.warn(message[0]);
}

export function ready(...message: any[]) {
  console.log(prefixes.ready, ...message);
  logger.ready(message[0]);
}

export function info(...message: any[]) {
  console.log(prefixes.info, ...message);
  logger.info(message[0]);
}

export function event(...message: any[]) {
  console.log(prefixes.event, ...message);
  logger.event(message[0]);
}

export function debug(...message: any[]) {
  if (process.env.DEBUG) {
    console.log(prefixes.debug, ...message);
  }
  logger.debug(message[0]);
}

export function fatal(...message: any[]) {
  console.error(prefixes.fatal, ...message);
  logger.fatal(message[0]);
}

export function getLatestLogFilePath() {
  return enableFSLogger ? loggerPath : null;
}
