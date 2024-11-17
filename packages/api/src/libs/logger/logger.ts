import pino from 'pino';

type ErrorStatus = 'debug' | 'info' | 'error';

const labels = pino().levels.labels;
const pinoLogger = pino({
  level: 'info',
  mixin: (_, level) => {
    return { severity: labels[level].toUpperCase() };
  },
});

export const logger = <T extends object>(message: string, payload?: T, status?: ErrorStatus) => {
  switch (status) {
    case 'debug': {
      pinoLogger.debug({ payload, message });
      return;
    }
    case 'info': {
      pinoLogger.info({ payload, message });
      return;
    }
    case 'error': {
      pinoLogger.error({ payload, message });
      return;
    }
    default: {
      pinoLogger.info({ payload, message });
      return;
    }
  }
};
