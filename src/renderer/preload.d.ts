import { Channels } from 'main/preload';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var db: {
    command: {
      request(channel: Channels, args: unknown[]): Promise<any>;
      sendMessage(channel: Channels, args: unknown[]): void;
      on(
        channel: Channels,
        func: (...args: unknown[]) => void
      ): (() => void) | undefined;
      once(channel: Channels, func: (...args: unknown[]) => void): void;
    };
  };
}

export {};
