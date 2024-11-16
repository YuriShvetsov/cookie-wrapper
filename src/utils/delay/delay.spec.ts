import { delay } from '.';

describe('delay', () => {
  it('should be completed in 1 second', async () => {
    const start = new Date();

    await delay(1000);

    const timeDiffMs = Date.now() - start.getTime();
    const timeDiffSeconds = Math.floor(timeDiffMs / 1000);

    expect(timeDiffSeconds).toEqual(1);
  });
});
